import { useState, type JSX } from 'react'
import { Todos } from './components/Todos'
import type { Todo as TodoType, TodoId } from './types'

const mockTodos = [
  { id: '1', title: 'Learn TypeScript', isCompleted: false },
  { id: '2', title: 'Build a Todo App', isCompleted: true },
  { id: '3', title: 'Master React', isCompleted: false }
]

function App(): JSX.Element {
  const [todos, setTodos] = useState(mockTodos)

  const handldeRemove = ({ id }: TodoId): void => {
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

  return (
    <main className='todoapp'>
      <Todos
        onToggleCompleted={handleCompleted}
        onRemoveTodo={handldeRemove}
        todos={todos}
      />
    </main>
  )
}

export default App
