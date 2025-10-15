import './App.css'
import responseMovies from './mocks/with-results.json'
import { Movies } from './components/Movies'

// la ventaja de tener la api mockeada con un json, es que cuando desarrollamos tenemos autocompletado de las propiedades sin estar usando TS

function App () {
  // la principal ventaja de usar un componente a usar una función renderizadora, es que el componente no se vuelve a crear cada vez que se renderiza la aplicación. Las funciones, por defecto, siempre se vuelven a crear
  // tambien facilitan la reutilización
  const movies = responseMovies.Search
  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form'>
          <input placeholder='Avengers, Star Wars, The Matrix ...' />
          {/* el último botón de un formulario es de type submit por defecto */}
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
