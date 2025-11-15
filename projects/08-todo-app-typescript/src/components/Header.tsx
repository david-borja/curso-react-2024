import type { JSX } from 'react';
import type { TodoTitle } from '../types';
import { CreateTodo } from './CreateTodo';

interface Props {
  onAddTodo: ({ title }: TodoTitle) => void;
}

export function Header({ onAddTodo }: Props): JSX.Element {

  return (
    <header className='header'>
      <h1>todo<img style={{ width: '60px', height: 'auto' }} alt='hello' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png' /></h1>

      <CreateTodo saveTodo={onAddTodo} />
    </header>
  )
}