import { useEffect, useState } from 'react'
import { api } from '../../api/client'

type Item = {
  id: string
  type: string
  message: string
  category: string
  importance: string
  ai_category?: string
  sentiment?: string
  ai_priority?: string
  ai_themes?: string[]
  ai_flags?: string[]
  is_sensitive?: boolean
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
          <p className="text-xs">AI: {item.ai_category} · {item.sentiment} · {item.ai_priority} · themes: {(item.ai_themes ?? []).join(', ')}</p>
          {item.is_sensitive && <p className="text-xs font-semibold text-amber-600">Sensitive flag (admin only)</p>}
          <button type="button" onClick={() => remove(item.id)} className="mt-2 text-xs text-red-600">
            Delete
          </button>
        </article>
      ))}
    </div>
  )
}
