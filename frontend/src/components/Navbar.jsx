// src/components/Navbar.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

function Navbar({ searchTerm, setSearchTerm, onSearch }) {
import '../stylesheets/Navbar.css'
import Sidebar from './Sidebar'

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="nav-center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={onSearch} />
      </div>
      <nav className="navbar">
        <button className="hamburger-button" onClick={toggleSidebar}>
          ☰
        </button>

        <div className="nav-center">
          <input type="text" className="search-input" placeholder="Search..." />
        </div>

        <div className="nav-right">
          <Link to="/Login" style={{ textDecoration: 'none' }}>
            <button className="login-button">Login</button>
          </Link>
        </div>
      </nav>
    </>
  )
}
