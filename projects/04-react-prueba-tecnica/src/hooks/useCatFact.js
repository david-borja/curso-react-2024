import { useEffect, useState } from 'react'
import { getRandomFact } from '../services/cats'

export function useCatFact () { // intentamos que sea una caja negra, y que el nombre no diga nada sobre la implementacion
  const [fact, setFact] = useState()

  const refreshFact = () => {
    getRandomFact().then(setFact)
  } // ojo, esta manera de pasar las funciones como param, a veces es mala práctica, porque se le están pasando todos los parámetros
  // recuperar la cita al cargar la página
  useEffect(refreshFact, [])

  return { fact, refreshFact } // aquí es mejor devolver el refreshFact en lugar del setFact. Porque así siempre se va a encargar el hook de la actualización y podemos reutilizar esta lógica donde sea
}
