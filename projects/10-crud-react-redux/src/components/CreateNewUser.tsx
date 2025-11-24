import './CreateNewUser.css'
import type React from 'react'
import { useUserActions } from '../hooks/useUserActions'

export function CreateNewUser() {
  const { addUser } = useUserActions()

  const result = null
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string

    addUser({ name, email, github })
  }

  return (
    <div className='card'>
      <h2 className='title'>Create New User</h2>

      <form onSubmit={handleSubmit} className=''>
        <input
          type='text'
          name='name'
          placeholder='Aquí el nombre'
          className='text-input'
        />
        <input
          type='email'
          name='email'
          placeholder='Aquí el email'
          className='text-input'
        />
        <input
          type='text'
          name='github'
          placeholder='Aquí el usuario de GitHub'
          className='text-input'
        />

        <div>
          <button type='submit' className='submit-button'>
            Crear usuario
          </button>
          <span>
            {result === 'ok' && (
              <span className='badge badge-success'>Guardado correctamente</span>
            )}
            {result === 'ko' && (
              <span className='badge badge-error'>Error con los campos</span>
            )}
          </span>
        </div>
      </form>
    </div>
  )
}