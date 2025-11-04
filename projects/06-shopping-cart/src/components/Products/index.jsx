import './styles.css'
import { AddToCartIcon, RemoveFromCartIcon } from '../Icons'
import { useCart } from '../../../hooks/useCart'

export function Products ({ products }) {
  const { addToCart, cart, removeFromCart } = useCart()

  const checkProductInCart = (product) => {
    return cart.some(item => item.id === product.id)
  }

  const getHandleClick = (product) => {
    const isProductInCart = checkProductInCart(product)
    return isProductInCart
      ? () => removeFromCart(product)
      : () => addToCart(product)
  }

  return (
    <main className='products'>
      <ul>
        {products.map(product => {
          const isProductInCart = checkProductInCart(product)
          return (
            <li key={product.id} className='product'>
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>
              <div>
                <button style={{ backgroundColor: isProductInCart ? 'red' : '#09f' }} onClick={getHandleClick(product)}>
                  {isProductInCart
                    ? <RemoveFromCartIcon />
                    : <AddToCartIcon />}
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
