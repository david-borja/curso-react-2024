import { useState, type JSX } from 'react'
import { Todos } from './components/Todos'

const mockTodos = [
  { id: '1', title: 'Learn TypeScript', completed: false },
  { id: '2', title: 'Build a Todo App', completed: true },
  { id: '3', title: 'Master React', completed: false }
]

function App(): JSX.Element {
  const [todos, setTodos] = useState(mockTodos)

  const handldeRemove = (id: string): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  return (
    <main className='todoapp'>
      <Todos
        onRemoveTodo={handldeRemove}
        todos={todos}
      />
    </main>
  )
}

export default App
