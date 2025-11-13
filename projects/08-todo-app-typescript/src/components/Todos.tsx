import type { JSX } from 'react'
import type { ListOfTodos, TodoId } from '../types'
import { Todo } from './Todo'
// import { type ListOfTodos } from '../types' // otra forma de importar solo tipos

interface Props {
  todos: ListOfTodos
  onRemoveTodo: ({ id }: TodoId) => void
}

export function Todos({ todos, onRemoveTodo }: Props): JSX.Element {
  return (
    <ul className='todo-list'>
      {todos.map(todo => (
        <li
          key={todo.id}
          className={todo.completed ? 'completed' : ''}
        >
          <Todo
            key={todo.id}
            title={todo.title}
            completed={todo.completed}
            id={todo.id}
            onRemoveTodo={() => onRemoveTodo({ id: todo.id })}
          />
        </li>
      ))}
    </ul>
  )
}