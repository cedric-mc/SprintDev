import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await axios.post('/api/auth/login', { email, password })
      localStorage.setItem('urbanlink_token', response.data.token)
      localStorage.setItem('urbanlink_user', JSON.stringify(response.data.user))
      navigate('/admin')
    } catch {
      setError('Email ou mot de passe incorrect.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ padding: 20, maxWidth: 460 }}>
      <h1>Connexion espace mairie</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="admin-email">Email professionnel</label>
        <input id="admin-email" type="email" autoComplete="username" value={email}
          onChange={event => setEmail(event.target.value)} required
          style={{ display: 'block', width: '100%', margin: '8px 0 16px', padding: 10 }} />
        <label htmlFor="admin-password">Mot de passe</label>
        <input id="admin-password" type="password" autoComplete="current-password" value={password}
          onChange={event => setPassword(event.target.value)} required
          style={{ display: 'block', width: '100%', margin: '8px 0 16px', padding: 10 }} />
        {error && <p role="alert">{error}</p>}
        <button type="submit" disabled={loading} style={{ padding: '10px 18px' }}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </main>
  )
}
