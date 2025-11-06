// el useReducer nos permite extraer la lógica de actualización del estado
// esto incluso lo podríamos utilizar fuera de React
// además, también nos permite testear la lógica de actualización del estado de forma aislada
// Si hubiéramos dejado esta lógica en el contexto, tendríamos que montar todo el árbol de componentes con el provider para testearla

export const cartInitialState = []

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
}

export function cartReducer (state, action) {
  const { type: actionType, payload: actionPayload } = action

  const actions = {
    [CART_ACTION_TYPES.ADD_TO_CART]: () => {
      const { id } = actionPayload
      const productInCartIndex = state.findIndex(item => item.id === id)

      // producto ya en el carrito
      if (productInCartIndex >= 0) {
        const newCart = structuredClone(state)
        newCart[productInCartIndex].quantity += 1
        return newCart
      }

      // producto no está en el carrito
      const newCart = [...state, { ...actionPayload, quantity: 1 }]
      return newCart
    },
    [CART_ACTION_TYPES.REMOVE_FROM_CART]: () => {
      const { id } = actionPayload
      return state.filter(item => item.id !== id)
    },
    [CART_ACTION_TYPES.CLEAR_CART]: () => {
      return cartInitialState
    }
  }

  const actionCallback = actions[actionType]
  return actionCallback ? actionCallback() : state
}
