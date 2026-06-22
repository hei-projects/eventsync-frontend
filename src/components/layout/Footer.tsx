import Link from 'next/link'
import { Zap, Github, Twitter, Globe } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface/50 backdrop-blur-sm mt-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-neon to-cyan-accent rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-sm tracking-widest">
                EVENT<span className="text-cyan-accent">SYNC</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              The most immersive event management platform ever built. Synchronize your conference experience in real time.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {[Github, Twitter, Globe].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-purple-light hover:border-purple-neon/40 transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="section-label mb-4">Platform</p>
            <ul className="space-y-2">
              {[['Events', '/events'], ['Speakers', '/speakers'], ['My Schedule', '/favorites'], ['Admin', '/admin']].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-white/40 hover:text-white/80 text-sm transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="section-label mb-4">Company</p>
            <ul className="space-y-2">
              {['About', 'Blog', 'Careers', 'Contact'].map(item => (
                <li key={item}><a href="#" className="text-white/40 hover:text-white/80 text-sm transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs font-mono">© 2025 EventSync. All rights reserved.</p>
          <p className="text-xs font-mono gradient-text">Built for the future.</p>
        </div>
      </div>
    </footer>
  )
}
