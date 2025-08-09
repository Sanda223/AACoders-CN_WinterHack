import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './stylesheets/index.css'
import Index from './pages/index.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/SignUp" element={<SignUp />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
