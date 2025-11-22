import { useEffect, useState } from 'react'

// La T es para indicar que es un valor genérico (Template), y que
// se le va a poder pasar el tipo por parámetro. Pero en realidad no hace falta pasárselo
// TS lo infiere
export function useDebounce<T>( value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}