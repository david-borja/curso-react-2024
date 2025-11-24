import { addNewUser, deleteUserById, type User, type UserId } from '../store/users/slice'
import { useAppDispatch } from './store'

// este hook está bien tenerlo separado de la carpeta store, porque el día de mañana puede que no se utilice una store

// Del mismo modo, quizá tendría mas sentido utilizar screaming architecture:
// users
// - hooks
// - store
// 
export function useUserActions() {
  const dispatch = useAppDispatch()

  const addUser = ({ name, email, github }: User) => {
    dispatch(addNewUser({ name, email, github }))
  }

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  return { removeUser, addUser }
}
