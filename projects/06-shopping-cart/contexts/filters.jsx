import { createContext, useState } from 'react'

const DEFAULT_CATEGORY = 'all'
const DEFAULT_MAX_PRICE = 2500
// El contexto es una forma de inyección de dependencias
// Puede ser estático para configuraciones globales (tema, idioma, etc)

// 1. Crear el Contexto
export const FiltersContext = createContext({})

// 2. Crear el Provider, para proveer el contexto
export function FiltersProvider ({ children }) {
  const [filters, setFilters] = useState({
    category: DEFAULT_CATEGORY,
    maxPrice: DEFAULT_MAX_PRICE
  })
  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  )
}
