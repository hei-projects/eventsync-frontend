'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Zap, ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-24 px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-neon/20 via-pink-neon/10 to-cyan-accent/20 rounded-3xl blur-xl" />
        <div className="relative glass rounded-3xl border border-purple-neon/30 p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-neon/5 to-cyan-accent/5" />
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="relative z-10">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-neon to-cyan-accent mb-6 shadow-neon-purple">
              <Zap className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="page-title text-4xl sm:text-5xl md:text-6xl mb-4">
              <span className="text-white">Ready to</span>{' '}
              <span className="gradient-text">Synchronize?</span>
            </h2>
            <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of developers, designers, and visionaries at the most immersive tech conference experience ever created.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/events" className="btn-primary py-3.5 px-8 text-sm">
                <Zap className="w-4 h-4" /> Get Started Now
              </Link>
              <Link href="/events/neon-summit-2025" className="flex items-center gap-2 text-sm font-mono text-white/50 hover:text-white transition-colors">
                View Live Events <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
