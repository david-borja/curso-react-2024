import { useEffect, useState } from 'react'
import { EVENTS } from '../enums'
import { getCurrentPath } from '../utils'

export function useLocation () {
  const [currentPath, setCurrentPath] = useState(getCurrentPath())

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath())
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
