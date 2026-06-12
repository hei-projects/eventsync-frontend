export default function Loading() {
  return (
    <div>
      <div className="h-9 w-48 bg-muted rounded animate-pulse mb-6" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border rounded-xl p-4 flex items-center gap-4">
            <div className="size-12 rounded-full bg-muted animate-pulse shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-5 w-32 bg-muted rounded animate-pulse" />
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
