import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import { describe, it, beforeEach, expect, vi } from 'vitest'
import { Router } from '../components/Router.jsx'
import { getCurrentPath } from '../utils/index.js'
import { Route } from '../components/Route.jsx'
import { Link } from '../components/Link.jsx'

vi.mock('../utils/index.js', () => ({
  getCurrentPath: vi.fn()
}))

describe('Router', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks() // para que se limpien los mocks entre test
  })

  it('should render without problems', () => {
    render(<Router routes={[]} />)
  })

  it('should render 404 if no routes match', () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>}/>)
    expect(screen.getByText('404'))
  })

  it('should render the component of the matched route', () => {
    getCurrentPath.mockReturnValue('/about')
    const routes = [
      {
        path: '/',
        Component: () => <h1>Home Page</h1>
      },
      {
        path: '/about',
        Component: () => <h1>About Page</h1>
      }
    ]

    render(<Router routes={routes} />)
    expect(screen.getByText('About Page'))
  })

  it('should navigate using Links', async () => {
    getCurrentPath.mockReturnValueOnce('/') // ponemos once, porque queremos que en la navegación del click sí que funcione el getCurrentPath real

    render(
      <Router>
        <Route path='/' Component={() => {
          return (
            <>
              <h1>Home Page</h1>
              <Link to='/about'>Go to About</Link>
            </>
          )
        }} />
        <Route path='/about' Component={() => <h1>About Page</h1>} />
      </Router>
    )

    // click on the Link
    const link = await screen.findByText('Go to About')
    fireEvent.click(link)
    
    // check that the new route is rendered
    expect(await screen.findByText('About Page'))
  })
})