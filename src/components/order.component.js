import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../reduxStore/main.slice'


function Order() {
  let dispatch=useDispatch()
  let order=useSelector(state=>state.main.order)

  useEffect(()=>{
    dispatch(getAllOrders())
  },[])
  return (
    <div>
      {JSON.stringify(order)}
    </div>
  )
}

export default Order