'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, Send, EyeOff, MessageSquareText, CheckCircle2 } from 'lucide-react'
import { useQA } from '@/hooks/useQA'
import { timeAgo, cn } from '@/lib/utils'
import type { Question } from '@/types'

export function QASystem({ sessionId, initialQuestions }: { sessionId: string; initialQuestions: Question[] }) {
  const { questions, addQuestion, upvote } = useQA(initialQuestions)
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [anon, setAnon] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    addQuestion(text.trim(), name.trim(), anon)
    setText('')
  }

  return (
    <div className="space-y-5">
      {/* Form */}
      <form onSubmit={submit} className="glass-card p-4 sm:p-5">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Ask a question about this session..."
          rows={3}
          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl p-3 text-sm text-white placeholder-white/30 resize-none focus:outline-none focus:border-purple-500/40 transition-colors mb-3"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {!anon && (
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-purple-500/40 transition-colors min-w-0 flex-1 max-w-[200px]"
              />
            )}
            <button type="button" onClick={() => setAnon(!anon)}
              className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border',
                anon ? 'bg-purple-500/15 border-purple-500/30 text-purple-light' : 'border-white/10 text-white/40 hover:text-white/70')}>
              <EyeOff className="w-3.5 h-3.5" /> Anonymous
            </button>
          </div>
          <button type="submit" className="btn-primary text-xs py-2 px-4">
            <Send className="w-3.5 h-3.5" /> Submit
          </button>
        </div>
      </form>

      {/* Question count */}
      <div className="flex items-center gap-2 text-white/40 text-sm">
        <MessageSquareText className="w-4 h-4" />
        {questions.length} question{questions.length !== 1 ? 's' : ''} · sorted by votes
      </div>

      {/* Questions list */}
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {questions.map(q => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              layout
              className={cn('glass-card p-4 flex gap-3 transition-colors',
                q.isAnswered && 'border-emerald-500/20')}
            >
              <button
                onClick={() => upvote(q.id)}
                className={cn(
                  'flex flex-col items-center justify-center gap-0.5 w-12 h-14 rounded-xl border transition-all shrink-0',
                  q.userVoted ? 'bg-purple-500/20 border-purple-500/40 text-purple-light' : 'border-white/10 text-white/40 hover:border-purple-500/30 hover:text-purple-light'
                )}
              >
                <motion.div whileTap={{ scale: 1.3 }}>
                  <ChevronUp className="w-4 h-4" />
                </motion.div>
                <span className="text-xs font-bold font-mono">{q.votes}</span>
              </button>

              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-sm leading-relaxed mb-2">{q.text}</p>
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="text-white/30 font-mono">{q.isAnonymous ? 'Anonymous' : q.author}</span>
                  <span className="text-white/20">·</span>
                  <span className="text-white/30">{timeAgo(q.timestamp)}</span>
                  {q.isAnswered && (
                    <span className="flex items-center gap-1 text-emerald-400 ml-auto">
                      <CheckCircle2 className="w-3 h-3" /> Answered
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
