// el .d es de declaration, es decir, no tiene código, solo tipos

// type es para un tipo, y no los puedes extender facilmente
// en cambio, interface es el contrato de un objeto y se puede extender
export interface Todo {
  id: string
  title: string
  completed: boolean
}

// La ventaja de usar los Pick es que si en el futuro el id cambia de tipo, por ejemplo a number
// entonces solo hay que cambiarlo en un sitio, en la interfaz Todo
export type TodoTitle = Pick<Todo, 'title'>
export type TodoId = Pick<Todo, 'id'>
export type TodoCompleted = Pick<Todo, 'completed'>

// también se puede hacer type ListOfTodos = Array<Todo>
export type ListOfTodos = Todo[]