import React from 'react'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import Rating from './rating.component'
import { addToCart, placeOrder, removeCartItem, setCartTotal, setViewBook, showMsg } from '../reduxStore/main.slice'
import { useNavigate } from 'react-router-dom'
import {AiFillCloseCircle} from 'react-icons/ai'
import {RiArrowDownSFill,RiArrowUpSFill} from "react-icons/ri"

function Cart(props) {
  // &#8377; is ruppess symbol
  let orderDisplayMode=props.orderMode||false
  let cartItems=useSelector(state=>state.main.cart)
  let totalAmount=useSelector(state=>state.main.cart.reduce((ttl,cartBook,i)=>ttl+cartBook.subTotal,0))


  let dispatch=useDispatch()
  let navig=useNavigate()

  const handleViewBook=(title)=>{
    dispatch(setViewBook(cartItems.find(book=>book.title==title)))
    navig('/viewbook')
  }

  const handleIncQty=(title)=>{
    dispatch(setViewBook(cartItems.find(book=>book.title==title)))
    dispatch(addToCart())
  }

  const handleDecQty=(title)=>{
    let modBook=cartItems.find(book=>book.title==title)
    dispatch(setViewBook(modBook))
    if(modBook.qty-1>1)
      dispatch(addToCart({adder:-1}))
    else
      dispatch(showMsg({msg:"Atleast one item needed",type:"error"}))
  }

  const handleRemoveItem=(title)=>{
    dispatch(removeCartItem(title))
  }

  const handlePlaceOrder=()=>{
    if(cartItems.length>0){
      dispatch(setCartTotal(totalAmount))
      dispatch(placeOrder())
      dispatch(showMsg({msg:"Order Placed",type:"success"}))
    }else{
      dispatch(showMsg({msg:"Add Items to order",type:"error"}))
    }
  }



  return (
    <div className='row p-4'>
      <div className="col-md-9">
      {!cartItems.length>0&&<div className='h3 text-secondary'>No Items in Cart</div>}
      {cartItems.length>0&&cartItems.map(({title,image,qty,price,subTotal,rating})=>(
      <div className="card p-2 ms-4 mb-2">
        <div className="col pb-2 ms-2">
          <div className="h3">
            {title}
            {!orderDisplayMode&&<AiFillCloseCircle 
              style={{position:"absolute",right:"0px"}} 
              onClick={e=>handleRemoveItem(title)} 
            />}
          </div>
        </div>
        <div className="row h-100">
          <div className="col" onClick={e=>handleViewBook(title)}>
            <img src={image} alt="" height="200px" width="150px" />
            <Rating rating={rating}/>
          </div>
          <div className="col pt-5 h2">
            <div onClick={e=>handleIncQty(title)}>
              {!orderDisplayMode&&<RiArrowUpSFill/>}
            </div>
            {qty}
            <div onClick={e=>handleDecQty(title)}>
              {!orderDisplayMode&&<RiArrowDownSFill/>}
            </div>
          </div>
          <div className="col pt-5 h2">
            &#8377;{price}
          </div>
          <div className="col pt-5 h2">
            &#8377;{subTotal}
          </div>
        </div>
      </div>))}
      </div>
      <div className="col-md-3">
        <div className="col sticky-top2">
          <div className="card h3 p-3">
            <div className='p-1'>Total Amount : &#8377;{totalAmount}<br/></div>
            <div className='p-1'>
            {!orderDisplayMode&&<button className='btn btn-primary' width="50px" onClick={handlePlaceOrder}>Place order</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart