export function ListOfMovies ({ movies }) {
  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.image} alt={movie.year} />
        </li>
      ))}
    </ul>
  )
}

export function NoMoviesResults () {
  return (<p>No se encontraron películas para esta búsqueda</p>)
}

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0
  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />
}
