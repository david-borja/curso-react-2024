import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type UserId = string

export interface User {
  name: string
  email: string
  github: string
}

export interface UserWithId extends User {
  id: UserId
}

const initialState: UserWithId[] = [
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

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter((user) => user.id !== id)
    }
  }
})

export default usersSlice.reducer
// Redux toolkit nos permite exportar las acciones de esta manera
// Y por tanto, prescindir de las strings de los tipos de acción
// De esta manera, tenemos menos boilerplate y menos margen de error
export const { deleteUserById } = usersSlice.actions