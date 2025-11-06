import { navigate } from '../components/Link'

export default function HomePage () {
  return (
    <>
      <h1>Home</h1>
      <p>Esta es una página de ejemplo</p>
      <button onClick={() => navigate('/about')}>Ir a About</button>
    </>
  )
}
