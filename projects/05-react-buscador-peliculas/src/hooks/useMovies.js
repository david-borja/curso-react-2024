import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

const sortMovies = (movies, key) => {
  if (key === 'title') return movies.toSorted((a, b) => a.title.localeCompare(b.title))
}

export function useMovies ({ sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef('')

  // el useCallback nos permite pasarle directamente la función, a diferencia del useMemo que necesita que le devolvamos una función que retorne el valor a memoizar. El useCallback utiliza por debajo el useMemo
  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const searchedMovies = await searchMovies({ search })
      setMovies(searchedMovies)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const sortedMovies = useMemo(() => sort ? sortMovies(movies, 'title') : movies, [sort, movies])

  return {
    movies: sortedMovies,
    getMovies,
    loading,
    error
  }
}
