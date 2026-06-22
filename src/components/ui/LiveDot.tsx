'use client'
import { motion } from 'framer-motion'

export function LiveDot({ size = 10 }: { size?: number }) {
  return (
    <motion.span
      animate={{ opacity: [1, 0.35, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="rounded-full bg-red-500 inline-block"
      style={{ width: size, height: size, boxShadow: '0 0 10px rgba(239,68,68,0.8)' }}
    />
  )
}
