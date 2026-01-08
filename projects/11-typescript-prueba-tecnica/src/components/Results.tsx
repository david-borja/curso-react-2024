import { useUsers } from '../hooks/useUsers'

export function Results() {
  // para esta información, no vuelve a hacer la llamada a la API, ya que useUsers ya la hizo y tiene los datos en caché. Es como un estado global.
  const { users } = useUsers()
  return (
    <div>
      <h3>Results {users.length}</h3>
    </div>
  )
}