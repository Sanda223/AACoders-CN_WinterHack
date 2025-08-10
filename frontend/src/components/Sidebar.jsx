// src/components/Sidebar.jsx
import { Link } from 'react-router-dom'
import '../stylesheets/Sidebar.css'

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul className="sidebar-menu">
          <li><Link to="/Home" onClick={onClose}>Home</Link></li>
          <li><Link to="/" onClick={onClose}>Landing Page</Link></li>
          <li><Link to="/Login" onClick={onClose}>Login</Link></li>
          <li><Link to="/SignUp" onClick={onClose}>Sign Up</Link></li>
          <li><Link to="/CreatePost" onClick={onClose}>Create Post</Link></li>
        </ul>
      </div>

      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
    </>
  )
}
