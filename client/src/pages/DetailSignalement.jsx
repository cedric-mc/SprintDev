import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

export default function DetailSignalement() {
  const { id } = useParams()
  const [signalement, setSignalement] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    axios.get(`/api/signalements/${id}`)
      .then(response => setSignalement(response.data))
      .catch(() => setError(true))
  }, [id])

  if (error) return <main style={{ padding: 20 }}><p role="alert">Signalement introuvable.</p><Link to="/carte">Retour à la carte</Link></main>
  if (!signalement) return <main style={{ padding: 20 }}><p role="status">Chargement...</p></main>

  return (
    <main style={{ padding: 20, maxWidth: 720 }}>
      <Link to="/carte">Retour à la carte</Link>
      <h1>{signalement.titre}</h1>
      <p><strong>Catégorie :</strong> {signalement.categorie || 'Non précisée'}</p>
      <p><strong>Statut :</strong> {signalement.statut}</p>
      <p>{signalement.description}</p>
    </main>
  )
}
