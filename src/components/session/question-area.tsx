"use client"

import type { Question } from "@/lib/types"
import { createQuestion, upvoteQuestion } from "@/lib/api"
import { QuestionInput } from "./question-input"
import { QuestionList } from "./question-list"
import { useState } from "react"

type Props = {
  sessionId: number
  initialQuestions: Question[]
}

export const QuestionArea = ({ sessionId, initialQuestions }: Props) => {
  const [questions, setQuestions] = useState(initialQuestions)

  async function handleSubmit(data: { question: string; name?: string }) {
    const q = await createQuestion(sessionId, data)
    setQuestions((prev) => [...prev, q])
  }

  async function handleUpvote(id: number) {
    const updated = await upvoteQuestion(id)
    setQuestions((prev) => prev.map((q) => (q.id === id ? updated : q)))
  }

  return (
    <div className="space-y-4">
      <QuestionList questions={questions} onUpvote={handleUpvote} />
      <QuestionInput onSubmit={handleSubmit} />
    </div>
  )
}
