import './App.css'
import { SortBy } from './types.d'
import { UsersTable } from './components/UsersTable'
import { useRowColors } from './hooks/useRowColors'
import { useUsers } from './hooks/useUsers'
import { Results } from './components/Results'
// import mockUsersResponse from './mockUsersResponse.json'

function App() {
  const { showColors, toggleShowColors } = useRowColors()
  const { users, loading, hasNextPage, error, sorting, filtering, handlers } = useUsers()

  const { sortBy, toggleSortByCountry, changeSort } = sorting
  const { filterByCountry } = filtering
  const { handleDelete, handleReset, handleChangePage } = handlers

  return (
    <div className='App'>
      <h1>Prueba técnica</h1>
      <Results />
      <header>
        <button onClick={toggleShowColors}>
          {showColors ? 'No colorear filas' : 'Colorear filas'}
        </button>
        <button onClick={toggleSortByCountry}>
          {sortBy === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
        </button>
        <button onClick={handleReset}>
          Resetear usuarios
        </button>
        <input placeholder='Filtra por país' onChange={filterByCountry} />
      </header>
      <main>
        {users.length > 0 && (
          <UsersTable
            deleteUser={handleDelete}
            showColors={showColors}
            users={users}
            changeSorting={changeSort}
            sortBy={sortBy}
          />
        )}
        {loading && <p>Cargando...</p>}
        {error && <p>Ha habido un error</p>}
        {!loading && !error && users.length === 0 && <p>No hay usuarios</p>}
        {!loading && !error && hasNextPage && (
          <button
            onClick={handleChangePage}
          >Cargar más resultados
          </button>
        )}
        {!loading && !error && !hasNextPage && (
          <p>No hay más resultados</p>
        )}
      </main>
    </div>
  )
}

export default App
