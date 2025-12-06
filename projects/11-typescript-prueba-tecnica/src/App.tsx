
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UsersTable } from './components/UsersTable'
// import mockUsersResponse from './mockUsersResponse.json'
import { sortUsers } from './utils/sortUsers'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsersRef = useRef<User[]>([])
  const sortedUsersRef = useRef<User[]>([])
  const sortByRef = useRef<SortBy>(SortBy.NONE)

  const toggleShowColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sortBy === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSortBy(newSortingValue)
  }

  const handleDelete = (id: string, users: User[]) => {
    const filteredUsers = users.filter(user => user.login.uuid !== id)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsersRef.current)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSortBy(sort)
  }

  useEffect(() => {
    // setUsers(mockUsersResponse.results as User[])
    // originalUsers.current = mockUsersResponse.results as User[]
    fetch('https://randomuser.me/api/?results=100')
      .then((res) => res.json())
      .then(data => {
        setUsers(data.results)
        originalUsersRef.current = data.results
      })
      .catch(err => {
        console.error('Users call error', err)
        // setUsers(mockUsersResponse.results as User[])
      })
  }, [])

  const getFilteredUsers = (users: User[], filterCountry: string) => {
    return users.filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
  }

  const getSortedUsers = (users: User[], sortBy: SortBy) => {
    return sortUsers(users, sortBy)
  }

  useEffect(() => {
    const originalUsers = Array.from(originalUsersRef.current)
    const sortedUsers = Array.from(sortedUsersRef.current)
    // Si no hay filtro, volvemos al original o a los ordenados
    if (!filterCountry) {
      setUsers(sortBy === SortBy.NONE ? originalUsers : sortedUsers)
    }

    // Aplicamos el filtro sobre los usuarios originales o los ordenados
    const usersToFilter = sortBy === SortBy.NONE ? originalUsers : sortedUsers
    const filteredUsers = getFilteredUsers(usersToFilter, filterCountry || '')
    setUsers(filteredUsers)
  }, [filterCountry])

  useEffect(() => {
    // Si no hay ordenación, volvemos al original (posiblemente filtrado) 
    if (sortBy === SortBy.NONE) {
      const newUsers = Array.from(originalUsersRef.current)
      setUsers(filterCountry ? getFilteredUsers(newUsers, filterCountry) : newUsers)
      return
    }

    // Si la ordenación es la misma que la anterior y ya tenemos usuarios ordenados, los reutilizamos
    if (sortByRef.current === sortBy && sortedUsersRef.current.length) {
      const newUsers = Array.from(sortedUsersRef.current)
      setUsers(filterCountry ? getFilteredUsers(newUsers, filterCountry) : newUsers)
      return
    }

    // Ordenamos los usuarios originales y guardamos el resultado
    const sortedUsers = getSortedUsers(Array.from(originalUsersRef.current), sortBy)
    sortedUsersRef.current = Array.from(sortedUsers)
    setUsers(filterCountry ? getFilteredUsers(sortedUsers, filterCountry) : sortedUsers)
  }, [sortBy])

  // Así estaba antes, pero ya no escalaba:
  // const getSortedUsers = useCallback(((users: User[]) => {
  //   if (sortBy === SortBy.NONE) return users
  //   // return sortUsers(users, sorting)
  //   if (sortedUsersRef.current.length) return sortedUsersRef.current
  //   sortedUsersRef.current = sortUsers(users, sortBy)
  //   return sortedUsersRef.current
  // }), [sortBy])

  // const getFilteredUsers = useCallback(((users: User[]) => {
  //   if (!filterCountry) return users
  //   return users
  //     .filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
  // }), [filterCountry])

  // const filteredUsers = useMemo(() => {
  //   console.log('Filtering users')
  //   return getFilteredUsers(users)
  // }, [users, filterCountry])

  // const sortedUsers = useMemo(() => {
  //   console.log('Getting sorted users')
  //   return getSortedUsers(filteredUsers)
  // }, [filteredUsers, sortBy])

  return (
    <div className='App'>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleShowColors}>
          {showColors ? 'No colorear filas' : 'Colorear filas'}
        </button>
        <button onClick={toggleSortByCountry}>
          {sortBy === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
        </button>
        <button onClick={handleReset}>
          Resetear usuarios
        </button>
        <input placeholder='Filtra por país' onChange={(e) => { setFilterCountry(e.target.value) }} />
      </header>
      <main>
        <UsersTable
          deleteUser={handleDelete}
          showColors={showColors}
          users={users}
          changeSorting={handleChangeSort}
          sortBy={sortBy}
        />
      </main>
    </div>
  )
}

export default App
