import { useEffect } from 'react'
// import { useQueryParams } from '../hooks/useQueryParams'

export default function SearchPage ({ routeParams }) {
  // const queryParams = useQueryParams()

  useEffect(() => {
    document.title = `Search: ${routeParams.query}`
  }, [])
  return (
    <h1>Has buscado {routeParams.query}</h1>
  )
}

