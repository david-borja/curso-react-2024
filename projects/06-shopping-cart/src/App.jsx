import { useState } from 'react'
import { Products } from './components/Products'
import { products as initialProducts } from './mocks/products.json'
import { Header } from './components/Header'
import { DEFAULT_MAX_PRICE } from './components/Filters'

function App () {
  const [products] = useState(initialProducts)
  const [filters, setFilters] = useState({ category: 'all', maxPrice: DEFAULT_MAX_PRICE })

  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price <= filters.maxPrice &&
          (filters.category === 'all' || product.category === filters.category)
      )
    })
  }

  const filteredProducts = filterProducts(products)

  return (
    <>
      {/* esta es una manera para evitar el prop drilling: usar una composición para que el Header renderice los children sin hacer falta que sepa lo que es. Pero esto no siempre es posible */}
      {/* <Header>
        <Filters onChange={setFilters} />
      </Header> */}
      <Header changeFilters={setFilters} />
      <Products products={filteredProducts} />
    </>
  )
}

export default App
