import { FavoriteSessions } from "@/components/favorites/favorite-sessions"
import { BackButton } from "@/components/bloc/back-button"

export default function FavoritesPage() {
  return (
    <div>
      <BackButton />
      <h1 className="text-2xl font-bold mt-2 mb-6">Mes Favoris</h1>
      <FavoriteSessions />
    </div>
  )
}
