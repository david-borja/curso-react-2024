import { createContext } from 'react'
import { useCartReducer } from '../hooks/useCartReducer'

// 1. crear el contexto
export const CartContext = createContext()

// 2. crear el provider y exportarlo
// la dependencia de usar React context es mínima
export function CartProvider ({ children }) {
  const {
    state,
    addToCart,
    clearCart,
    removeFromCart
  } = useCartReducer()

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      clearCart,
      removeFromCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}
