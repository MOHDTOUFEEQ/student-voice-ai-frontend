import { useEffect, useState } from 'react'
import { api } from '../../api/client'

export function AdminOverviewPage() {
  const [data, setData] = useState<Record<string, unknown> | null>(null)

  useEffect(() => {
    api.get<Record<string, unknown>>('/api/admin/overview').then(setData)
  }, [])

  if (!data) return <p>Loading…</p>

  const cards: [string, string | number][] = [
    ['Current Week', `Week ${data.current_week}`],
    ['Feedback', Number(data.feedback_count ?? 0)],
    ['Suggestions', Number(data.suggestion_count ?? 0)],
    ['Top Issue', String(data.top_issue ?? '—')],
    ['Priority Issue', String(data.priority_issue ?? '—')],
    ['Sentiment', String(data.sentiment_overview ?? '—')],
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map(([label, value]) => (
        <div key={label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p className="text-xs uppercase text-[var(--color-text-muted)]">{label}</p>
          <p className="mt-2 text-xl font-semibold">{String(value)}</p>
        </div>
      ))}
    </div>
  )
}
