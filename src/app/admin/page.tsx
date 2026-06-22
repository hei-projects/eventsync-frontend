'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Calendar, Users, MessageSquare,
  Radio, Settings, BarChart3, MoreHorizontal, Check,
  TrendingUp, Activity
} from 'lucide-react'
import { events, sessions, speakers, questions } from '@/data'
import { cn } from '@/lib/utils'
import { LiveBadge, LiveDot } from '@/components/ui'
import Image from 'next/image'

type Tab = 'dashboard' | 'events' | 'sessions' | 'speakers'

const statCards = [
  { label: 'Total Events', value: '4', delta: '+1 this month', icon: Calendar, color: 'purple', trend: '+25%' },
  { label: 'Live Sessions', value: sessions.filter(s => s.isLive).length.toString(), delta: 'Active right now', icon: Radio, color: 'red', trend: 'live' },
  { label: 'Total Speakers', value: speakers.length.toString(), delta: '3 pending confirm', icon: Users, color: 'cyan', trend: '+3' },
  { label: 'Questions', value: questions.length.toString(), delta: 'Across all sessions', icon: MessageSquare, color: 'pink', trend: '+12' },
]

const colorMap: Record<string, string> = {
  purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  red:    'text-red-400    bg-red-500/10    border-red-500/20',
  cyan:   'text-cyan-400   bg-cyan-500/10   border-cyan-500/20',
  pink:   'text-pink-400   bg-pink-500/10   border-pink-500/20',
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('dashboard')

  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard',  icon: LayoutDashboard },
    { id: 'events'    as const, label: 'Events',     icon: Calendar },
    { id: 'sessions'  as const, label: 'Sessions',   icon: BarChart3 },
    { id: 'speakers'  as const, label: 'Speakers',   icon: Users },
  ]

  return (
    <div className="min-h-screen pt-16 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 sticky top-16 h-[calc(100vh-4rem)] p-4 gap-1"
        style={{ background: 'rgba(10,14,25,0.8)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="mb-5 px-2">
          <p className="text-xs font-mono text-white/25 uppercase tracking-widest">Control Panel</p>
        </div>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setTab(item.id)}
            className={cn('flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left',
              tab === item.id
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'text-white/40 hover:text-white hover:bg-white/5'
            )}>
            <item.icon className="w-4 h-4 shrink-0" />{item.label}
          </button>
        ))}
        <div className="mt-auto">
          <button className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white/25 hover:text-white hover:bg-white/5 transition-all w-full">
            <Settings className="w-4 h-4" />Settings
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-auto p-5 sm:p-8">
        {/* Mobile tabs */}
        <div className="flex md:hidden gap-2 mb-6 overflow-x-auto pb-2">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)}
              className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap',
                tab === item.id ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'glass-card text-white/40'
              )}>
              <item.icon className="w-3.5 h-3.5" />{item.label}
            </button>
          ))}
        </div>

        {/* ── DASHBOARD ── */}
        {tab === 'dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div>
              <h1 className="font-display font-black text-2xl text-white mb-1">Dashboard</h1>
              <p className="text-white/40 text-sm">Overview of EventSync platform activity.</p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }} className="glass-card rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn('w-9 h-9 rounded-xl border flex items-center justify-center', colorMap[stat.color])}>
                      <stat.icon className="w-4 h-4" />
                    </div>
                    {stat.trend === 'live' ? (
                      <motion.span animate={{ opacity: [1,0.4,1] }} transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-red-500 mt-1" />
                    ) : (
                      <span className="text-xs font-mono text-emerald-400 flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" />{stat.trend}
                      </span>
                    )}
                  </div>
                  <p className="font-display font-black text-2xl text-white">{stat.value}</p>
                  <p className="text-white/50 text-xs font-medium mt-0.5">{stat.label}</p>
                  <p className="text-white/25 text-[11px] font-mono mt-1">{stat.delta}</p>
                </motion.div>
              ))}
            </div>

            {/* Live sessions table */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <LiveDot size={8} />
                <h2 className="font-display font-bold text-sm text-white/80 uppercase tracking-wider">Live Sessions</h2>
              </div>
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        {['Session', 'Room', 'Enrolled', 'Fill', 'Status'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-mono text-white/30 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sessions.filter(s => s.isLive).map((s, i) => {
                        const fill = Math.round((s.enrolled / s.capacity) * 100)
                        return (
                          <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
                            className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                            <td className="px-4 py-3">
                              <p className="text-white font-medium truncate max-w-[180px]">{s.title}</p>
                              <p className="text-white/30 text-xs font-mono">{s.track.split(' ')[0]}</p>
                            </td>
                            <td className="px-4 py-3 text-white/50 font-mono text-xs whitespace-nowrap">{s.room}</td>
                            <td className="px-4 py-3 text-white/60 font-mono text-xs">{s.enrolled}/{s.capacity}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-20 bg-white/10 rounded-full overflow-hidden">
                                  <div className="h-full rounded-full bg-gradient-to-r from-purple-neon to-blue-electric"
                                    style={{ width: `${fill}%` }} />
                                </div>
                                <span className="text-white/40 text-xs font-mono">{fill}%</span>
                              </div>
                            </td>
                            <td className="px-4 py-3"><LiveBadge /></td>
                          </motion.tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Recent questions */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h2 className="font-display font-bold text-sm text-white/80 uppercase tracking-wider">Recent Questions</h2>
              </div>
              <div className="glass-card rounded-2xl overflow-hidden divide-y divide-white/[0.04]">
                {questions.slice(0, 4).map((q, i) => (
                  <motion.div key={q.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }} className="px-5 py-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/70 text-sm leading-relaxed line-clamp-1">{q.text}</p>
                      <p className="text-white/30 text-xs font-mono mt-1">{q.isAnonymous ? 'Anonymous' : q.author} · {q.votes} votes</p>
                    </div>
                    {q.isAnswered && (
                      <span className="shrink-0 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono rounded">
                        Answered
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── EVENTS ── */}
        {tab === 'events' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display font-black text-2xl text-white mb-1">Events</h1>
                <p className="text-white/40 text-sm">{events.length} total events</p>
              </div>
              <button className="btn-primary text-xs py-2 px-4">+ New Event</button>
            </div>
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      {['Event', 'Status', 'Date', 'Sessions', 'Speakers', 'Attendees', ''].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-mono text-white/30 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((ev, i) => (
                      <motion.tr key={ev.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
                        className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3">
                          <p className="text-white font-display font-bold text-sm truncate max-w-[160px]">{ev.title}</p>
                          <p className="text-white/30 text-xs truncate max-w-[160px]">{ev.venue}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn('px-2 py-0.5 rounded text-xs font-mono border whitespace-nowrap', {
                            'bg-red-500/10 text-red-400 border-red-500/20': ev.status === 'live',
                            'bg-emerald-500/10 text-emerald-400 border-emerald-500/20': ev.status === 'upcoming',
                            'bg-white/5 text-white/30 border-white/10': ev.status === 'past',
                          })}>
                            {ev.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-white/40 text-xs font-mono whitespace-nowrap">{ev.startDate.slice(0, 10)}</td>
                        <td className="px-4 py-3 text-white/60 font-mono">{ev.sessionCount}</td>
                        <td className="px-4 py-3 text-white/60 font-mono">{ev.speakerCount}</td>
                        <td className="px-4 py-3 text-white/60 font-mono">{ev.attendeeCount.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <button className="text-white/20 hover:text-white/60 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── SESSIONS ── */}
        {tab === 'sessions' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display font-black text-2xl text-white mb-1">Sessions</h1>
                <p className="text-white/40 text-sm">{sessions.length} total sessions</p>
              </div>
              <button className="btn-primary text-xs py-2 px-4">+ New Session</button>
            </div>
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      {['Title', 'Track', 'Room', 'Time', 'Fill', 'Level', 'Status'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-mono text-white/30 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((s, i) => {
                      const fill = Math.round((s.enrolled / s.capacity) * 100)
                      return (
                        <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                          className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-3">
                            <p className="text-white font-medium truncate max-w-[180px]">{s.title}</p>
                          </td>
                          <td className="px-4 py-3 text-white/40 text-xs truncate max-w-[100px] whitespace-nowrap">
                            {s.track.split(' ')[0]}
                          </td>
                          <td className="px-4 py-3 text-white/40 text-xs font-mono whitespace-nowrap">{s.room}</td>
                          <td className="px-4 py-3 text-white/40 text-xs font-mono whitespace-nowrap">
                            {new Date(s.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-14 bg-white/10 rounded-full overflow-hidden">
                                <div className={cn('h-full rounded-full', fill > 90 ? 'bg-red-500' : 'bg-gradient-to-r from-purple-neon to-blue-electric')}
                                  style={{ width: `${fill}%` }} />
                              </div>
                              <span className="text-white/30 text-xs font-mono">{fill}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={cn('px-2 py-0.5 rounded text-[10px] font-mono border whitespace-nowrap', {
                              'bg-green-500/10 text-green-400 border-green-500/20': s.level === 'Beginner',
                              'bg-yellow-500/10 text-yellow-400 border-yellow-500/20': s.level === 'Intermediate',
                              'bg-red-500/10 text-red-400 border-red-500/20': s.level === 'Advanced',
                            })}>
                              {s.level}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {s.isLive ? <LiveBadge /> : <span className="text-white/25 text-xs font-mono">Scheduled</span>}
                          </td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── SPEAKERS ── */}
        {tab === 'speakers' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display font-black text-2xl text-white mb-1">Speakers</h1>
                <p className="text-white/40 text-sm">{speakers.length} confirmed speakers</p>
              </div>
              <button className="btn-primary text-xs py-2 px-4">+ Invite Speaker</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {speakers.map((sp, i) => (
                <motion.div key={sp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="glass-card rounded-2xl p-4 flex items-center gap-3 hover:border-purple-500/20 transition-all">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                    <Image src={sp.avatar} alt={sp.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-sm text-white truncate">{sp.name}</p>
                    <p className="text-white/40 text-xs truncate">{sp.title}</p>
                    <p className="text-purple-400 text-xs font-mono">{sp.sessions.length} session{sp.sessions.length !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 text-[10px] font-mono">Confirmed</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
