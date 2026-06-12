import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <h2 className="text-xl font-semibold">Page introuvable</h2>
      <p className="text-muted-foreground">La page que vous cherchez n&apos;existe pas.</p>
      <Link
        href="/"
        className="rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  )
}
