import React from 'react'
import { useSelector,useDispatch} from 'react-redux'
import { logout } from '../reduxStore/main.slice'
import { Link } from "react-router-dom"
import {FiHome,FiShoppingCart,FiBell} from 'react-icons/fi'
import {RiLogoutBoxLine,RiLoginBoxLine,RiUserLine} from 'react-icons/ri'


function NavBar() {
  const dispatch=useDispatch()
  
  const isLoggedIn=useSelector(state=>state.main.isLoggedIn)
  const isAdmin=useSelector(state=>state.main.isAdmin)
  const username=useSelector(state=>state.main.username)
  const linkClass="nav-item nav-link active"

  const handleLogout=()=>{
    dispatch(logout())
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top p-2 ">
  <a className="navbar-brand ps-3"><h2>Book Hive</h2></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <Link className={linkClass} to="/"><FiHome/> Home</Link>
      <Link className={linkClass} to="/order"><FiBell/> Order</Link>
      <Link className={linkClass} to="/cart"><FiShoppingCart/> Cart</Link>
      {isLoggedIn&&<Link className={linkClass}><RiUserLine/> {username}</Link>}
      {isAdmin&&<Link className={linkClass}>Add book</Link>}
      {isLoggedIn&&<Link className={linkClass} onClick={handleLogout}><RiLogoutBoxLine/> Logout</Link>}
      {!isLoggedIn&&<Link className={linkClass} to="/login"><RiLoginBoxLine/> Login</Link>}
    </div>
  </div>
</nav>
  )
}

export default NavBar