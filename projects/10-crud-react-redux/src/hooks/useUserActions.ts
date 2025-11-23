import { deleteUserById, type UserId } from '../store/users/slice'
import { useAppDispatch } from './store'

export function useUserActions() {
  const dispatch = useAppDispatch()

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  return { removeUser }
}
