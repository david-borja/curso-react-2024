import { useEffect, useState } from 'react'
import { EVENTS } from '../enums'

export function useLocation () {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange) // este evento sí es nativo

    return () => {
      // muy importante que sea la misma referencia que en el addEventListener
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  return { currentPath }
}
