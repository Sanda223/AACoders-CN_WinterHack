// src/Navbar.jsx
import React from 'react'
import '../stylesheets/Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <button className="hamburger-button">&#9776;</button>
      </div>

      <div className="nav-center">
        <input type="text" className="search-input" placeholder="Search..." />
      </div>

      <div className="nav-right">
        <Link to="/Login">Login</Link>
      </div>
    </nav>
  )
}

export default Navbar
