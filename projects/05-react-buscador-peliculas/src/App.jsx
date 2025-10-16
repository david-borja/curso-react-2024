import './App.css'
// import { useRef } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

// la ventaja de tener la api mockeada con un json, es que cuando desarrollamos tenemos autocompletado de las propiedades sin estar usando TS

// useRef crea una referencia mutable que persiste en todo el cliclo de vida del componente. Su valor no se reinicia entre renderizados. También es útil para guardar referencias de un elemento del dom

function App () {
  // la principal ventaja de usar un componente a usar una función renderizadora, es que el componente no se vuelve a crear cada vez que se renderiza la aplicación. Las funciones, por defecto, siempre se vuelven a crear
  // tambien facilitan la reutilización
  const { movies } = useMovies()
  // const inputRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    // const fields = new FormData(event.target) // esto devuelve un FormData
    const { query } = Object.fromEntries(new window.FormData(event.target))
    // const query = fields.get('query') // esto es para recuperar uno solo
    // const $input = inputRef.current // nos permite recuperar el elemento (gracias al atributo ref) sin hacer querySelctor
    // const { value } = $input
    console.log(query)

    // si ponemos onClick a un botón de tipo submit, también podemos hacer el submit pulsando Enter como si fuera un onSubmit. Pero poner onSubmit tiene ventajas y nos permite recuperar toda la información del formulario más facilmente
  }

  // OJO: Hay mucha gente que abusa del useRef para recuperar información de los formularios. Pero con el evento podemos recuperar todos los datos que tiene un formulario

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            name='query'
            // ref={inputRef}
            placeholder='Avengers, Star Wars, The Matrix ...'
          />
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
