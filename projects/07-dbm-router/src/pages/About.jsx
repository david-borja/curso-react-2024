import { Link } from '../components/Link'

export default function AboutPage () {
  return (
    <>
      <h1>About</h1>
      <div>
        <img src='https://reactrouter.com/_brand/React%20Router%20Brand%20Assets/React%20Router%20Logo/Light.svg' width='150px' />
        <p>Hola! Esta es la página About</p>
      </div>
      <Link to='/'>Ir a la Home</Link>
    </>
  )
}
