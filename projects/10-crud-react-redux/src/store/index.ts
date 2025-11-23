import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './users/slice'

const persistanceLocalStorageMiddleware = (store) => (next) => (action) => {
  console.log(store.getState())
  console.log(action)
  next(action)
  localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
  console.log(store.getState())
}

export const store = configureStore({
  reducer: {
    users: usersReducer
  },
  // Añadimos el middleware de persistencia. getDefaultMiddleware es una función que devuelve un array con los middleware por defecto de redux toolkit
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistanceLocalStorageMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch