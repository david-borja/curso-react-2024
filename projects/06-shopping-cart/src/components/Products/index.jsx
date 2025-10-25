import { AddToCartIcon } from '../Icons'
import './styles.css'

export function Products ({ products }) {
  return (
    <main className='products'>
      <ul>
        {products.map(product => (
          <li key={product.id} className='product'>
            <img src={product.thumbnail} alt={product.title} />
            <div>
              <strong>{product.title}</strong>
            </div>
            <div>
              <button>
                <AddToCartIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
