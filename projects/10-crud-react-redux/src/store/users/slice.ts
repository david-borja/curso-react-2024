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
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID()
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