import React, { useState } from 'react'
import axios from 'axios'

const categories = ['Voirie', 'Éclairage', 'Propreté', 'Espaces verts', 'Mobilier urbain']

export default function NouveauSignalement() {
  const [form, setForm] = useState({
    titre: '', description: '', categorie: '',
    latitude: '', longitude: '', citoyen_email: '', mairie_id: 1
  })
  const [photo, setPhoto] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({})

  const handleChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
    setError('')
    setErrors({ ...errors, [event.target.name]: '' })
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
    if (!categories.includes(form.categorie)) nextErrors.categorie = 'Choisissez une catégorie.'
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
      setError('')
    } catch (err) {
      setErrors(err.response?.data?.fields || {})
      setError('')
      setMessage('Le signalement n’a pas pu être envoyé.')
    }
  }

  return (
    <main className="page-shell" style={{ maxWidth: 600 }}>
      <h1>Nouveau signalement</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="titre">Titre</label>
        <input aria-invalid={Boolean(errors.titre)} aria-describedby={errors.titre ? 'titre-error' : undefined}
          id="titre"
          name="titre" placeholder="Titre" value={form.titre}
          onChange={handleChange}
          required
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
        />
        {errors.titre && <p id="titre-error" role="alert">{errors.titre}</p>}
        <label htmlFor="description">Description</label>
        <textarea aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? 'description-error' : undefined}
          id="description"
          name="description" placeholder="Description" value={form.description}
          onChange={handleChange}
          required
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8, height: 100 }}
        />
        {errors.description && <p id="description-error" role="alert">{errors.description}</p>}
        <label htmlFor="categorie">Catégorie</label>
        <select id="categorie" name="categorie" value={form.categorie} onChange={handleChange} required aria-invalid={Boolean(errors.categorie)} aria-describedby={errors.categorie ? 'categorie-error' : undefined}
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}>
          <option value="">Choisir une catégorie</option>
          {categories.map(category => <option key={category}>{category}</option>)}
        </select>
        {errors.categorie && <p id="categorie-error" role="alert">{errors.categorie}</p>}
        <label htmlFor="citoyen_email">Email</label>
        <input id="citoyen_email" type="email" autoComplete="email" required aria-invalid={Boolean(errors.citoyen_email)} aria-describedby={errors.citoyen_email ? 'email-error' : undefined} name="citoyen_email" placeholder="Votre email" value={form.citoyen_email}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
        />
        {errors.citoyen_email && <p id="email-error" role="alert">{errors.citoyen_email}</p>}
        {/* Coordonnées en champ texte libre — UX catastrophique */}
        <label htmlFor="latitude">Latitude</label>
        <input id="latitude" type="number" inputMode="decimal" required aria-invalid={Boolean(errors.latitude)} aria-describedby={errors.latitude ? 'latitude-error' : undefined} name="latitude" placeholder="Latitude (ex: 45.764)" value={form.latitude}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
        />
        {errors.latitude && <p id="latitude-error" role="alert">{errors.latitude}</p>}
        <label htmlFor="longitude">Longitude</label>
        <input id="longitude" type="number" inputMode="decimal" required aria-invalid={Boolean(errors.longitude)} aria-describedby={errors.longitude ? 'longitude-error' : undefined} name="longitude" placeholder="Longitude (ex: 4.835)" value={form.longitude}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
        />
        {errors.longitude && <p id="longitude-error" role="alert">{errors.longitude}</p>}
        <label htmlFor="photo">Photo (JPEG, PNG ou WebP, 5 Mo maximum)</label>
        <input id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp"
          onChange={handlePhotoChange} aria-describedby="photo-help" />
        <p id="photo-help">Formats acceptés : JPEG, PNG ou WebP, 5 Mo maximum.</p>
        <button type="submit"
          style={{ background: '#2563eb', color: 'white', padding: '10px 24px', border: 'none' }}>
          Envoyer
        </button>
      </form>
      <div role="status" aria-live="polite" aria-atomic="true">
        {message && <p style={{ color: '#166534' }}>{message}</p>}
        {error && <p role="alert" style={{ color: '#b91c1c' }}>{error}</p>}
      </div>
    </main>
  )
}
