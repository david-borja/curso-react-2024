export async function getUsers() {
  return fetch('https://randomuser.me/api/?results=100')
    .then((res) => {
      if (!res.ok) throw new Error(`Error fetching users: ${res.statusText}`)
      return res.json()
    })
    .then(data => data.results)
    .catch(err => {
      return { error: err.message }
      // setUsers(mockUsersResponse.results as User[])
    })
}