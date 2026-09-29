import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { useLocale } from '../contexts/LocaleContext'

type Update = {
  id: string
  academic_week: number
  issue: string
  summary: string
  action?: string
  status: string
}

export function WeeklyUpdatesPage() {
  const { t } = useLocale()
  const [week, setWeek] = useState<number | null>(null)
  const [updates, setUpdates] = useState<Update[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const w = await api.get<{ academic_week: number }>('/api/public/current-week')
      setWeek(w.academic_week)
      const data = await api.get<{ updates: Update[] }>('/api/public/weekly/updates')
      setUpdates(data.updates)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p>{t.common.loading}</p>

  const pageTitle = week != null ? t.weeklyUpdates.title.replace('{week}', String(week)) : t.nav.meetingUpdates

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{pageTitle}</h1>
      {updates.length === 0 ? (
        <p className="text-sm text-[var(--color-text-muted)]">{t.weeklyUpdates.empty}</p>
      ) : (
        updates.map((u) => (
          <article key={u.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <h2 className="font-semibold">{u.issue}</h2>
            <p className="mt-2 text-sm">
              <span className="font-medium">{t.weeklyUpdates.discussed}</span>
            </p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{u.summary}</p>
            {u.action && (
              <>
                <p className="mt-3 text-sm font-medium">{t.weeklyUpdates.action}</p>
                <p className="text-sm text-[var(--color-text-muted)]">{u.action}</p>
              </>
            )}
            <p className="mt-3 inline-block rounded-full bg-[var(--color-surface-muted)] px-3 py-1 text-xs">
              {t.weeklyUpdates.status}: {u.status}
            </p>
          </article>
        ))
      )}
    </div>
  )
}
