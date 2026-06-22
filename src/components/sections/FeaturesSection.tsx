'use client'
import { motion } from 'framer-motion'
import { Radio, Grid3X3, MessageSquare, Bookmark, Shield, Zap } from 'lucide-react'

const features = [
  { icon: Radio, title: 'Live Session Tracking', desc: 'Real-time updates for every session. Pulsing indicators, live viewer counts, instant notifications.', c: 'text-red-400', from: 'from-red-500/15', border: 'border-red-500/20 hover:border-red-500/50' },
  { icon: Grid3X3, title: 'Multi-Track Schedule', desc: 'Visualize all tracks simultaneously. Apple Calendar meets Cyberpunk dashboard. Never miss a conflict.', c: 'text-purple-light', from: 'from-purple-neon/15', border: 'border-purple-neon/20 hover:border-purple-neon/50' },
  { icon: MessageSquare, title: 'Live Q&A System', desc: 'Ask questions, upvote the best ones. Anonymous mode. Real-time sorting. Built for genuine dialogue.', c: 'text-cyan-light', from: 'from-cyan-accent/15', border: 'border-cyan-accent/20 hover:border-cyan-accent/50' },
  { icon: Bookmark, title: 'Personal Schedule', desc: 'Build your custom agenda. Bookmark sessions, get conflict warnings, export to your calendar.', c: 'text-pink-light', from: 'from-pink-neon/15', border: 'border-pink-neon/20 hover:border-pink-neon/50' },
  { icon: Shield, title: 'Event Management', desc: 'Full admin dashboard. Manage sessions, speakers, rooms. Real-time analytics. SaaS-grade control panel.', c: 'text-blue-light', from: 'from-blue-electric/15', border: 'border-blue-electric/20 hover:border-blue-electric/50' },
  { icon: Zap, title: 'Instant Everything', desc: 'No refreshes, no waiting. The interface responds to every interaction instantly. The future feels fast.', c: 'text-yellow-400', from: 'from-yellow-500/15', border: 'border-yellow-500/20 hover:border-yellow-500/50' },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <p className="section-label mb-3">Platform Features</p>
        <h2 className="page-title text-4xl sm:text-5xl gradient-text">Everything You Need</h2>
        <p className="text-white/40 mt-4 max-w-xl mx-auto">Every feature designed for the highest-intensity event experience. Nothing watered down.</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feat, i) => (
          <motion.div key={feat.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className={`relative glass rounded-2xl p-6 border transition-all duration-300 group cursor-default ${feat.border}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${feat.from} to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            <div className="relative z-10">
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${feat.c}`}>
                <feat.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-white text-base mb-2">{feat.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
