import { useReducer } from 'react'
import { CART_ACTION_TYPES, cartInitialState, cartReducer } from '../reducers/cart'

export function useCartReducer () {
  // dispatch es la función que se usa para enviar acciones al reducer
  // lo hemos extraido a un custom hook y lo podemos hacer con un estado global o no
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = (product) => dispatch({
    type: CART_ACTION_TYPES.ADD_TO_CART,
    payload: product
  })

  const removeFromCart = (product) => dispatch({
    type: CART_ACTION_TYPES.REMOVE_FROM_CART,
    payload: product
  })

  const clearCart = () => dispatch({
    type: CART_ACTION_TYPES.CLEAR_CART
  })

  return {
    state,
    addToCart,
    clearCart,
    removeFromCart
  }
}
