import { useContext } from 'react'
import { Link } from 'react-router-dom'
import {ShoppingCartContext} from '../../Context'
import OrderCard from '../OrderCard'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { totalPrice } from '../../utils'
import './styles.css'

const CheckOutSideMenu = () => {
  const context = useContext(ShoppingCartContext)

  const handleDelete = (id) =>{
    const filteredProdcuts = context.cartProducts.filter(product => product.id != id)
    context.setCartProducts(filteredProdcuts)
    context.setCount(context.count - 1)
  }

  const handleCheckout = () =>{
    const orderToAdd = {
      date: '01.02.23',
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts)
    }

    context.setOrder([...context.order,orderToAdd]) // lo que tenía en order más lo que trae orderToAdd
    context.setCartProducts([])
    context.setCount(0);

    context.setSearchByTitle(null)
  }

  return(
    <aside 
      className={`${context.isCheckoutsideMenuOpen ? 'flex' : 'hidden'} checkou-side-menu flex flex-col fixed right-0 border border-black rounded-lg bg-white`}
    >
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-xl'>My Order</h2>
        <div 
          className='cursor-pointer'
           onClick={() => context.closeCheckoutsideMenu()}
        >
          <XMarkIcon className='h-6 w-6 text-black' ></XMarkIcon>
        </div>
      </div>
      <div className='px-6 overflow-y-auto flex-1'>
        {
          context.cartProducts.map(product => (
            <OrderCard 
              key={product.id}
              id={product.id}
              title={product.title}
              imageUrl={product.images}
              price={product.price}
              handleDelete={handleDelete}
            />
          ))
        }
      </div>
      <div className='px-6 mb-6'>
        <p className='flex justify-between items-center mb-2'>
          <span className='font-light'>Total: </span>
          <span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span>
        </p>
        <Link to='/my-orders/last'>
          <button className='bg-black py-3 text-white rounded-lg w-full' onClick={()=>handleCheckout()}>Checkout</button>
        </Link>
      </div>
    </aside>
  )
}

export default CheckOutSideMenu