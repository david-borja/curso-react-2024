import { useState } from 'react'
import { Products } from './components/Products'
import { products as initialProducts } from './mocks/products.json'

function App () {
  const [products] = useState(initialProducts)
  const [filters, setFilters] = useState({ category: 'all', maxPrice: Infinity })

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
    <Products products={filteredProducts} />
  )
}

export default App
