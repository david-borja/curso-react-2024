// el useReducer nos permite extraer la lógica de actualización del estado
// esto incluso lo podríamos utilizar fuera de React
// además, también nos permite testear la lógica de actualización del estado de forma aislada
// Si hubiéramos dejado esta lógica en el contexto, tendríamos que montar todo el árbol de componentes con el provider para testearla

const cartEmptyState = []
export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || cartEmptyState

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
}

export function updateLocalStorageCart (state) {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

const actions = {
  [CART_ACTION_TYPES.ADD_TO_CART]: (state, payload) => {
    const { id } = payload
    const productInCartIndex = state.findIndex(item => item.id === id)

    // producto ya en el carrito
    if (productInCartIndex >= 0) {
      const newCart = structuredClone(state)
      newCart[productInCartIndex].quantity += 1

      // usando slice sería
      // const newCart = [
      //   ...state.slice(0, productInCartIndex),
      //   {
      //     ...state[productInCartIndex],
      //     quantity: state[productInCartIndex].quantity + 1
      //   },
      //   ...state.slice(productInCartIndex + 1)
      // ]
      updateLocalStorageCart(newCart)
      return newCart
    }

    // producto no está en el carrito
    const newCart = [...state, { ...payload, quantity: 1 }]
    updateLocalStorageCart(newCart)
    return newCart
  },
  [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, payload) => {
    const { id } = payload
    const newCart = state.filter(item => item.id !== id)
    updateLocalStorageCart(newCart)
    return newCart
  },
  [CART_ACTION_TYPES.CLEAR_CART]: () => {
    updateLocalStorageCart(cartEmptyState)
    return cartEmptyState
  }
}

export function cartReducer (state, action) {
  const { type: actionType, payload: actionPayload } = action

  const actionCallback = actions[actionType]
  return actionCallback ? actionCallback(state, actionPayload) : state
}
