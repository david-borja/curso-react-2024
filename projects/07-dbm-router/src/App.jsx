import { lazy, Suspense } from 'react'
import { Router } from './components/Router'
import HomePage from './pages/Home' // la home prefiero que no sea lazy
import { Route } from './components/Route'
import './App.css'

const LazyPage404 = lazy(() => import('./pages/Page404'))
const LazyAboutPage = lazy(() => import('./pages/About'))

// import('./pages/About') // import dinámico -> devuelve una promesa
// se podría meter en una función

// function getAboutPage () {
//   return import('./pages/About')
// }

const routes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: '/search/:query',
    Component: lazy(() => import('./pages/Search'))
  }
]

function App () {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Router routes={routes} defaultComponent={LazyPage404}>
          <Route path='/' Component={HomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
