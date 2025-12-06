
import './App.css'
import { SortBy } from './types.d'
import { UsersTable } from './components/UsersTable'
import { useRowColors } from './hooks/useRowColors'
import { useUsers } from './hooks/useUsers'
// import mockUsersResponse from './mockUsersResponse.json'

function App() {
  const { showColors, toggleShowColors } = useRowColors()
  const { users, sorting, filtering, handlers } = useUsers()

  const { sortBy, toggleSortByCountry, changeSort } = sorting
  const { filterByCountry } = filtering
  const { handleDelete, handleReset } = handlers

  return (
    <div className='App'>
      <h1>Prueba técnica</h1>
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
        <UsersTable
          deleteUser={handleDelete}
          showColors={showColors}
          users={users}
          changeSorting={changeSort}
          sortBy={sortBy}
        />
      </main>
    </div>
  )
}

export default App
