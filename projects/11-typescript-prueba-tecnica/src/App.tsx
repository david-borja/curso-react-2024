
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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

  const toggleShowColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sortBy === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSortBy(newSortingValue)
  }

  const handleDelete = (id: string) => {
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

  const getSortedUsers = useCallback(((users: User[]) => {
    if (sortBy === SortBy.NONE) return users

    // return sortUsers(users, sorting)


    if (sortedUsersRef.current.length) return sortedUsersRef.current
    sortedUsersRef.current = sortUsers(users, sortBy)
    return sortedUsersRef.current
  }), [sortBy])

  const getFilteredUsers = useCallback(((users: User[]) => {
    if (!filterCountry) return users
    return users
      .filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
  }), [filterCountry])

  const filteredUsers = useMemo(() => {
    console.log('Filtering users')
    return getFilteredUsers(users)
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    console.log('Getting sorted users')
    return getSortedUsers(filteredUsers)
  }, [filteredUsers, sortBy])

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
          users={sortedUsers}
          changeSorting={handleChangeSort}
        />
      </main>
    </div>
  )
}

export default App
