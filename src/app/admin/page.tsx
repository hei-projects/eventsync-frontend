import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function AdminRedirect() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display font-bold text-2xl text-white mb-2">Admin Panel</h1>
        <p className="text-white/40 mb-6">
          L'interface d'administration a été déplacée vers React Admin.
        </p>
        <a href="http://localhost:5173"
          className="inline-flex items-center gap-2 btn-primary">
          Open React Admin <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
