import React, { useEffect, useRef, useState } from 'react'
import { SortBy, type User, type UUID } from '../types.d'
import { sortUsers } from '../utils/sortUsers'
import { getUsers } from '../services/users'

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsersRef = useRef<User[]>([])
  const sortedUsersRef = useRef<User[]>([])
  const sortByRef = useRef<SortBy>(SortBy.NONE)
  const deletedUsersRef = useRef<UUID[]>([])

  const filterByCountry = (e: React.ChangeEvent<HTMLInputElement>) => setFilterCountry(e.target.value)

  const handleDelete = (id: string, users: User[]) => {
    deletedUsersRef.current.push(id)
    const filteredUsers = users.filter(user => user.login.uuid !== id)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsersRef.current)
    deletedUsersRef.current = []
  }

  const changeSort = (sort: SortBy) => {
    setSortBy(sort)
  }

  const sanitizeDeletedUsers = (users: User[]) => {
    return users.filter(user => !deletedUsersRef.current.includes(user.login.uuid))
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sortBy === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSortBy(newSortingValue)
  }

  useEffect(() => {
    // setUsers(mockUsersResponse.results as User[])
    // originalUsers.current = mockUsersResponse.results as User[]
    getUsers().then((fetchedUsers) => {
      setUsers(fetchedUsers)
      originalUsersRef.current = fetchedUsers
    })
    // (async () => {
    //   const fetchedUsers = await getUsers()
    //   setUsers(fetchedUsers)
    //   originalUsersRef.current = fetchedUsers
    // })()
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
      const users = sortBy === SortBy.NONE ? originalUsers : sortedUsers
      const sanitizedUsers = sanitizeDeletedUsers(users)
      setUsers(sanitizedUsers)
    }

    // Aplicamos el filtro sobre los usuarios originales o los ordenados
    const usersToFilter = sortBy === SortBy.NONE ? originalUsers : sortedUsers
    const filteredUsers = getFilteredUsers(usersToFilter, filterCountry || '')
    const sanitizedUsers = sanitizeDeletedUsers(filteredUsers)
    setUsers(sanitizedUsers)
  }, [filterCountry])

  useEffect(() => {
    // Si no hay ordenación, volvemos al original (posiblemente filtrado) 
    if (sortBy === SortBy.NONE) {
      const newUsers = Array.from(originalUsersRef.current)
      const users = filterCountry ? getFilteredUsers(newUsers, filterCountry) : newUsers
      const sanitizedUsers = sanitizeDeletedUsers(users)
      setUsers(sanitizedUsers)
      return
    }

    // Si la ordenación es la misma que la anterior y ya tenemos usuarios ordenados, los reutilizamos
    if (sortByRef.current === sortBy && sortedUsersRef.current.length) {
      const newUsers = Array.from(sortedUsersRef.current)
      const users = filterCountry ? getFilteredUsers(newUsers, filterCountry) : newUsers
      const sanitizedUsers = sanitizeDeletedUsers(users)
      setUsers(sanitizedUsers)
      return
    }

    // Ordenamos los usuarios originales y guardamos el resultado
    const sortedUsers = getSortedUsers(Array.from(originalUsersRef.current), sortBy)
    sortedUsersRef.current = Array.from(sortedUsers)
    const users = filterCountry ? getFilteredUsers(sortedUsers, filterCountry) : sortedUsers
    const sanitizedUsers = sanitizeDeletedUsers(users)
    setUsers(sanitizedUsers)
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

  return {
    users,
    sorting: {
      sortBy,
      toggleSortByCountry,
      changeSort
    },
    filtering: {
      filterByCountry
    },
    handlers: {
      handleDelete,
      handleReset
    }
    
  }
}