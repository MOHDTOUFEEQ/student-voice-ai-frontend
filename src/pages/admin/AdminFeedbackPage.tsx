import { useEffect, useState } from 'react'
import { api } from '../../api/client'

type Item = {
  id: string
  type: string
  message: string
  category: string
  importance: string
  academic_week: number
  processing_status: string
  created_at: string
}

export function AdminFeedbackPage() {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    api.get<{ items: Item[] }>('/api/admin/feedback').then((r) => setItems(r.items))
  }, [])

  async function remove(id: string) {
    if (!confirm('Delete this submission permanently?')) return
    await api.delete(`/api/admin/feedback/${id}`)
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article key={item.id} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm">
          <p className="font-medium">{item.message}</p>
          <p className="mt-2 text-xs text-[var(--color-text-muted)]">
            {item.category} · {item.importance} · Week {item.academic_week} · {item.processing_status}
          </p>
          <button type="button" onClick={() => remove(item.id)} className="mt-2 text-xs text-red-600">
            Delete
          </button>
        </article>
      ))}
    </div>
  )
}
