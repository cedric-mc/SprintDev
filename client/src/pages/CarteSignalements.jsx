import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { Link } from 'react-router-dom'
import { useSignalements } from '../hooks/useSignalements'
import 'leaflet/dist/leaflet.css'
import markerRetinaIcon from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Fix icônes Leaflet — copié de Stack Overflow, pas compris pourquoi ça marche
import L from 'leaflet'
import '../styles/carte.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetinaIcon,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

export default function CarteSignalements() {
  const { signalements, loading, error } = useSignalements({ limit: 100 })
  const points = signalements.filter(signalement => {
    const latitude = Number(signalement.latitude)
    const longitude = Number(signalement.longitude)
    return Number.isFinite(latitude) && latitude >= -90 && latitude <= 90
      && Number.isFinite(longitude) && longitude >= -180 && longitude <= 180
  })

  return (
    <div>
      <h1 style={{ padding: '20px 20px 0' }}>Carte des signalements</h1>
      <p role="status" style={{ padding: '0 20px' }}>
        {loading ? 'Chargement des signalements...' : error ? 'Impossible de charger les signalements.' : !points.length ? 'Aucun signalement géolocalisé.' : `${points.length} signalement(s) affiché(s)`}
      </p>
      <MapContainer center={[45.764, 4.835]} zoom={13}
        aria-label="Carte interactive des signalements"
        style={{ height: 'min(70vh, 600px)', minHeight: 360, margin: 20 }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="OpenStreetMap"
        />
        <MarkerClusterGroup chunkedLoading>
          {points.map(s => (
            <Marker key={s.id} position={[Number(s.latitude), Number(s.longitude)]}>
              <Popup>
                <strong>{s.titre}</strong><br />
                {s.categorie} · {s.statut}<br />
                {s.created_at ? new Date(s.created_at).toLocaleDateString('fr-FR') : ''}<br />
                <Link to={`/signalements/${s.id}`}>Voir le détail</Link>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}
