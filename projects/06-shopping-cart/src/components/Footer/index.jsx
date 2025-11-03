import './styles.css'
import { useFilters } from '../../../hooks/useFilters'

export function Footer () {
  const { filters } = useFilters()

  return (
    <footer className='footer'>
      {/* <h4>Prueba técnica de React</h4> */}
      {JSON.stringify(filters, null, 2)}
    </footer>
  )
}
