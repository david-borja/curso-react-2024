import type React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getComments, postComment, type CommentWithId } from './services/comments'
import { FormInput, FormTextArea } from './components/Form'
import { Results } from './components/Results'

function App() {
  const { data, isLoading, error } = useQuery<CommentWithId[]>({
    queryKey: ['comments'],
    queryFn: getComments
  })

  const queryClient = useQueryClient()

  const { mutate, isPending: isLoadingMutation } = useMutation({
    mutationFn: postComment,
    // onSuccess: async (newComment) => {
    //   // 1. Actualizar la caché de react-query manualmente
    //   // await queryClient.setQueryData(['comments'], (oldData?: CommentWithId[]) => {
    //   //   if (oldData == null) return [newComment]
    //   //   return [...oldData, newComment]
    //   // })

    //   // 2. Hacer otra vez un refetch de la query. Haremos esta si por ejemplo en el backend se le añaden algunos campos extra
    //   // await queryClient.invalidateQueries({
    //   //   queryKey: ['comments']
    //   // })
    // }
    onMutate: async (newComment) => {
      // 3. Actualización optimista
      // primero cancelamos cualquier fetch en curso
      await queryClient.cancelQueries({ queryKey: ['comments'] })

      // guardamos una copia de los comentarios anteriores por si hay que hacer rollback
      const previousComments = queryClient.getQueryData<CommentWithId[]>(['comments'])

      // actualizamos la caché de react-query manualmente para que el nuevo comentario aparezca inmediatamente
      await queryClient.setQueryData(['comments'], (oldData?: CommentWithId[]) => {
        const newCommentToAdd = structuredClone(newComment)
        newCommentToAdd.isPreview = true
        if (oldData == null) return [newCommentToAdd]
        return [...oldData, newCommentToAdd]
      })

      // esto va a una variable llamada context que estará disponible en onError y onSettled
      return { previousComments }
    },
    // esto va con la actualización optimista
    onError: (error, _variables, context) => {
      console.error(error)
      // hacemos rollback a los comentarios anteriores
      if (context?.previousComments) {
        queryClient.setQueryData(['comments'], context.previousComments)
      }
    },
    // esto va con la actualización optimista
    onSettled: async () => {
      // esta función se llama tanto si la mutación falla como si va bien
      await queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
    onSuccess: () => {
      // limpiar el formulario tras el envío correcto
      const form = document.querySelector('form')
      form?.reset()
    }
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (isLoadingMutation) return
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const message = data.get('message')?.toString() ?? ''
    const title = data.get('title')?.toString() ?? ''

    if (title && message) {
      mutate({ title, message })
    }
  }

  return (
    <main className='grid grid-cols-2 h-screen'>
      <div className='col-span-1 bg-white p-8'>

        {isLoading && <strong>Cargando...</strong>}
        {error != null && <strong>Algo ha ido mal</strong>}
        <Results data={data} />

      </div>
      <div className='col-span-1 bg-black p-8'>
        <form className={`${isLoadingMutation ? 'opacity-40' : ''} max-w-xl m-auto block px-4`} onSubmit={handleSubmit}>

          <FormInput />
          <FormTextArea />

          <button
            disabled={isLoadingMutation}
            type='submit' className='mt-4 px-12 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center mr-2 mb-2'
          >
            {isLoadingMutation ? 'Enviando comentario...' : 'Enviar comentario'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default App