import { useRef, useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef('')

  const getMovies = async () => {
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
  }

  return { movies, getMovies, loading, error }
}
