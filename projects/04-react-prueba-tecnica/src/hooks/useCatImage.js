import { useEffect, useState } from 'react'
import { getCatImageWithWords } from '../services/cats'

export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState('')
  // para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return

    const words = fact.split(' ', 3).join(' ')
    getCatImageWithWords({ words }).then(setImageUrl)
  }, [fact])

  return { imageUrl } // si podemos evitar devolver los métodos de actualizar el estado, mejor. Porque así evitaremos que el estado se pueda modificar desde fuera
}
