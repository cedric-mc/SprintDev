import React, { useState } from 'react'
import axios from 'axios'

const initialForm = {
  titre: '', description: '', categorie: '', latitude: '', longitude: '', citoyen_email: '', mairie_id: '1'
}

const categories = ['Voirie', 'Éclairage', 'Propreté', 'Espaces verts', 'Mobilier urbain']

export default function NouveauSignalement() {
  const [form, setForm] = useState({
    titre: '', description: '', categorie: '',
    latitude: '', longitude: '', citoyen_email: '', mairie_id: 1
  })
  const [photo, setPhoto] = useState(null)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})

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

  const handleSubmit = async e => {
    e.preventDefault()
    const nextErrors = {}
    if (form.titre.trim().length < 3) nextErrors.titre = 'Le titre doit contenir au moins 3 caractères.'
    if (form.description.trim().length < 10) nextErrors.description = 'La description doit contenir au moins 10 caractères.'
    if (!form.citoyen_email.includes('@')) nextErrors.citoyen_email = 'Adresse email invalide.'
    if (!Number.isFinite(Number(form.latitude)) || Number(form.latitude) < -90 || Number(form.latitude) > 90) nextErrors.latitude = 'Latitude invalide.'
    if (!Number.isFinite(Number(form.longitude)) || Number(form.longitude) < -180 || Number(form.longitude) > 180) nextErrors.longitude = 'Longitude invalide.'
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      setMessage('Corrigez les champs signalés.')
      return
    }
    try {
      const payload = new FormData()
      Object.entries(form).forEach(([name, value]) => payload.append(name, value))
      if (photo) payload.append('photo', photo)
      await axios.post('/api/signalements', payload)
      setMessage('Signalement envoyé !')
      setErrors({})
    } catch (err) {
      setErrors(err.response?.data?.fields || {})
      setMessage('Le signalement n’a pas pu être envoyé.')
    }
  }

  return (
    <main style={{ padding: 20, maxWidth: 600 }}>
      <h1>Nouveau signalement</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="titre">Titre</label>
        <input
          id="titre"
          name="titre" placeholder="Titre" value={form.titre}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
        />
        {errors.titre && <p role="alert">{errors.titre}</p>}
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description" placeholder="Description" value={form.description}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8, height: 100 }}
        />
        {errors.description && <p role="alert">{errors.description}</p>}
        <label htmlFor="categorie">Catégorie</label>
        <select id="categorie" name="categorie" value={form.categorie} onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}>
          <option value="">Catégorie</option>
          <option>Voirie</option>
          <option>Éclairage</option>
          <option>Propreté</option>
          <option>Espaces verts</option>
        </select>
        <label htmlFor="citoyen_email">Email</label>
        <input id="citoyen_email" name="citoyen_email" placeholder="Votre email" value={form.citoyen_email}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
        />
        {errors.citoyen_email && <p role="alert">{errors.citoyen_email}</p>}
        {/* Coordonnées en champ texte libre — UX catastrophique */}
        <label htmlFor="latitude">Latitude</label>
        <input id="latitude" name="latitude" placeholder="Latitude (ex: 45.764)" value={form.latitude}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
        />
        {errors.latitude && <p role="alert">{errors.latitude}</p>}
        <label htmlFor="longitude">Longitude</label>
        <input id="longitude" name="longitude" placeholder="Longitude (ex: 4.835)" value={form.longitude}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
        />
        {errors.longitude && <p role="alert">{errors.longitude}</p>}
        <label htmlFor="photo">Photo (JPEG, PNG ou WebP, 5 Mo maximum)</label>
        <input id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp"
          onChange={e => setPhoto(e.target.files[0] || null)} />
        <button type="submit"
          style={{ background: '#2563eb', color: 'white', padding: '10px 24px', border: 'none' }}>
          Envoyer
        </button>
      </form>
      <div role="status" aria-live="polite">
        {message && <p style={{ color: '#166534' }}>{message}</p>}
        {error && <p role="alert" style={{ color: '#b91c1c' }}>{error}</p>}
      </div>
    </main>
  )
}
