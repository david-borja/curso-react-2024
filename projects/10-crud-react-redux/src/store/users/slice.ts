import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE = [
  {
    id: '1',
    name: 'Yazman Rodriguez',
    email: 'yazmanito@gmail.com',
    github: 'yazmanito'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'leo@gmail.com',
    github: 'Leo'
  },
  {
    id: '3',
    name: 'Haakon Dahlberg',
    email: 'haakon@gmail.com',
    github: 'midudev'
  }
]

export type UserId = string

export interface User {
  name: string
  email: string
  github: string
}

export interface UserWithId extends User {
  id: UserId
}

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem('__redux__state__')
  return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE
})()

// la lógica de los reducers es JS puro que es agnostico a redux y react. Se podría dejar así, porque apenas se incluye redux en este archivo

// Habría que evitar incorporar lógica asíncrona en los reducers (como llamadas a APIs) y no usar thunks. Para eso es mejor usar react-query

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID()
      // una de las ventajas de redux toolkit es que no hace falta devolver un nuevo estado
      // podemos mutar el estado directamente, y tampoco hace falta devolverlo. Esto es porque usa internamente immer.js, que se encarga de crear un nuevo estado inmutable por nosotros
      // Es decir, podríamos hacer:
      // state.push({ id, ...action.payload })
      // Esto es una ventaja, pero a la vez puede llevar a confusión, porque no es el comportamiento "normal" de redux, y tenemos una dependencia extra (immer.js). A pesar de esto, es más óptimo que structuredClone
      // Esto nos evita hacer reducer complejos con muchos spread operators.
      return [ ...state, { id, ...action.payload } ]
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter((user) => user.id !== id)
    },
    rollbackDeletedUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserDefined = state.some(user => user.id === action.payload.id)
      if (!isUserDefined) {
        return [ ...state, action.payload ]
      }
    }
  }
})

export default usersSlice.reducer
// Redux toolkit nos permite exportar las acciones de esta manera
// Y por tanto, prescindir de las strings de los tipos de acción
// De esta manera, tenemos menos boilerplate y menos margen de error
export const { deleteUserById, addNewUser, rollbackDeletedUser } = usersSlice.actions