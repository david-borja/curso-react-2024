import { Link } from '../components/Link'

export default function Page404 () {
  return (
    <>
      <div>
        <h1>404</h1>
        <h2>This is NOT fine</h2>
        <img src='https://midu.dev/images/this-is-fine-404.gif' alt='404 Dog' />
      </div>
      <Link to='/'>Volver a la Home</Link>
    </>
  )
}
