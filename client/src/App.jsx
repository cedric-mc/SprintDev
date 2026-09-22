// App.jsx — Baptiste nov 2024
// Routing basique, pas de lazy loading, pas de gestion d'erreur globale

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListeSignalements from './pages/ListeSignalements'
import NouveauSignalement from './pages/NouveauSignalement'
import CarteSignalements from './pages/CarteSignalements'
// import DetailSignalement from './pages/DetailSignalement' // pas encore fait

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Nav en dur — pas de composant, pas de responsive */}
        <nav style={{ background: '#2563eb', padding: '12px 20px', display: 'flex', gap: 20 }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>UrbanLink</a>
          <a href="/signalements" style={{ color: 'white', textDecoration: 'none' }}>Signalements</a>
          <a href="/carte" style={{ color: 'white', textDecoration: 'none' }}>Carte</a>
          <a href="/nouveau" style={{ color: 'white', textDecoration: 'none' }}>+ Nouveau</a>
        </nav>

        <Routes>
          <Route path="/" element={<ListeSignalements />} />
          <Route path="/signalements" element={<ListeSignalements />} />
          <Route path="/carte" element={<CarteSignalements />} />
          <Route path="/nouveau" element={<NouveauSignalement />} />
          {/* Route 404 manquante */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
