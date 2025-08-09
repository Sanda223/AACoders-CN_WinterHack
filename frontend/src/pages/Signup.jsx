import { useState } from 'react'
import axios from 'axios'
import '../stylesheets/Signup.css'
import Navbar from '../components/Navbar'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
      setError('All fields are required.')
      return
    }

    // TODO: Send data to backend
    setError('')
    setSuccess('')

    try {
      // Send POST request to backend API
      const response = await axios.post('http://localhost:5000/api/signup', {
        name,
        email,
        password,
      })

      setSuccess(response.data.message || 'Signup successful!')
      setName('')
      setEmail('')
      setPassword('')

      alert(`Signed up as:\nName: ${name}\nEmail: ${email}`)

      } catch (err) {
      // Handle errors returned from backend
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Signup failed')
      } else {
        setError('Signup failed')
      }
    }
  }
    
  

  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <div className="signup-container">
          <h2>Sign Up</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            {error && <p className="error">{error}</p>}

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </main>
    </div>
  )
}
