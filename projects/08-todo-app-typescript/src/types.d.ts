// el .d es de declaration, es decir, no tiene código, solo tipos

// type es para un tipo, y no los puedes extender facilmente
// en cambio, interface es el contrato de un objeto y se puede extender
export interface Todo {
  id: string
  title: string
  completed: boolean
}

// también se puede hacer type ListOfTodos = Array<Todo>
export type ListOfTodos = Todo[]