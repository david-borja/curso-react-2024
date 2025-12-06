import { describe, test, expect, vi, beforeAll, afterEach, afterAll, beforeEach } from 'vitest'
import { render, screen, fireEvent, cleanup, waitFor, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import App from './App'
import * as sortUsers from './utils/sortUsers'

const MOCK_USERS = [
  {
    login: { uuid: '1' },
    location: { country: 'Spain' },
    name: { first: 'John', last: 'Doe' },
    email: 'john.doe@example.com'
  },
  {
    login: { uuid: '2' },
    location: { country: 'France' },
    name: { first: 'Jane', last: 'Smith' },
    email: 'jane.smith@example.com'
  },
  {
    login: { uuid: '3' },
    location: { country: 'Germany' },
    name: { first: 'Alice', last: 'Brown' },
    email: 'alice.brown@example.com'
  },
  {
    login: { uuid: '4' },
    location: { country: 'Italy' },
    name: { first: 'Bob', last: 'White' },
    email: 'bob.white@example.com'
  },
  {
    login: { uuid: '5' },
    location: { country: 'USA' },
    name: { first: 'Charlie', last: 'Green' },
    email: 'charlie.green@example.com'
  }
]

const server = setupServer(
  http.get('https://randomuser.me/api/', () => {
    return HttpResponse.json({
      results: MOCK_USERS
    })
  })
)

beforeAll(() => server.listen())
afterEach(() => {
  cleanup()
  server.resetHandlers()
  vi.restoreAllMocks()
})
afterAll(() => server.close())
beforeEach(() => render(<App />))

// Ojo con el queryByText, ya que es un matcher que si no encuentra el elemento no lanza error, devuelve null. En cambio getByText lanza error si no encuentra el elemento. Y para los asíncronos está el findByText, que cuando no encuentra el elemento espera un tiempo a que aparezca antes de lanzar el error. 

// En otras palabras, las comprobaciones toBeTruthy o toBeNull deben hacerse con queryByText, no con getByText. No hace falta comprobar si getByText devuelve algo, porque si no lo encuentra ya lanza error. Y con findByText igual, si no lo encuentra en el tiempo de espera lanza error.

describe('App functionalities', () => {
  test('renders the component with initial users', async () => {
    expect(screen.getByText('Prueba técnica'))
    expect(await screen.findByText('John'))
    expect(await screen.findByText('Jane'))
  })

  test('filters users by country', async () => {
    const user = userEvent.setup()
    const input = screen.getByPlaceholderText('Filtra por país')
    await user.type(input, 'Spain')
    // fireEvent.change(input, { target: { value: 'Spain' } })
    expect(await screen.findByText('John'))
    await waitFor(() => {
      expect(screen.queryByText('Jane')).toBeNull()
    })
  })

  test('sorts users', async () => {
    // By Country
    const button = screen.getByText('Ordenar por país')
    expect(await screen.findByText('John'))

    fireEvent.click(button)

    const tbody = screen.getAllByRole('rowgroup')[1]
    const rows = within(tbody).getAllByRole('row')
    expect(rows[0].textContent).toMatch(/France/i)
    expect(rows[1].textContent).toMatch(/Germany/i)
    expect(rows[2].textContent).toMatch(/Italy/i)
    expect(rows[3].textContent).toMatch(/Spain/i)
    expect(rows[4].textContent).toMatch(/USA/i)

    screen.getByText('No ordenar por país')

    fireEvent.click(button)

    const tbodyAsInitial = screen.getAllByRole('rowgroup')[1]
    const rowsAsInitial = within(tbodyAsInitial).getAllByRole('row')

    expect(rowsAsInitial[0].textContent).toMatch(/Spain/i)
    expect(rowsAsInitial[1].textContent).toMatch(/France/i)
    screen.getByText('Ordenar por país')

    // By Name
    const clickableHeader = screen.getByText('Nombre')

    fireEvent.click(clickableHeader)

    const tbodyName = screen.getAllByRole('rowgroup')[1]
    const rowsName = within(tbodyName).getAllByRole('row')
    expect(rowsName[0].textContent).toMatch(/Alice/i)
    expect(rowsName[1].textContent).toMatch(/Bob/i)
    expect(rowsName[2].textContent).toMatch(/Charlie/i)
    expect(rowsName[3].textContent).toMatch(/Jane/i)
    expect(rowsName[4].textContent).toMatch(/John/i)

    fireEvent.click(clickableHeader)
    const tbodyNameAgain = screen.getAllByRole('rowgroup')[1]
    const rowsNameAgain = within(tbodyNameAgain).getAllByRole('row')
    expect(rowsNameAgain[0].textContent).toMatch(/John/i)
    expect(rowsNameAgain[1].textContent).toMatch(/Jane/i)
    expect(rowsNameAgain[2].textContent).toMatch(/Alice/i)
    expect(rowsNameAgain[3].textContent).toMatch(/Bob/i)
    expect(rowsNameAgain[4].textContent).toMatch(/Charlie/i)
  })

  test('no sorting when typing a country to filter by', async () => {
    const user = userEvent.setup()
    const spyedSortUsers = vi.spyOn(sortUsers, 'sortUsers')
    const button = screen.getByText('Ordenar por país')
    expect(await screen.findByText('John'))
    fireEvent.click(button)

    const input = screen.getByPlaceholderText('Filtra por país')
    await user.type(input, 'France')
    // fireEvent.change(input, { target: { value: 'France' } })
    expect(spyedSortUsers).toHaveBeenCalledTimes(1) // Only called once when clicking the sort button
  })

  test('deletes user row from the list', async () => {
    const johnRow = await screen.findByRole('row', { name: /John Doe Spain/i })
    expect(johnRow).toBeTruthy()
    const deleteButton = within(johnRow).getByRole('button', { name: /Borrar/i })
    fireEvent.click(deleteButton)

    expect(screen.queryByRole('row', { name: /John Doe Spain/i })).toBeNull()
  })

  test('resets users to the original list', async () => {
    const resetButton = screen.getByText('Resetear usuarios')
    const johnRow = await screen.findByRole('row', { name: /John Doe Spain/i })
    expect(johnRow).toBeTruthy()
    const deleteButton = within(johnRow).getByRole('button', { name: /Borrar/i })
    fireEvent.click(deleteButton)

    expect(screen.queryByRole('row', { name: /John Doe Spain/i })).toBeNull()

    fireEvent.click(resetButton)
    expect(screen.getByRole('row', { name: /John Doe Spain/i }))
  })

  test('toggles row coloring', async () => {
    const button = screen.getByText('Colorear filas')
    expect(await screen.findByText('John'))
    fireEvent.click(button)
    const tbody = screen.getAllByRole('rowgroup')[1]

    const rows = within(tbody).getAllByRole('row')
    expect(rows[0].style.backgroundColor).toBe('#333')
    expect(rows[1].style.backgroundColor).toBe('#555')

    fireEvent.click(button)
    expect(rows[0].style.backgroundColor).toBe('transparent')
    expect(rows[1].style.backgroundColor).toBe('transparent')
  })

  test('no sorting when toggling row coloring', async () => {
    const spyedSortUsers = vi.spyOn(sortUsers, 'sortUsers')
    const button = screen.getByText('Colorear filas')
    expect(await screen.findByText('John'))
    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)

    expect(spyedSortUsers).toHaveBeenCalledTimes(0)
  })
})

describe('App user stories', () => {
  test('sorts by name, filters users by country and deletes filter', async () => {
    expect(await screen.findByText('Jane'))
    const clickableHeader = screen.getByText('Nombre')
    fireEvent.click(clickableHeader)

    const user = userEvent.setup()
    const input = screen.getByPlaceholderText('Filtra por país')
    await user.type(input, 'Spain')

    expect(await screen.findByText('John'))
    await waitFor(() => {
      expect(screen.queryByText('Jane')).toBeNull()
    })

    user.clear(input)
    expect(await screen.findByText('Jane'))
  })

  test('sorts by name, filters users by country and deletes user', async () => {
    expect(await screen.findByText('Jane'))
    const clickableHeader = screen.getByText('Nombre')
    fireEvent.click(clickableHeader)

    const user = userEvent.setup()
    const input = screen.getByPlaceholderText('Filtra por país')
    await user.type(input, 'S')

    expect(await screen.findByText('John'))
    expect(await screen.findByText('Charlie'))
    await waitFor(() => {
      expect(screen.queryByText('Jane')).toBeNull()
    })

    const johnRow = await screen.findByRole('row', { name: /John Doe Spain/i })
    expect(johnRow).toBeTruthy()
    const deleteButton = within(johnRow).getByRole('button', { name: /Borrar/i })
    fireEvent.click(deleteButton)

    expect(screen.queryByRole('row', { name: /John Doe Spain/i })).toBeNull()
  })
})

// falla restaurar los usuarios cuando se va borrando la query cuando la lista está ordenada
// en este caso, tampoco se puede resetear
// no se puede borrar cuando la lista está ordenada
// falta testear que no se ordena cuando se borra un usuario
// guardar usuarios borrados en una ref. 
// testear que cuando se filtra y se borra un usuario, al quitar el filtro el usuario borrado no reaparece. Y tampoco si se cambia la ordenación.