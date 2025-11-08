import { Children } from 'react'
import { match } from 'path-to-regexp'
import { useLocation } from '../hooks/useLocation'

// Nota: no debería cambiar lo que renderiza el Router por las query params, solo por la ruta (path)

// Ojo con children, porque cuando solo es uno, no
export function Router ({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>404 Not Found</h1>
}) {
  const { currentPath } = useLocation()
  let routeParams = {}

  // es una utilidad de react que te permite iterar los children como si fueran un array. Es un poco raro, se le pasa primero el children y luego el callback
  const routesFromChildren = Children.map(children, (child) => {
    const { props, type } = child
    const { name } = type
    const isRoute = name === 'Route'

    return isRoute ? props : null
  })

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true
    const matcherUrl = match(path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)
    if (!matched) return false

    routeParams = matched.params // { query: 'react' } // /search/react
    return true
  })?.Component

  return Page
    ? <Page routeParams={routeParams} />
    : <DefaultComponent routeParams={routeParams} />
}
