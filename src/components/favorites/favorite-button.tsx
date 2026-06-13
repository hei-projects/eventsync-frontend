"use client"

import { Star } from "lucide-react"
import { Button } from "../ui/button"
import { useFavorites } from "@/hooks/use-favorites"

type Props = { sessionId: number }

export const FavoriteButton = ({ sessionId }: Props) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const active = isFavorite(sessionId)

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() => (active ? removeFavorite(sessionId) : addFavorite(sessionId))}
      className={active ? "text-yellow-500" : "text-muted-foreground"}
    >
      <Star className={active ? "fill-yellow-500" : ""} />
    </Button>
  )
}
