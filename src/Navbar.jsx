// src/Navbar.jsx
import React from 'react'
import './Navbar.css'

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
        <p>profile</p>
      </div>
    </nav>
  )
}

export default Navbar
