import type { JSX } from 'react'
import type { Todo as TodoType } from '../types'
// otra forma de hacerlo: 
// import { type Todo as TodoType } from '../types'

// type Props = TodoType
interface Props extends TodoType {
  onRemoveTodo: () => void
}

export function Todo({ id, title, completed, onRemoveTodo }: Props): JSX.Element {
  return (
    <div className='view'>
      <input
        className='toggle'
        type='checkbox'
        checked={completed}
        onChange={() => { }}
      />
      <label>{title}</label>
      <button
        className='destroy'
        onClick={onRemoveTodo}
      />
    </div>
  )
}