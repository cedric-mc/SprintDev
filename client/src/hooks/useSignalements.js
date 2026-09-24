// Hook custom — créé mais jamais utilisé dans les composants
// Baptiste a commencé à extraire la logique mais n'a pas fini

import { useState, useEffect } from 'react'
import axios from 'axios'

export function useSignalements({ categorie = '', statut = '', page = 1, limit = 20 } = {}) {
  const [signalements, setSignalements] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({ page, limit, total: 0, totalPages: 0 })

  const fetchSignalements = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get('/api/signalements', { params: { categorie, statut, page, limit } })
      setSignalements(res.data.data || res.data)
      setPagination(res.data.pagination || { page, limit, total: res.data.length, totalPages: 1 })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSignalements()
  }, [categorie, statut, page, limit])

  const createSignalement = async (data) => {
    const res = await axios.post('/api/signalements', data)
    await fetchSignalements() // re-fetch après création
    return res.data
  }

  return { signalements, loading, error, pagination, refetch: fetchSignalements, createSignalement }
}
// TODO : utiliser ce hook dans ListeSignalements et NouveauSignalement
//        et supprimer le fetch dupliqué dans chaque composant
