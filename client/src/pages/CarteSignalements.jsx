import React from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import markerRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import markerUrl from 'leaflet/dist/images/marker-icon.png'
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import '../styles/carte.css'
import { useSignalements } from '../hooks/useSignalements'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetinaUrl,
  iconUrl: markerUrl,
  shadowUrl: markerShadowUrl,
})

const isValidCoordinate = signalement => {
  const latitude = Number(signalement.latitude)
  const longitude = Number(signalement.longitude)
  return Number.isFinite(latitude) && latitude >= -90 && latitude <= 90 &&
    Number.isFinite(longitude) && longitude >= -180 && longitude <= 180
}

const formatDate = value => {
  if (!value) return 'Date inconnue'
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(new Date(value))
}

export default function CarteSignalements() {
  const { signalements, loading, error } = useSignalements()
  const points = signalements.filter(isValidCoordinate)

  return (
    <main className="map-page">
      <div className="map-heading">
        <div>
          <h1>Carte des signalements</h1>
          <p aria-live="polite">{points.length} signalement{points.length > 1 ? 's' : ''} localisé{points.length > 1 ? 's' : ''}</p>
        </div>
      </div>

      {loading && <p className="map-state" role="status">Chargement des signalements...</p>}
      {error && <p className="map-state map-state-error" role="alert">Impossible de charger la carte pour le moment.</p>}
      {!loading && !error && points.length === 0 && (
        <p className="map-state" role="status">Aucun signalement géolocalisé à afficher.</p>
      )}

      {!loading && !error && points.length > 0 && (
        <div className="map-frame" aria-label="Carte interactive des signalements">
          <MapContainer center={[45.764, 4.835]} zoom={13} className="map-container">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <MarkerClusterGroup chunkedLoading={points.length > 50}>
              {points.map(signalement => (
                <Marker
                  key={signalement.id}
                  position={[Number(signalement.latitude), Number(signalement.longitude)]}
                  alt={signalement.titre}
                >
                  <Popup>
                    <strong>{signalement.titre}</strong>
                    <br />Catégorie : {signalement.categorie || 'Non précisée'}
                    <br />Statut : {signalement.statut}
                    <br />Date : {formatDate(signalement.created_at)}
                    <br /><Link to={`/signalements/${signalement.id}`}>Voir le détail</Link>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      )}
    </main>
  )
}
