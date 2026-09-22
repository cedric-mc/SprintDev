// CarteSignalements.jsx — Baptiste
// Carte Leaflet basique — import CSS manquant, pas de clustering

import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'

// Fix icônes Leaflet — copié de Stack Overflow, pas compris pourquoi ça marche
import L from 'leaflet'
import markerRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import markerUrl from 'leaflet/dist/images/marker-icon.png'
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png'
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetinaUrl,
  iconUrl: markerUrl,
  shadowUrl: markerShadowUrl,
})

export default function CarteSignalements() {
  const [signalements, setSignalements] = useState([])

  useEffect(() => {
    // Recharge TOUS les signalements — même problème que ListeSignalements
    axios.get('/api/signalements').then(res => setSignalements(res.data))
  }, [])

  return (
    <div>
      <h1 style={{ padding: '20px 20px 0' }}>Carte des signalements</h1>
      {/* Hauteur fixe en pixels — pas responsive */}
      <MapContainer center={[45.764, 4.835]} zoom={13}
        style={{ height: '600px', margin: 20 }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="OpenStreetMap"
        />
        {/* Pas de clustering — 1000 markers = page inutilisable */}
        {signalements
          .filter(s => s.latitude && s.longitude) // filtre les coordonnées vides
          .map(s => (
            <Marker key={s.id} position={[s.latitude, s.longitude]}>
              <Popup>
                <strong>{s.titre}</strong><br />
                {s.statut}<br />
                {/* Email du citoyen affiché publiquement sur la carte — RGPD ! */}
                {s.citoyen_email}
              </Popup>
            </Marker>
          ))
        }
      </MapContainer>
    </div>
  )
}
