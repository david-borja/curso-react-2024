import React, { useEffect, useRef, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { SortBy, type User, type UUID } from '../types.d'
import { sortUsers } from '../utils/sortUsers'
import { getUsers } from '../services/users'

// se podría hacer con infinity scroll, usando algo como: https://usehooks-ts.com/react-hook/use-intersection-observer

interface UsersResponse {
  users: User[]
  nextCursor?: number
}

export function useUsers() {
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsersRef = useRef<User[]>([])
  const sortedUsersRef = useRef<User[]>([])
  const sortByRef = useRef<SortBy>(SortBy.NONE)
  const deletedUsersRef = useRef<UUID[]>([])

  const [users, setUsers] = useState<User[]>([])

  // Use useQuery for data fetching
  const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
    const response = await getUsers({ page: pageParam })
    if (Object.prototype.hasOwnProperty.call(response, 'error')) {
      if ('error' in response && typeof response.error === 'string') {
        throw new Error(response.error)
      }
    }
    return response
  }

  const getNextPageParam = (lastPage: UsersResponse | { error: string }) => {
    return 'nextCursor' in lastPage ? lastPage.nextCursor : undefined
  }

  const { data, error, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    getNextPageParam,
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false
  })

  // Handle data updates when query succeeds
  useEffect(() => {
    if (data?.pages) {
      const lastPage = data.pages.at(-1)
      const lastPageUsers = (lastPage && 'users' in lastPage) ? lastPage.users : []
      setUsers(prevUsers => prevUsers.concat(lastPageUsers))
      if (data?.pageParams?.length === 1) originalUsersRef.current = lastPageUsers
    }
  }, [data])

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

  const handleChangePage = () => {
    fetchNextPage()
  }

  const sanitizeDeletedUsers = (users: User[]) => {
    return users.filter(user => !deletedUsersRef.current.includes(user.login.uuid))
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sortBy === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSortBy(newSortingValue)
  }

  const getFilteredUsers = (users: User[], filterCountry: string) => {
    return users.filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
  }

  const getSortedUsers = (users: User[], sortBy: SortBy) => {
    return sortUsers(users, sortBy)
  }

  useEffect(() => {
    const originalUsers = originalUsersRef.current
    const sortedUsers = sortedUsersRef.current
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
      const newUsers = originalUsersRef.current
      const users = filterCountry ? getFilteredUsers(newUsers, filterCountry) : newUsers
      const sanitizedUsers = sanitizeDeletedUsers(users)
      setUsers(sanitizedUsers)
      return
    }

    // Si la ordenación es la misma que la anterior y ya tenemos usuarios ordenados, los reutilizamos
    if (sortByRef.current === sortBy && sortedUsersRef.current.length) {
      const newUsers = sortedUsersRef.current
      const users = filterCountry ? getFilteredUsers(newUsers, filterCountry) : newUsers
      const sanitizedUsers = sanitizeDeletedUsers(users)
      setUsers(sanitizedUsers)
      return
    }

    // Ordenamos los usuarios originales y guardamos el resultado
    const sortedUsers = getSortedUsers(originalUsersRef.current, sortBy)
    sortedUsersRef.current = sortedUsers
    const users = filterCountry ? getFilteredUsers(sortedUsers, filterCountry) : sortedUsers
    const sanitizedUsers = sanitizeDeletedUsers(users)
    setUsers(sanitizedUsers)
  }, [sortBy])

  return {
    users,
    error: error?.message || null,
    loading: isLoading,
    hasNextPage,
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
      handleReset,
      handleChangePage
    }
  }
}