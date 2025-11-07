import { Children, useEffect, useState } from 'react'
import { match } from 'path-to-regexp'
import { EVENTS } from '../enums'

// Nota: no debería cambiar lo que renderiza el Router por las query params, solo por la ruta (path)

// Ojo con children, porque cuando solo es uno, no
export function Router ({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404 Not Found</h1> }) {
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

  let routeParams = {}

  // es una utilidad de react que te permite iterar los children como si fueran un array. Es un poco raro, se le pasa primero el children y luego el callback
  const routesFromChildren = Children.map(children, (child) => {
    const { props, type } = child
    const { name } = type
    const isRoute = name === 'Route'

    return isRoute ? props : null
  }).filter(Boolean)

  const routesToUse = routes.concat(routesFromChildren)

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true
    const matcherUrl = match(path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)
    if (!matched) return false

    routeParams = matched.params // {query: 'react' } // /search/react
    return true
  })?.Component

  return Page
    ? <Page routeParams={routeParams} />
    : <DefaultComponent routeParams={routeParams} />
}
