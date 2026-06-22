import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(iso: string) {
  return format(parseISO(iso), 'h:mm a')
}

export function formatDate(iso: string) {
  return format(parseISO(iso), 'MMM d, yyyy')
}

export function formatDateRange(start: string, end: string) {
  const s = parseISO(start)
  const e = parseISO(end)
  if (format(s, 'MMM yyyy') === format(e, 'MMM yyyy')) {
    return `${format(s, 'MMM d')} – ${format(e, 'd, yyyy')}`
  }
  return `${format(s, 'MMM d, yyyy')} – ${format(e, 'MMM d, yyyy')}`
}

export function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export function getTrackColor(track: string): string {
  const map: Record<string, string> = {
    'AI & Machine Learning': 'purple',
    'Quantum Computing': 'cyan',
    'Cybersecurity': 'blue',
    'Web3 & DeFi': 'blue',
    'Neural Interfaces': 'pink',
    'Bio-Digital Fusion': 'green',
  }
  return map[track] || 'purple'
}

export const trackColors: Record<string, { bg: string; border: string; text: string }> = {
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
  blue:   { bg: 'bg-blue-500/10',   border: 'border-blue-500/30',   text: 'text-blue-400' },
  pink:   { bg: 'bg-pink-500/10',   border: 'border-pink-500/30',   text: 'text-pink-400' },
  cyan:   { bg: 'bg-cyan-500/10',   border: 'border-cyan-500/30',   text: 'text-cyan-400' },
  green:  { bg: 'bg-emerald-500/10',border: 'border-emerald-500/30',text: 'text-emerald-400' },
}
