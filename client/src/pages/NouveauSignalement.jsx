// NouveauSignalement.jsx — Baptiste
// Formulaire basique, aucune validation front-end

import React, { useState } from 'react'
import axios from 'axios'

export default function NouveauSignalement() {
  const [form, setForm] = useState({
    titre: '', description: '', categorie: '',
    latitude: '', longitude: '', citoyen_email: '', mairie_id: 1
  })
  const [message, setMessage] = useState('')

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // Aucune validation — formulaire vide accepté
    try {
      await axios.post('/api/signalements', form)
      setMessage('Signalement envoyé !')
      // Le formulaire n'est pas réinitialisé après succès
    } catch (err) {
      setMessage('Erreur : ' + err.message) // message technique exposé
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h1>Nouveau signalement</h1>
      <form onSubmit={handleSubmit}>
        {/* Champs sans label accessible — problème accessibilité */}
        <input
          name="titre" placeholder="Titre" value={form.titre}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
        />
        <textarea
          name="description" placeholder="Description" value={form.description}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8, height: 100 }}
        />
        <select name="categorie" value={form.categorie} onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}>
          <option value="">Catégorie</option>
          <option>Voirie</option>
          <option>Éclairage</option>
          <option>Propreté</option>
          <option>Espaces verts</option>
        </select>
        <input name="citoyen_email" placeholder="Votre email" value={form.citoyen_email}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
        />
        {/* Coordonnées en champ texte libre — UX catastrophique */}
        <input name="latitude" placeholder="Latitude (ex: 45.764)" value={form.latitude}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input name="longitude" placeholder="Longitude (ex: 4.835)" value={form.longitude}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
        />
        <button type="submit"
          style={{ background: '#2563eb', color: 'white', padding: '10px 24px', border: 'none' }}>
          Envoyer
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}
