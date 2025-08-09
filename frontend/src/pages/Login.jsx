import { useState } from 'react'
import '../stylesheets/Login.css'
import axios from 'axios'
import Navbar from '../components/Navbar'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Simple validation
    if (!email || !password) {
      setError('Email and password are required.')
      return
    }

    setError('')
    setSuccess('')
    // TODO: Replace with real authentication
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      })

      setSuccess(response.data.message || 'Login successful!')
      setEmail('')
      setPassword('')
       alert(`Logging in with:\nEmail: ${email}\nPassword: ${'*'.repeat(password.length)}`)

    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Login failed')
      } else {
        setError('Login failed')
      }
    }
  }

  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email..."
              required
            />

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password..."
              required
            />

            {error && <p className="error">{error}</p>}

            <button type="submit">Log In</button>
          </form>
        </div>
      </main>
    </div>
  )
}
