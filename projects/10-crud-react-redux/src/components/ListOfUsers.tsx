import './ListOfUsers.css'

const users = [
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

export function ListOfUsers() {
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
