import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function ViewBook() {
  // show book details
  // quatity change
  // on add show success message and goto home page
  // show total and sub total values
  
  let dispatch=useDispatch()
  let book=useSelector(state=>state.main.viewingBook)
  return (
    <div>ViewBook : {book.title}</div>
  )
}

export default ViewBook