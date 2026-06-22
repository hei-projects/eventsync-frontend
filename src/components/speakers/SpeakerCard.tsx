'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Twitter, Github, Linkedin, Globe, ArrowRight } from 'lucide-react'
import { Tag } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { Speaker } from '@/types'

export function SpeakerCard({ speaker, index = 0, compact = false }: { speaker: Speaker; index?: number; compact?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:border-purple-500/30"
    >
      <div className="h-1 bg-gradient-to-r from-purple-neon via-blue-electric to-cyan-accent" />
      <div className={compact ? 'p-4' : 'p-5'}>
        <div className="flex items-start gap-4 mb-4">
          <div className="relative shrink-0 w-14 h-14 rounded-2xl overflow-hidden border border-white/10 group-hover:border-purple-500/30 transition-colors">
            <Image src={speaker.avatar} alt={speaker.name} fill className="object-cover" sizes="56px" />
          </div>
          <div className="flex-1 min-w-0">
            <Link href={`/speakers/${speaker.id}`}>
              <h3 className="font-display font-bold text-white group-hover:text-purple-light transition-colors truncate">{speaker.name}</h3>
            </Link>
            <p className="text-white/40 text-xs mt-0.5 truncate">{speaker.title}</p>
            <p className="text-purple-light text-xs font-mono truncate">{speaker.company}</p>
          </div>
        </div>

        {!compact && <p className="text-white/40 text-sm leading-relaxed line-clamp-2 mb-4">{speaker.bio}</p>}

        <div className="flex flex-wrap gap-1.5 mb-4">
          {speaker.tags.slice(0, compact ? 2 : 3).map(tag => <Tag key={tag}>{tag}</Tag>)}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {speaker.twitter && <a href={`https://twitter.com/${speaker.twitter}`} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-white/30 hover:text-blue-400 hover:bg-blue-500/10 transition-all"><Twitter className="w-3.5 h-3.5" /></a>}
            {speaker.github && <a href={`https://github.com/${speaker.github}`} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-white/30 hover:text-purple-light hover:bg-purple-500/10 transition-all"><Github className="w-3.5 h-3.5" /></a>}
            {speaker.linkedin && <a href={`https://linkedin.com/in/${speaker.linkedin}`} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-white/30 hover:text-cyan-light hover:bg-cyan-500/10 transition-all"><Linkedin className="w-3.5 h-3.5" /></a>}
            {speaker.website && <a href={`https://${speaker.website}`} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-white/30 hover:text-pink-light hover:bg-pink-500/10 transition-all"><Globe className="w-3.5 h-3.5" /></a>}
          </div>
          {!compact && (
            <Link href={`/speakers/${speaker.id}`} className="flex items-center gap-1 text-xs text-purple-light hover:text-white font-medium transition-colors group/link">
              View Profile <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}
