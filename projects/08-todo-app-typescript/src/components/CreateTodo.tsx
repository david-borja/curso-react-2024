import React, { useState, type JSX } from 'react'
import type { TodoTitle } from '../types'

interface Props {
  saveTodo: ({ title }: TodoTitle) => void
}

export function CreateTodo({ saveTodo }: Props): JSX.Element {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event: React.KeyboardEvent<HTMLFormElement>): void => {
    event.preventDefault()
    saveTodo({ title: inputValue })
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='new-todo'
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder='¿Qué quieres hacer?'
        autoFocus
      />
    </form>
  )
}