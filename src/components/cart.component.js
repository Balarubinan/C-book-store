import React from 'react'
import { useSelector } from 'react-redux'

function Cart() {
  let cartItems=useSelector(state=>state.main.cart)

  return (
    <div>Cart Page :
      {JSON.stringify(cartItems)}
    </div>
  )
}

export default Cart