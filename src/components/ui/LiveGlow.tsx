'use client'
import { motion } from 'framer-motion'

export function LiveGlow() {
  return (
    <motion.div
      animate={{ opacity: [0.3, 0.1, 0.3] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'radial-gradient(ellipse at 50% 20%, rgba(239,68,68,0.06), transparent 60%)' }}
    />
  )
}
