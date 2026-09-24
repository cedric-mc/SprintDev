import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const statuses = [
  { value: 'recu', label: 'Reçu' },
  { value: 'en_cours', label: 'En cours' },
  { value: 'resolu', label: 'Résolu' },
]

const getCurrentWeek = () => {
  const today = new Date()
  const monday = new Date(today)
  const offset = (today.getDay() + 6) % 7
  monday.setDate(today.getDate() - offset)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  const format = date => date.toISOString().slice(0, 10)
  return { debut: format(monday), fin: format(sunday) }
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [reports, setReports] = useState([])
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState(getCurrentWeek)
  const token = localStorage.getItem('urbanlink_token')
  const user = JSON.parse(localStorage.getItem('urbanlink_user') || 'null')
  const headers = { Authorization: `Bearer ${token}` }

  const logout = () => {
    localStorage.removeItem('urbanlink_token')
    localStorage.removeItem('urbanlink_user')
    navigate('/admin/connexion')
  }

  const loadDashboard = async () => {
    setLoading(true)
    try {
      const [reportsResponse, statsResponse] = await Promise.all([
        axios.get('/api/admin/signalements', { headers, params: period }),
        axios.get('/api/admin/stats', { headers, params: period }),
      ])
      setReports(reportsResponse.data)
      setStats(statsResponse.data)
      setError('')
    } catch (requestError) {
      if (requestError.response?.status === 401 || requestError.response?.status === 403) {
        logout()
        return
      }
      setError('Impossible de charger le tableau de bord.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token || !user || !['agent', 'admin'].includes(user.role)) {
      navigate('/admin/connexion')
      return
    }
    loadDashboard()
  }, [period.debut, period.fin])

  const updatePeriod = event => {
    event.preventDefault()
    loadDashboard()
  }

  const updateStatus = async (id, statut) => {
    try {
      await axios.patch(`/api/signalements/${id}/statut`, { statut }, { headers })
      await loadDashboard()
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Le statut n’a pas pu être modifié.')
    }
  }

  if (loading) return <main style={{ padding: 20 }}><p>Chargement du tableau de bord...</p></main>

  return (
    <main style={{ padding: 20 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div>
          <h1>Espace mairie</h1>
          <p>{user?.email} · mairie #{user?.mairie_id}</p>
        </div>
        <button type="button" onClick={logout}>Se déconnecter</button>
      </header>
      {error && <p role="alert">{error}</p>}
      <form onSubmit={updatePeriod} aria-label="Période des statistiques" style={{ display: 'flex', gap: 12, alignItems: 'end', flexWrap: 'wrap', margin: '20px 0' }}>
        <label>Du <input type="date" value={period.debut} onChange={event => setPeriod({ ...period, debut: event.target.value })} /></label>
        <label>Au <input type="date" value={period.fin} onChange={event => setPeriod({ ...period, fin: event.target.value })} /></label>
        <button type="submit">Actualiser</button>
      </form>
      {stats && (
        <section aria-label="Statistiques de la période" style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', marginBottom: 20 }}>
          <article><strong>{stats.totalSignalements.count}</strong><span> signalement(s)</span></article>
          <article><strong>{stats.delaiMoyenTraitementHeures === null ? '—' : `${stats.delaiMoyenTraitementHeures} h`}</strong><span> délai moyen</span></article>
          <article><strong>{stats.periode.debut}</strong><span> au {stats.periode.fin}</span></article>
          <div><h2>Catégories fréquentes</h2>{stats.parCategorie.length ? <ol>{stats.parCategorie.map(item => <li key={item.categorie}>{item.categorie} : {item.count}</li>)}</ol> : <p>Aucune donnée pour cette période.</p>}</div>
        </section>
      )}
      {!reports.length ? <p>Aucun signalement à traiter.</p> : (
        <section aria-label="Signalements de la mairie">
          {reports.map(report => (
            <article key={report.id} style={{ border: '1px solid #ddd', padding: 16, margin: '12px 0' }}>
              <h2 style={{ fontSize: 18 }}>{report.titre}</h2>
              <p>{report.description}</p>
              <p>{report.categorie} · {new Date(report.created_at).toLocaleDateString('fr-FR')}</p>
              <label htmlFor={`status-${report.id}`}>Statut</label>{' '}
              <select id={`status-${report.id}`} value={report.statut}
                onChange={event => updateStatus(report.id, event.target.value)}>
                {statuses.map(status => <option key={status.value} value={status.value}>{status.label}</option>)}
              </select>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}
