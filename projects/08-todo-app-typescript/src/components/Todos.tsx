import type { JSX } from 'react'
import type { ListOfTodos, Todo as TodoType, TodoId } from '../types'
import { Todo } from './Todo'
// import { type ListOfTodos } from '../types' // otra forma de importar solo tipos

interface Props {
  todos: ListOfTodos
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleted: ({ id, isCompleted }: Pick<TodoType, 'id' | 'isCompleted'>) => void
}

export function Todos({ todos, onRemoveTodo, onToggleCompleted }: Props): JSX.Element {
  return (
    <ul className='todo-list'>
      {todos.map(todo => (
        <li
          key={todo.id}
          className={todo.isCompleted ? 'completed' : ''}
        >
          <Todo
            key={todo.id}
            title={todo.title}
            isCompleted={todo.isCompleted}
            id={todo.id}
            onRemoveTodo={() => onRemoveTodo({ id: todo.id })}
            onToggleCompleted={onToggleCompleted}
          />
        </li>
      ))}
    </ul>
  )
}