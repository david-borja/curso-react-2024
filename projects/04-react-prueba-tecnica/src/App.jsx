import { useEffect, useState } from 'react'
import './style.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState('')
  // const [factError, setFactError] = useState()

  // recuperar la cita al cargar la página
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT).then(res => {
      // if (!res.ok) setFactError('No se ha podido recuperar la cita')
      if (!res.ok) throw new Error('Error fetching fact')
      return res.json()
    }).then(data => {
      const { fact } = data
      setFact(fact)
    }).catch((err) => {
      // OJO: aquí entra si ha habido un error en la petición (que se corte internet), no en la respuesta
      // pero, si en !res.ok lanzamos un error, aquí lo podemos recoger
      // si usamos axios, en el catch sí nos mete por defecto todos los errores
      console.error(err)
    })
    // con async await
    // async function getRandomFact () {
    //   const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
    //   const json = await res.json()
    //   setFact(json.fact)
    // }

    // getRandomFact()
  }, [])

  // para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return

    const words = fact.split(' ', 3).join(' ')
    fetch(`https://cataas.com/cat/says/${words}?size=50&color=red&json=true`).then(res => res.json()).then(data => {
      const { url } = data
      setImageUrl(url)
    })
  }, [fact])
  return (
    <main>
      <h1>App de gatitos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three words for ${fact}`} />}
    </main>
  )
}
