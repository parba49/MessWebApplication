import React from 'react'
import { Link } from 'react-router-dom' 
import "./index.css"
const Header = () => {
  return (
    <nav>
        <Link to="/HomePage">Home</Link>
        <Link to="/">Message</Link>  &nbsp;
        <Link to="/Register">Register</Link> &nbsp;
        <Link to="/Login">Login</Link>  &nbsp; 
        <Link to="/Logout">Logout</Link>
       
    </nav>
  )
}

export default Header
