import { useState } from 'react'
import { api } from '../../api/client'

export function AdminReportsPage() {
  const [report, setReport] = useState<Record<string, unknown> | null>(null)
  const [week, setWeek] = useState(2)

  async function weekly() {
    setReport(await api.post('/api/admin/reports/weekly', { academic_week: week }))
  }

  async function academic() {
    setReport(await api.post('/api/admin/reports/academic', {}))
  }

  async function agenda() {
    setReport(await api.post('/api/admin/agenda', { academic_week: week }))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <input type="number" className="w-20 rounded border px-2" value={week} onChange={(e) => setWeek(+e.target.value)} />
        <button type="button" onClick={weekly} className="rounded bg-brand-600 px-3 py-2 text-sm text-white">
          Weekly report
        </button>
        <button type="button" onClick={academic} className="rounded border px-3 py-2 text-sm">
          Academic period report
        </button>
        <button type="button" onClick={agenda} className="rounded border px-3 py-2 text-sm">
          Meeting agenda
        </button>
        <button
          type="button"
          className="rounded border px-3 py-2 text-sm"
          onClick={async () => {
            const token = localStorage.getItem('sv_token')
            const res = await fetch(`/api/admin/reports/weekly/export?week=${week}&format=pdf`, {
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            })
            const blob = await res.blob()
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `week-${week}-report.pdf`
            a.click()
            URL.revokeObjectURL(url)
          }}
        >
          Export PDF
        </button>
      </div>
      {report && (
        <pre className="overflow-auto rounded-lg border border-[var(--color-border)] p-4 text-xs">{JSON.stringify(report, null, 2)}</pre>
      )}
    </div>
  )
}
