export async function getUsers({ page = 1 }: { page: number }) {
  return fetch(`https://randomuser.me/api/?results=10&seed=prueba-tecnica&page=${page}`)
    .then((res) => {
      if (!res.ok) throw new Error(`Error fetching users: ${res.statusText}`)
      return res.json()
    })
    .then(data => ({
      users: data.results,
      nextCursor: data.info.page + 1
    }))
    .catch(err => {
      // en axios, el error sí que lo capturamos aquí.
      // sin axios, debemos comprobar el res.ok arriba. Y al catch solo entraría cuando hay un error de red u otro tipo de error inesperado.
      return { error: err.message }
      // setUsers(mockUsersResponse.results as User[])
    })
}