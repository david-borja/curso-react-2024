import { useEffect } from 'react'

export default function SearchPage ({ routeParams }) {
  useEffect(() => {
    document.title = `Search: ${routeParams.query}`
  }, [])
  return (
    <h1>Has buscado {routeParams.query}</h1>
  )
}
