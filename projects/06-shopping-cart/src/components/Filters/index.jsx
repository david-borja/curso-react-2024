import './styles.css'
import { useState } from 'react'

const DEFAULT_MAX_PRICE = 80

export function Filters ({ onChange }) {
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE)

  const handleChangeMaxPrice = (event) => {
    // OJO AQUÍ, porque hay dos fuentes de la verdad
    setMaxPrice(event.target.value)
    onChange((prevState) => ({
      ...prevState,
      maxPrice: Number(event.target.value)
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor='price'>Price</label>
        <input type='range' id='price' min='0' max='100' value={maxPrice} onChange={handleChangeMaxPrice} />
        <span>${maxPrice}</span>
      </div>

      <div>
        <label htmlFor='category'>Categoría</label>
        <select id='category'>
          <option value='all'>Todas</option>
          <option value='laptops'>Portátiles</option>
          <option value='smartphones'>Celulares</option>
        </select>
      </div>
    </section>
  )
}
