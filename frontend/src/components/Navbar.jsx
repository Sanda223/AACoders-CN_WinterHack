// src/Navbar.jsx
import React from 'react'
import '../stylesheets/Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/Home" style={{ textDecoration: 'none' }}>
        <button className="hamburger-button">&#9776;</button>
      </Link>

      <div className="nav-center">
        <input type="text" className="search-input" placeholder="Search..." />
      </div>

      <div className="nav-right">
        <Link to="/Login" style={{ textDecoration: 'none' }}>
          <button className="login-button">Login</button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
