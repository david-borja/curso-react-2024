
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import type { User } from './types'
import { UsersTable } from './components/UsersTable'
// import mockUsersResponse from './mockUsersResponse.json'
import { sortUsers } from './utils/sortUsers'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState<boolean>(false)
  const [sortByCountry, setSortByCountry] = useState<boolean>(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsersRef = useRef<User[]>([])
  const sortedUsersRef = useRef<User[]>([])

  const toggleShowColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(!sortByCountry)
  }

  const handleDelete = (id: string) => {
    const filteredUsers = users.filter(user => user.login.uuid !== id)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsersRef.current)
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

  const getSortedUsers = ((users: User[]) => {
    if (!sortByCountry) return users
    if (sortedUsersRef.current.length) return sortedUsersRef.current
    sortedUsersRef.current = sortUsers(users)
    return sortedUsersRef.current
  })

  const getFilteredUsers = ((users: User[]) => {
    if (!filterCountry) return users
    return users
      .filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
  })

  const filteredUsers = useMemo(() => {
    console.log('Filtering users')
    return getFilteredUsers(users)
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    console.log('Getting sorted users')
    return getSortedUsers(filteredUsers)
  }, [filteredUsers, sortByCountry])

  return (
    <div className='App'>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleShowColors}>
          {showColors ? 'No colorear filas' : 'Colorear filas'}
        </button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'No ordenar por país' : 'Ordenar por país'}
        </button>
        <button onClick={handleReset}>
          Resetear usuarios
        </button>
        <input placeholder='Filtra por país' onChange={(e) => { setFilterCountry(e.target.value) }} />
      </header>
      <main>
        <UsersTable deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
      </main>
    </div>
  )
}

export default App
