'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Menu, X, Radio, Users, Bookmark, LayoutDashboard } from 'lucide-react'

const links = [
  { href: '/events',    label: 'Events',      icon: Radio },
  { href: '/speakers',  label: 'Speakers',    icon: Users },
  { href: '/favorites', label: 'My Schedule', icon: Bookmark },
  { href: '/admin',     label: 'Admin',       icon: LayoutDashboard },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-strong border-b border-purple-neon/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-neon to-cyan-accent rounded-lg flex items-center justify-center shadow-neon-purple">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-sm tracking-widest text-white group-hover:text-purple-light transition-colors">
              EVENT<span className="text-cyan-accent">SYNC</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                  pathname.startsWith(href)
                    ? 'bg-purple-neon/20 text-purple-light border border-purple-neon/30'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />{label}
              </Link>
            ))}
          </nav>

          <Link href="/events" className="hidden md:inline-flex btn-primary text-[11px] py-2 px-4">
            Explore Events
          </Link>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-white/60 hover:text-white transition-colors">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass-strong border-b border-purple-neon/10">
            <nav className="px-4 py-3 flex flex-col gap-1">
              {links.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold tracking-wider uppercase transition-all ${
                    pathname.startsWith(href) ? 'bg-purple-neon/20 text-purple-light' : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />{label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
