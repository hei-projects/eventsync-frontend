'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export function LiveBadge({ className }: { className?: string }) {
  return (
    <motion.span
      animate={{ opacity: [1, 0.6, 1] }}
      transition={{ duration: 1.8, repeat: Infinity }}
      className={cn(
        'inline-flex items-center gap-1.5 bg-red-500/15 border border-red-500/40 text-red-400 rounded px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase',
        className
      )}
    >
      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
      LIVE
    </motion.span>
  )
}

const tagVariants: Record<string, string> = {
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/25',
  cyan:   'bg-cyan-500/10   text-cyan-400   border-cyan-500/25',
  pink:   'bg-pink-500/10   text-pink-400   border-pink-500/25',
  blue:   'bg-blue-500/10   text-blue-400   border-blue-500/25',
  green:  'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  default:'bg-white/5       text-white/50   border-white/10',
}

export function Tag({ children, color = 'default', className }: { children: ReactNode; color?: string; className?: string }) {
  return (
    <span className={cn(
      'inline-block px-2 py-0.5 rounded text-xs font-mono border',
      tagVariants[color] || tagVariants.default,
      className
    )}>
      {children}
    </span>
  )
}

export function GlassCard({ children, className, hover = false, glow }: {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: 'purple' | 'blue' | 'pink' | 'cyan'
}) {
  const glowMap = {
    purple: 'hover:shadow-neon-purple hover:border-purple-500/40',
    blue:   'hover:shadow-neon-blue   hover:border-blue-500/40',
    pink:   'hover:shadow-neon-pink   hover:border-pink-500/40',
    cyan:   'hover:shadow-neon-cyan   hover:border-cyan-500/40',
  }
  return (
    <div className={cn('glass-card', hover && 'transition-all duration-300 cursor-pointer hover:-translate-y-1', hover && glow && glowMap[glow], className)}>
      {children}
    </div>
  )
}

export function StatCard({ value, label, color = 'purple' }: { value: string | number; label: string; color?: string }) {
  const textColors: Record<string, string> = {
    purple: 'gradient-text', blue: 'neon-text-blue', pink: 'neon-text-pink', cyan: 'neon-text-cyan',
  }
  return (
    <GlassCard className="p-6 text-center">
      <div className={cn('font-display text-3xl font-bold mb-1', textColors[color] || 'gradient-text')}>{value}</div>
      <div className="text-white/40 text-sm font-medium uppercase tracking-wider">{label}</div>
    </GlassCard>
  )
}

export function SectionHeader({ title, subtitle, gradient = false }: { title: string; subtitle?: string; gradient?: boolean }) {
  return (
    <div className="text-center mb-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={cn('font-display text-3xl md:text-4xl font-bold mb-3', gradient ? 'gradient-text' : 'text-white')}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/40 max-w-xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export { LiveDot } from './LiveDot'
