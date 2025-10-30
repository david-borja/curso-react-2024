import { createContext, useState } from 'react'
import { DEFAULT_MAX_PRICE } from '../src/components/Filters'

// El contexto es una forma de inyección de dependencias
// Puede ser estático para configuraciones globales (tema, idioma, etc)

// 1. Crear el Contexto
export const FiltersContext = createContext({})

// 2. Crear el Provider, para proveer el contexto
export function FiltersProvider ({ children }) {
  const [filters, setFilters] = useState({
    category: 'all',
    maxPrice: DEFAULT_MAX_PRICE
  })
  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  )
}
