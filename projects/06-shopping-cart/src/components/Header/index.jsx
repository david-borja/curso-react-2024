import { Filters } from '../Filters'

export function Header ({ changeFilters }) {
  return (
    <>
      <h1>React Shop</h1>
      <Filters onChange={changeFilters} />
    </>
  )
}
