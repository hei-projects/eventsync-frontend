"use client"

import type { Question } from "@/lib/types"
import { Button } from "../ui/button"
import { ArrowUp } from "lucide-react"
import { useState } from "react"

type Props = {
  questions: Question[]
  onUpvote: (id: number) => Promise<void>
}

export const QuestionList = ({ questions, onUpvote }: Props) => {
  const [loading, setLoading] = useState<number | null>(null)

  const sorted = [...questions].sort((a, b) => b.upvotes - a.upvotes)

  if (sorted.length === 0) {
    return <p className="text-muted-foreground text-sm">Aucune question pour le moment.</p>
  }

  return (
    <div className="space-y-3">
      {sorted.map((q) => (
        <div key={q.id} className="flex items-start gap-3 rounded-lg border p-4 bg-card">
          <Button
            variant="outline"
            size="icon-sm"
            disabled={loading === q.id}
            onClick={async () => {
              setLoading(q.id)
              await onUpvote(q.id)
              setLoading(null)
            }}
            className="flex flex-col items-center gap-0 h-auto py-2 min-w-12"
          >
            <ArrowUp className="size-4" />
            <span className="text-xs font-bold">{q.upvotes}</span>
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-sm">{q.content}</p>
            {q.authorName && (
              <p className="text-xs text-muted-foreground mt-1">— {q.authorName}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
