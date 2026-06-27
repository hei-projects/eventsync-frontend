'use client'
import { useState, useCallback, useRef } from 'react'
import { createQuestion, upvoteQuestion } from '@/lib/api'
import type { Question } from '@/types'

const COOLDOWN_MS = 5000

export function useQA(initialQuestions: Question[], sessionId: string) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)
  const [cooldowns, setCooldowns] = useState<Set<string>>(new Set())
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const addQuestion = useCallback(async (text: string, authorName: string, isAnonymous: boolean) => {
    const tempId = `q-${Date.now()}`
    const optimistic: Question = {
      id: tempId,
      sessionId,
      text,
      author: isAnonymous ? 'Anonymous' : (authorName || 'Anonymous'),
      isAnonymous,
      votes: 0,
      timestamp: new Date().toISOString(),
      isAnswered: false,
      userVoted: false,
    }
    setQuestions(prev => [optimistic, ...prev])

    try {
      const created = await createQuestion(Number(sessionId), {
        content: text,
        authorName: isAnonymous ? undefined : authorName || undefined,
      })
      setQuestions(prev =>
        prev.map(q => q.id === tempId ? {
          ...q,
          id: String(created.id),
          timestamp: created.createdAt,
          votes: created.upvotes,
        } : q)
      )
    } catch {
      setQuestions(prev => prev.filter(q => q.id !== tempId))
      throw new Error('Failed to submit question')
    }
  }, [sessionId])

  const upvote = useCallback((questionId: string) => {
    if (cooldowns.has(questionId)) return

    setCooldowns(prev => { const next = new Set(prev); next.add(questionId); return next })
    const timer = setTimeout(() => {
      setCooldowns(prev => { const next = new Set(prev); next.delete(questionId); return next })
      timersRef.current.delete(questionId)
    }, COOLDOWN_MS)
    timersRef.current.set(questionId, timer)

    let snapshot: { votes: number; userVoted: boolean } | null = null
    setQuestions(prev => {
      const q = prev.find(x => x.id === questionId)
      if (!q) return prev
      snapshot = { votes: q.votes, userVoted: q.userVoted ?? false }
      return prev.map(x =>
        x.id === questionId ? { ...x, votes: x.userVoted ? x.votes - 1 : x.votes + 1, userVoted: !x.userVoted } : x
      )
    })

    upvoteQuestion(Number(questionId)).catch(() => {
      if (!snapshot) return
      setQuestions(prev => prev.map(x =>
        x.id === questionId ? { ...x, votes: snapshot!.votes, userVoted: snapshot!.userVoted } : x
      ))
    })
  }, [cooldowns])

  const isOnCooldown = useCallback((questionId: string) => cooldowns.has(questionId), [cooldowns])

  const sorted = [...questions].sort((a, b) => b.votes - a.votes)
  return { questions: sorted, addQuestion, upvote, isOnCooldown }
}
