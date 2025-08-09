import { useState } from 'react'
import '../stylesheets/Login.css'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Silk from '../components/silk.jsx';

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
      <div className="silk-background">
        <Silk
          speed={5}
          scale={1}
          color="#072b5a"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      <Navbar />

      <div className="container-wrapper">
        <div className="login-container transparent">
          <h1>Login</h1>
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
        </div>
    </div>
  )
}
