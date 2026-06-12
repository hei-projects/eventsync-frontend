"use client"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Card, CardContent } from "../ui/card"
import { useState } from "react"

type Props = {
  className?: string
  onSubmit?: (data: { question: string; name?: string }) => Promise<void>
}

export const QuestionInput = ({ className, onSubmit }: Props) => {
  const [submitting, setSubmitting] = useState(false)

  return (
    <form
      className={cn("w-full", className)}
      onSubmit={async (e) => {
        e.preventDefault()
        if (!onSubmit) return
        const formData = new FormData(e.currentTarget)
        const question = formData.get("question") as string
        const name = formData.get("name") as string | undefined
        if (!question.trim()) return
        setSubmitting(true)
        await onSubmit({ question, name: name || undefined })
        setSubmitting(false)
        ;(e.target as HTMLFormElement).reset()
      }}
    >
      <Card>
        <CardContent className="space-y-4">
          <Input type="text" name="name" placeholder="Votre nom (optionnel)" className="max-w-96" />
          <Textarea name="question" placeholder="Posez votre question..." required />
          <Button type="submit" disabled={submitting}>
            {submitting ? "Envoi..." : "Envoyer"}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
