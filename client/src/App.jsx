// App.jsx — Baptiste nov 2024
// Routing basique, pas de lazy loading, pas de gestion d'erreur globale

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListeSignalements from './pages/ListeSignalements'
import NouveauSignalement from './pages/NouveauSignalement'
import CarteSignalements from './pages/CarteSignalements'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import DetailSignalement from './pages/DetailSignalement'

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
          <a href="/admin" style={{ color: 'white', textDecoration: 'none' }}>Espace mairie</a>
        </nav>

        <Routes>
          <Route path="/" element={<ListeSignalements />} />
          <Route path="/signalements" element={<ListeSignalements />} />
          <Route path="/carte" element={<CarteSignalements />} />
          <Route path="/signalements/:id" element={<DetailSignalement />} />
          <Route path="/nouveau" element={<NouveauSignalement />} />
          <Route path="/admin/connexion" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Route 404 manquante */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
