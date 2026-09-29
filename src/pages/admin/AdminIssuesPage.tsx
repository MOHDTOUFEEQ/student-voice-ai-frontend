import { useEffect, useState } from 'react'
import { api } from '../../api/client'

type Issue = {
  id: string
  title: string
  frequency: number
  priority: string
  trend: string
  status: string
  ai_summary?: string
}

export function AdminIssuesPage() {
  const [items, setItems] = useState<Issue[]>([])

  useEffect(() => {
    api.get<{ items: Issue[] }>('/api/admin/issues').then((r) => setItems(r.items))
  }, [])

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] text-xs uppercase text-[var(--color-text-muted)]">
            <th className="p-2">Issue</th>
            <th className="p-2">Frequency</th>
            <th className="p-2">Priority</th>
            <th className="p-2">Trend</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id} className="border-b border-[var(--color-border)]">
              <td className="p-2">{i.title}</td>
              <td className="p-2">{i.frequency}</td>
              <td className="p-2">{i.priority}</td>
              <td className="p-2">{i.trend}</td>
              <td className="p-2">{i.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
