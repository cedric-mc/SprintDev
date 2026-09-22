import React, { useState } from 'react'
import axios from 'axios'

const initialForm = {
  titre: '', description: '', categorie: '', latitude: '', longitude: '', citoyen_email: '', mairie_id: '1'
}

const categories = ['Voirie', 'Éclairage', 'Propreté', 'Espaces verts', 'Mobilier urbain']

export default function NouveauSignalement() {
  const [form, setForm] = useState(initialForm)
  const [photo, setPhoto] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
    setError('')
    setMessage('')
  }

  const handlePhotoChange = event => {
    const selectedPhoto = event.target.files[0]
    if (selectedPhoto && selectedPhoto.size > 5 * 1024 * 1024) {
      setPhoto(null)
      setError('La photo ne doit pas dépasser 5 Mo.')
      return
    }
    setPhoto(selectedPhoto || null)
    setError('')
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    const data = new FormData()
    Object.entries(form).forEach(([key, value]) => data.append(key, value))
    if (photo) data.append('photo', photo)

    try {
      await axios.post('/api/signalements', data)
      setForm(initialForm)
      setPhoto(null)
      event.target.reset()
      setMessage('Signalement envoyé. Merci pour votre contribution.')
    } catch (requestError) {
      const details = requestError.response?.data?.details
      setError(details?.join('. ') || requestError.response?.data?.error || 'Impossible d’envoyer le signalement.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ padding: 20, maxWidth: 600 }}>
      <h1>Nouveau signalement</h1>
      <p>Décrivez le problème rencontré dans votre quartier.</p>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="titre">Titre</label>
        <input id="titre" name="titre" value={form.titre} onChange={handleChange} required minLength="3" maxLength="120" style={{ display: 'block', width: '100%', margin: '4px 0 12px', padding: 8 }} />

        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" value={form.description} onChange={handleChange} required minLength="10" maxLength="2000" style={{ display: 'block', width: '100%', margin: '4px 0 12px', padding: 8, height: 100 }} />

        <label htmlFor="categorie">Catégorie</label>
        <select id="categorie" name="categorie" value={form.categorie} onChange={handleChange} required style={{ display: 'block', width: '100%', margin: '4px 0 12px', padding: 8 }}>
          <option value="">Choisir une catégorie</option>
          {categories.map(category => <option key={category} value={category}>{category}</option>)}
        </select>

        <label htmlFor="citoyen_email">Votre email</label>
        <input id="citoyen_email" name="citoyen_email" type="email" value={form.citoyen_email} onChange={handleChange} required style={{ display: 'block', width: '100%', margin: '4px 0 12px', padding: 8 }} />

        <label htmlFor="latitude">Latitude</label>
        <input id="latitude" name="latitude" type="number" step="any" min="-90" max="90" value={form.latitude} onChange={handleChange} required style={{ display: 'block', width: '100%', margin: '4px 0 12px', padding: 8 }} />

        <label htmlFor="longitude">Longitude</label>
        <input id="longitude" name="longitude" type="number" step="any" min="-180" max="180" value={form.longitude} onChange={handleChange} required style={{ display: 'block', width: '100%', margin: '4px 0 12px', padding: 8 }} />

        <label htmlFor="photo">Photo (JPEG, PNG ou WebP, 5 Mo maximum)</label>
        <input id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoChange} style={{ display: 'block', margin: '4px 0 16px' }} />

        <button type="submit" disabled={loading} style={{ background: '#2563eb', color: 'white', padding: '10px 24px', border: 'none' }}>
          {loading ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </form>
      <div role="status" aria-live="polite">
        {message && <p style={{ color: '#166534' }}>{message}</p>}
        {error && <p role="alert" style={{ color: '#b91c1c' }}>{error}</p>}
      </div>
    </main>
  )
}
