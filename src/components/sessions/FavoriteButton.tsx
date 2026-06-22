'use client'
import { Heart } from 'lucide-react'
import { useFavorites } from '@/hooks/useFavorites'
import { cn } from '@/lib/utils'

export function FavoriteButton({ sessionId }: { sessionId: string }) {
  const { isFavorite, toggle } = useFavorites()
  const fav = isFavorite(sessionId)
  return (
    <button onClick={() => toggle(sessionId)}
      className={cn('flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border',
        fav ? 'text-pink-400 bg-pink-500/10 border-pink-500/30' : 'text-white/40 border-white/[0.08] hover:text-pink-400 hover:border-pink-500/20'
      )}>
      <Heart className={cn('w-4 h-4', fav && 'fill-current')} />
      {fav ? 'Saved' : 'Save Session'}
    </button>
  )
}
