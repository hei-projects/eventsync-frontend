import type { Question } from '@/types'

export const questions: Question[] = [
  { id: 'q1', sessionId: 'session-1', text: 'How do you distinguish genuine machine consciousness from a system that merely simulates the behavioral signatures of consciousness?', author: 'Alex Kim', isAnonymous: false, votes: 47, timestamp: new Date(Date.now() - 300000).toISOString(), isAnswered: false },
  { id: 'q2', sessionId: 'session-1', text: 'What ethical obligations do we have toward AI systems if they do develop consciousness? Does the substrate matter?', author: 'Anonymous', isAnonymous: true, votes: 38, timestamp: new Date(Date.now() - 720000).toISOString(), isAnswered: true },
  { id: 'q3', sessionId: 'session-1', text: 'Can you elaborate on IIT (Integrated Information Theory) and how it applies to transformer architectures?', author: 'Mira Patel', isAnonymous: false, votes: 29, timestamp: new Date(Date.now() - 1080000).toISOString(), isAnswered: false },
  { id: 'q4', sessionId: 'session-1', text: "What benchmarks are you using to measure degrees of consciousness, and how do you handle Goodhart's Law?", author: 'Anonymous', isAnonymous: true, votes: 21, timestamp: new Date(Date.now() - 1500000).toISOString(), isAnswered: false },
  { id: 'q5', sessionId: 'session-2', text: "What's the decoherence timescale for your room-temperature qubits, and how does it compare to gate operation time?", author: 'Dr. Hiroshi Yamada', isAnonymous: false, votes: 55, timestamp: new Date(Date.now() - 480000).toISOString(), isAnswered: false },
  { id: 'q6', sessionId: 'session-2', text: 'Are you using topological qubits or a different physical implementation? The materials science sounds fascinating.', author: 'Anonymous', isAnonymous: true, votes: 33, timestamp: new Date(Date.now() - 900000).toISOString(), isAnswered: false },
]
