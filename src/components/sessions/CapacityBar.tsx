'use client'
import { motion } from 'framer-motion'

export function CapacityBar({ percent }: { percent: number }) {
  return (
    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
      <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)' }} />
    </div>
  )
}
