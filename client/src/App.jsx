// App.jsx — Baptiste nov 2024
// Routing basique, pas de lazy loading, pas de gestion d'erreur globale

import React from 'react'
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'
import ListeSignalements from './pages/ListeSignalements'
import NouveauSignalement from './pages/NouveauSignalement'
import CarteSignalements from './pages/CarteSignalements'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import DetailSignalement from './pages/DetailSignalement'
import './styles/global.css'

function App() {
  return (
    <BrowserRouter>
      <div>
        <a className="skip-link" href="#main-content">Aller au contenu principal</a>
        <nav aria-label="Navigation principale" className="site-nav">
          <NavLink end to="/" className="brand-link">UrbanLink</NavLink>
          <NavLink to="/signalements" className="nav-link">Signalements</NavLink>
          <NavLink to="/carte" className="nav-link">Carte</NavLink>
          <NavLink to="/nouveau" className="nav-link">Nouveau signalement</NavLink>
          <NavLink to="/admin" className="nav-link">Espace mairie</NavLink>
        </nav>

        <div id="main-content" tabIndex="-1">
          <Routes>
          <Route path="/" element={<ListeSignalements />} />
          <Route path="/signalements" element={<ListeSignalements />} />
          <Route path="/carte" element={<CarteSignalements />} />
          <Route path="/signalements/:id" element={<DetailSignalement />} />
          <Route path="/nouveau" element={<NouveauSignalement />} />
          <Route path="/admin/connexion" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<main className="page-shell"><h1>Page introuvable</h1><NavLink to="/">Retour à l’accueil</NavLink></main>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
