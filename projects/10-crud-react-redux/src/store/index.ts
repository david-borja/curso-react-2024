import { configureStore, type Middleware } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import usersReducer, { rollbackDeletedUser, type UserWithId } from './users/slice'

const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)
  localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
}

const syncWithDatabaseMiddleware: Middleware = (store) => (next) => (action) => {
  const { type, payload } = action
  const previousState = store.getState()
  next(action)

  if (type === 'users/deleteUserById') {
    const userIdToRemove = payload
    const userToRemove = previousState.users.find((user: UserWithId) => user.id === userIdToRemove)
    // aquí iría la llamada a la api para borrar el usuario en la base de datos remota
    // esto lo tendríamos que tener separado en otro fichero
    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          toast.success(`Usuario ${userIdToRemove} borrado correctamente`)
        }
        throw new Error('Error al eliminar el usuario')
      })
      .catch((error) => {
        toast.error(`Error deleting user ${userIdToRemove}`)
        if (userToRemove) store.dispatch(rollbackDeletedUser(userToRemove))
        console.log('error', error)
      })
  }
}

// Para llamar a una api, en lugar de usar redux-thunk, usaremos mejor react-query.
// Hay que intentar no meter las llamadas a las apis dentro de los reducers

export const store = configureStore({
  reducer: {
    users: usersReducer
  },
  // Añadimos el middleware de persistencia. getDefaultMiddleware es una función que devuelve un array con los middleware por defecto de redux toolkit
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch