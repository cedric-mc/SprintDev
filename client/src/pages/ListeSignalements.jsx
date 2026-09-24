import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSignalements } from '../hooks/useSignalements'

const categories = ['Voirie', 'Éclairage', 'Propreté', 'Espaces verts', 'Mobilier urbain']
const statuses = [
  { value: 'recu', label: 'Reçu' },
  { value: 'en_cours', label: 'En cours' },
  { value: 'resolu', label: 'Résolu' },
]

export default function ListeSignalements() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categorie = searchParams.get('categorie') || ''
  const statut = searchParams.get('statut') || ''
  const parsedPage = Number(searchParams.get('page') || 1)
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1
  const { signalements, loading, error, pagination } = useSignalements({ categorie, statut, page, limit: 10 })

  const updateFilter = (name, value) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(name, value)
    else next.delete(name)
    next.set('page', '1')
    setSearchParams(next)
  }

  const resetFilters = () => setSearchParams({ page: '1' })

  return (
    <main style={{ padding: 20 }}>
      <h1>Signalements</h1>
      <form aria-label="Filtrer les signalements" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
        <label>
          Catégorie
          <select value={categorie} onChange={event => updateFilter('categorie', event.target.value)}>
            <option value="">Toutes</option>
            {categories.map(category => <option key={category} value={category}>{category}</option>)}
          </select>
        </label>
        <label>
          Statut
          <select value={statut} onChange={event => updateFilter('statut', event.target.value)}>
            <option value="">Tous</option>
            {statuses.map(status => <option key={status.value} value={status.value}>{status.label}</option>)}
          </select>
        </label>
        <button type="button" onClick={resetFilters}>Réinitialiser</button>
      </form>

      <p role="status" aria-live="polite">
        {loading ? 'Chargement des signalements...' : error ? 'Impossible de charger les signalements.' : `${pagination.total} signalement${pagination.total > 1 ? 's' : ''}`}
      </p>
      {error && <p role="alert">Une erreur est survenue. Réessayez.</p>}
      {!loading && !error && signalements.length === 0 && <p>Aucun signalement ne correspond à ces filtres.</p>}

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
          <p style={{ color: '#6b7280', fontSize: 12 }}>{s.created_at ? new Date(s.created_at).toLocaleDateString('fr-FR') : ''}</p>
        </div>
      ))}
      {pagination.totalPages > 1 && (
        <nav aria-label="Pagination des signalements" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button type="button" disabled={page <= 1} onClick={() => setSearchParams({ categorie, statut, page: String(page - 1) })}>Précédent</button>
          <span aria-current="page">Page {page} sur {pagination.totalPages}</span>
          <button type="button" disabled={page >= pagination.totalPages} onClick={() => setSearchParams({ categorie, statut, page: String(page + 1) })}>Suivant</button>
        </nav>
      )}
    </main>
  )
}
