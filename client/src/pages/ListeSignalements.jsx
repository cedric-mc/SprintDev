// ListeSignalements.jsx — Baptiste
// Charge TOUS les signalements sans pagination — bug performance

import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ListeSignalements() {
  const [signalements, setSignalements] = useState([])
  const [loading, setLoading] = useState(false)
  // Pas de gestion d'erreur, pas d'état error

  useEffect(() => {
    setLoading(true)
    // Fetch sans annulation — fuite mémoire si le composant est démonté
    axios.get('/api/signalements')
      .then(res => {
        setSignalements(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err) // erreur silencieuse pour l'utilisateur
        setLoading(false)
      })
  }, []) // re-fetch jamais déclenché si les données changent

  // Pas de filtre, pas de tri, pas de recherche
  return (
    <div style={{ padding: 20 }}>
      <h1>Signalements</h1>
      {loading && <p>Chargement...</p>}

      {/* Liste non virtualisée — freeze sur 1000+ items */}
      {signalements.map(s => (
        <div key={s.id} style={{
          border: '1px solid #e5e7eb',
          padding: 16,
          marginBottom: 10,
          borderRadius: 4
        }}>
          <h3>{s.titre}</h3>
          <p>{s.description}</p>
          <span style={{
            background: s.statut === 'resolu' ? '#d1fae5' : '#fef3c7',
            padding: '2px 8px',
            borderRadius: 3,
            fontSize: 12
          }}>
            {s.statut}
          </span>
          {/* Date affichée brute — pas de formatage */}
          <p style={{ color: '#6b7280', fontSize: 12 }}>{s.created_at}</p>
        </div>
      ))}

      {/* Aucun message si liste vide */}
    </div>
  )
}
