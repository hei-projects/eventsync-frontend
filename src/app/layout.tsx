import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Calendar, Mic, Star } from "lucide-react"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "EventSync",
  description: "Plateforme de gestion d'événements et d'engagement des participants",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn("font-sans", inter.variable)}>
      <body>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
          <div className="flex h-14 items-center gap-6 px-6">
            <Link href="/" className="font-bold text-lg">
              EventSync
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/events" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                <Calendar className="size-4" />
                Événements
              </Link>
              <Link href="/speakers" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                <Mic className="size-4" />
                Intervenants
              </Link>
              <Link href="/favorites" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                <Star className="size-4" />
                Favoris
              </Link>
            </nav>
          </div>
        </header>
        <main className="p-6 w-full">{children}</main>
      </body>
    </html>
  )
}
