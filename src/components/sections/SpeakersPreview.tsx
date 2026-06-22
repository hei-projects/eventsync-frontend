'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { speakers } from '@/data'

export function SpeakersPreview() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="section-label mb-3">World-Class Lineup</p>
          <h2 className="page-title text-4xl sm:text-5xl text-white">
            Meet the <span className="gradient-text">Speakers</span>
          </h2>
        </div>
        <Link href="/speakers" className="hidden sm:flex items-center gap-2 text-purple-light text-sm font-mono hover:text-white transition-colors">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {speakers.slice(0, 8).map((sp, i) => (
          <motion.div key={sp.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
            <Link href={`/speakers/${sp.id}`}
              className="glass-card p-4 hover:border-purple-neon/40 transition-all duration-300 cursor-pointer group block">
              <div className="relative mb-3 overflow-hidden rounded-xl aspect-square">
                <Image src={sp.avatar} alt={sp.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" sizes="200px" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              </div>
              <p className="font-display font-bold text-sm text-white truncate">{sp.name}</p>
              <p className="text-white/40 text-xs truncate mt-0.5">{sp.title}</p>
              <p className="text-purple-light/70 text-xs truncate">{sp.company}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
