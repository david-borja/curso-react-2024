import type { JSX } from 'react'
import type { Todo as TodoType } from '../types'
// otra forma de hacerlo: 
// import { type Todo as TodoType } from '../types'

// type Props = TodoType
interface Props extends TodoType {
  onRemoveTodo: () => void
  onToggleCompleted: ({ id, isCompleted }: Pick<TodoType, 'id' | 'isCompleted'>) => void
}

export function Todo({
  id,
  title,
  isCompleted,
  onRemoveTodo,
  onToggleCompleted
}: Props): JSX.Element {
  const handleToggleCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    onToggleCompleted({ id, isCompleted: event.target.checked })
  }

  return (
    <div className='view'>
      <input
        className='toggle'
        type='checkbox'
        checked={isCompleted}
        onChange={handleToggleCheckbox}
      />
      <label>{title}</label>
      <button
        className='destroy'
        onClick={onRemoveTodo}
      />
    </div>
  )
}