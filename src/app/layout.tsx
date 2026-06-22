import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from 'sonner'
import { ParticleBackground } from '@/components/ui/ParticleBackground'

export const metadata: Metadata = {
  title: 'EventSync — Synchronize Events in Real Time',
  description: 'The most immersive cyberpunk event management platform. Track live sessions, Q&A in real time, build your personal schedule.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-bg text-white antialiased">
        <ParticleBackground />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#0D1425',
              border: '1px solid rgba(139,92,246,0.3)',
              color: '#F8FAFC',
            },
          }}
        />
      </body>
    </html>
  )
}
