"use client"

import { useState, useCallback, useEffect } from "react"

const STORAGE_KEY = "eventsync-favorites"

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch {}
    }
  }, [])

  const persist = useCallback((ids: number[]) => {
    setFavorites(ids)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  }, [])

  const addFavorite = useCallback(
    (id: number) => {
      if (!favorites.includes(id)) persist([...favorites, id])
    },
    [favorites, persist]
  )

  const removeFavorite = useCallback(
    (id: number) => persist(favorites.filter((f) => f !== id)),
    [favorites, persist]
  )

  const isFavorite = useCallback(
    (id: number) => favorites.includes(id),
    [favorites]
  )

  return { favorites, addFavorite, removeFavorite, isFavorite }
}
