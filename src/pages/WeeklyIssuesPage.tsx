import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { useLocale } from '../contexts/LocaleContext'

type Issue = {
  title: string
  summary: string
}

export function WeeklyIssuesPage() {
  const { t, locale } = useLocale()
  const [week, setWeek] = useState<number | null>(null)
  const [frequent, setFrequent] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const w = await api.get<{ academic_week: number }>('/api/public/current-week')
        setWeek(w.academic_week)
        const data = await api.get<{
          academic_week: number
          most_frequent: Issue[]
        }>(`/api/public/weekly/issues?lang=${encodeURIComponent(locale)}`)
        setFrequent(data.most_frequent)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [locale])

  if (loading) return <p>{t.common.loading}</p>

  const pageTitle = week != null ? t.weeklyIssues.title.replace('{week}', String(week)) : t.weeklyIssues.sectionTitle

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold">{pageTitle}</h1>
        <p className="text-sm text-[var(--color-text-muted)]">{t.weeklyIssues.subtitle}</p>
      </header>
      <section>
        <h2 className="text-lg font-semibold">{t.weeklyIssues.sectionTitle}</h2>
        {frequent.length === 0 ? (
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">{t.common.emptyWeek}</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {frequent.map((item) => (
              <li key={item.title} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                <p className="font-medium">{item.title}</p>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">{item.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
