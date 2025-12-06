import { SortBy, type User } from '../types.d'

interface Props {
  showColors: boolean;
  users: User[];
  deleteUser: (id: string, users: User[]) => void;
  changeSorting: (sort: SortBy) => void;
  sortBy: SortBy;
}

export function UsersTable({ changeSorting, showColors, users, deleteUser, sortBy }: Props) {
  const changeHeaderSortBy = (headerSortBy: SortBy) => {
    const newSortBy = headerSortBy === sortBy ? SortBy.NONE : headerSortBy
    changeSorting(newSortBy)
  }
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Foto</th>
          <th className='pointer' onClick={() => { changeHeaderSortBy(SortBy.NAME) }}>Nombre</th>
          <th className='pointer' onClick={() => { changeHeaderSortBy(SortBy.LAST_NAME) }}>Apellido</th>
          <th className='pointer' onClick={() => { changeHeaderSortBy(SortBy.COUNTRY) }}>País</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody
      // className={showColors ? 'table-showColors' : ''} <- si lo quisiera hacer con CSS, pero no es tan facil de testear
      >
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? '#333' : '#555'
          const color = showColors ? backgroundColor : 'transparent'
          return (
            <tr
              key={user.login.uuid}
              style={{ backgroundColor: color }}
            >
              <td>
                <img src={user?.picture?.thumbnail} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => deleteUser(user.login.uuid, users)}>Borrar</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}