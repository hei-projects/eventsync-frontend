'use client'
import { useState, useEffect } from 'react'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('eventsync-favorites')
      if (stored) setFavorites(JSON.parse(stored))
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) localStorage.setItem('eventsync-favorites', JSON.stringify(favorites))
  }, [favorites, hydrated])

  const toggle = (sessionId: string) => {
    setFavorites(prev => prev.includes(sessionId) ? prev.filter(id => id !== sessionId) : [...prev, sessionId])
  }

  const isFavorite = (sessionId: string) => favorites.includes(sessionId)

  return { favorites, toggle, isFavorite }
}
