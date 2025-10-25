const API_KEY = import.meta.env.VITE_MOVIES_API_KEY
const MOVIES_API_URL = 'https://www.omdbapi.com'

const moviesApiMapper = (movies) => {
  return movies?.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    image: movie.Poster
  }))
}

export async function searchMovies ({ search }) {
  if (search === '') return null

  try {
    const response = await fetch(`${MOVIES_API_URL}/?s=${search}&apikey=${API_KEY}`)
    const data = await response.json()

    const movies = data.Search
    const mappedMovies = moviesApiMapper(movies)

    return mappedMovies
  } catch (error) {
    throw new Error('Error fetching movies')
  }
}
