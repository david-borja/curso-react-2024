import { useId, useState } from 'react'
import './styles.css'
import { useFilters } from '../../../hooks/useFilters'

export const DEFAULT_MAX_PRICE = 2500

// TODO: fix layout shift when changing filters
export function Filters () {
  const { setFilters } = useFilters()
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE)
  const maxPriceFilterId = useId() // genera un id único para cada instancia del componente según el árbol de componentes y el órden de llamada de los hooks
  const categoryFilterId = useId()

  const handleChangeMaxPrice = (event) => {
    // OJO AQUÍ, porque hay dos fuentes de la verdad
    setMaxPrice(event.target.value)
    setFilters((prevState) => ({
      ...prevState,
      maxPrice: Number(event.target.value)
    }))
  }

  const handleChangeCategory = (event) => {
    // ESTO HUELE MAL
    // estamos pasando la función de actualizar estado
    // nativa de React (setState) a un componente hijo
    // debería ser algo más abstracto en el que no haga falta saber cómo actualizar el estado
    setFilters(prevState => ({
      ...prevState,
      category: event.target.value
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor={maxPriceFilterId}>Price</label>
        {/* en una aplicación grande es peligroso ponerle aquí id='price' porque es demasiado genérico y puede ser que lo tengamos en otro sitio y que cause que algo funcione mal */}
        <input type='range' id={maxPriceFilterId} min='0' max='3000' value={maxPrice} onChange={handleChangeMaxPrice} />
        <span>${maxPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Categoría</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value='all'>Todas</option>
          <option value='beauty'>Belleza</option>
          <option value='fragrances'>Fragancias</option>
          <option value='furniture'>Muebles</option>
          <option value='groceries'>Alimentación</option>
        </select>
      </div>
    </section>
  )
}
