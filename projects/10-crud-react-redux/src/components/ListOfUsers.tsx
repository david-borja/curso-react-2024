import './ListOfUsers.css'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { deleteUserById, type UserId } from '../store/users/slice'

export function ListOfUsers() {
  const users = useAppSelector((state) => state.users)
  const dispatch = useAppDispatch()

  const handleRemoveUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  return (
    <div className='users-container'>
      <div className='users-card'>
        <h2 className='users-title'>Users</h2>
        <div className='table-container'>
          <table className='users-table'>
            <thead>
              <tr>
                <th className='table-header'>Name</th>
                <th className='table-header'>Email</th>
                <th className='table-header'>GitHub</th>
                <th className='table-header'>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className='table-row'>
                  <td className='table-cell'>{user.name}</td>
                  <td className='table-cell'>{user.email}</td>
                  <td className='table-cell'>
                    <a
                      href={`https://github.com/${user.github}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='github-link'
                    >
                      {user.github}
                    </a>
                  </td>
                  <td className='table-cell'>
                    <span className='status-badge'>Active</span>
                  </td>
                  <td>
                    <button onClick={() => handleRemoveUser(user.id)} type='button'>
                      <svg
                        style={{ color: 'red', height: '18px', width: '18px' }}
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='size-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
