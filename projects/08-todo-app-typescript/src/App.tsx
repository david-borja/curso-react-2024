import { useState, type JSX } from 'react'
import { Todos } from './components/Todos'
import type { Todo as TodoType, TodoId, FilterValue } from './types'
import { TODO_FILTERS } from './enums'
import { Footer } from './components/Footer'

const mockTodos = [
  { id: '1', title: 'Learn TypeScript', isCompleted: false },
  { id: '2', title: 'Build a Todo App', isCompleted: true },
  { id: '3', title: 'Master React', isCompleted: false }
]

function App(): JSX.Element {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = (
    { id, isCompleted }: Pick<TodoType, 'id' | 'isCompleted'>
    // { id, isCompleted }: { id: TodoId, isCompleted: TodoCompleted }
  ): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isCompleted }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const activeCount = todos.filter(todo => !todo.isCompleted).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.isCompleted
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.isCompleted
    return true
  })

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.isCompleted)
    setTodos(newTodos)
  }


  return (
    <main className='todoapp'>
      <Todos
        onToggleCompleted={handleCompleted}
        onRemoveTodo={handleRemove}
        todos={filteredTodos}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      />
    </main>
  )
}

export default App
