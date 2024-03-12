// Hook custom — créé mais jamais utilisé dans les composants
// Baptiste a commencé à extraire la logique mais n'a pas fini

import { useState, useEffect } from 'react'
import axios from 'axios'

export function useSignalements() {
  const [signalements, setSignalements] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchSignalements = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get('/api/signalements')
      setSignalements(res.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSignalements()
  }, [])

  const createSignalement = async (data) => {
    const res = await axios.post('/api/signalements', data)
    await fetchSignalements() // re-fetch après création
    return res.data
  }

  return { signalements, loading, error, refetch: fetchSignalements, createSignalement }
}
// TODO : utiliser ce hook dans ListeSignalements et NouveauSignalement
//        et supprimer le fetch dupliqué dans chaque composant
