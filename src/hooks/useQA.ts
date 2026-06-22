'use client'
import { useState } from 'react'
import type { Question } from '@/types'

export function useQA(initialQuestions: Question[]) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)

  const addQuestion = (text: string, authorName: string, isAnonymous: boolean) => {
    const newQ: Question = {
      id: `q-${Date.now()}`,
      sessionId: initialQuestions[0]?.sessionId ?? '',
      text,
      author: isAnonymous ? 'Anonymous' : (authorName || 'Anonymous'),
      isAnonymous,
      votes: 0,
      timestamp: new Date().toISOString(),
      isAnswered: false,
      userVoted: false,
    }
    setQuestions(prev => [newQ, ...prev])
  }

  const upvote = (questionId: string) => {
    setQuestions(prev => prev.map(q =>
      q.id === questionId ? { ...q, votes: q.userVoted ? q.votes - 1 : q.votes + 1, userVoted: !q.userVoted } : q
    ))
  }

  const sorted = [...questions].sort((a, b) => b.votes - a.votes)
  return { questions: sorted, addQuestion, upvote }
}
