import './styles.css'

export function Footer ({ filters }) {
  return (
    <footer className='footer'>
      {/* <h4>Prueba técnica de React</h4> */}
      {JSON.stringify(filters, null, 2)}
    </footer>
  )
}
