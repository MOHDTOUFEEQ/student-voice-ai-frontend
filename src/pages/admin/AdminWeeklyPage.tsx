import { useEffect, useState } from 'react'
import { api } from '../../api/client'

export function AdminWeeklyPage() {
  const [week, setWeek] = useState(2)
  const [data, setData] = useState<Record<string, unknown> | null>(null)

  useEffect(() => {
    api.get<Record<string, unknown>>(`/api/admin/weekly?week=${week}`).then(setData)
  }, [week])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 11 }, (_, i) => i + 1).map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => setWeek(w)}
            className={`rounded-md px-3 py-1 text-sm ${week === w ? 'bg-brand-600 text-white' : 'border border-[var(--color-border)]'}`}
          >
            Week {w}
          </button>
        ))}
      </div>
      {!data ? (
        <p>Loading…</p>
      ) : (
        <pre className="overflow-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-xs">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  )
}
