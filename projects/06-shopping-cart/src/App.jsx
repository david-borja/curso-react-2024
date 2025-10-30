import { useState } from 'react'
import { Products } from './components/Products'
import { products as initialProducts } from './mocks/products.json'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { isDevelopment } from './config'
import { useFilters } from '../hooks/useFilters'

function App () {
  const { filters, filterProducts } = useFilters()
  const [products] = useState(initialProducts)
  const filteredProducts = filterProducts(products)

  return (
    <>
      {/* esta es una manera para evitar el prop drilling: usar una composición para que el Header renderice los children sin hacer falta que sepa lo que es. Pero esto no siempre es posible */}
      {/* <Header>
        <Filters onChange={setFilters} />
      </Header> */}
      <Header />
      <Products products={filteredProducts} />
      {isDevelopment && <Footer filters={filters} />}
    </>
  )
}

export default App
