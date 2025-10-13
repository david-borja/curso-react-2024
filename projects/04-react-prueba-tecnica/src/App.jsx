import './style.css'
import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'

export function App () {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })
  // const [factError, setFactError] = useState()

  // const getRandomFact = () => {
  //   fetch(CAT_ENDPOINT_RANDOM_FACT).then(res => {
  //   // if (!res.ok) setFactError('No se ha podido recuperar la cita')
  //     if (!res.ok) throw new Error('Error fetching fact')
  //     return res.json()
  //   }).then(data => {
  //     const { fact } = data
  //     setFact(fact)
  //   }).catch((err) => {
  //   // OJO: aquí entra si ha habido un error en la petición (que se corte internet), no en la respuesta
  //   // pero, si en !res.ok lanzamos un error, aquí lo podemos recoger
  //   // si usamos axios, en el catch sí nos mete por defecto todos los errores
  //     console.error(err)
  //   })
  // }

  const handleClick = async () => {
    refreshFact()
  }

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>Get new fact</button>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three words for ${fact}`} />}
    </main>
  )
}
