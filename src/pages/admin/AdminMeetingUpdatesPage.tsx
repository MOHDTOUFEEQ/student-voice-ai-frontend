import { useEffect, useState, type FormEvent } from 'react'
import { api } from '../../api/client'

type Item = {
  id: string
  academic_week: number
  issue: string
  summary: string
  action?: string
  status: string
  published: boolean
}

export function AdminMeetingUpdatesPage() {
  const [items, setItems] = useState<Item[]>([])
  const [form, setForm] = useState({ academic_week: 2, issue: '', summary: '', action: '', status: 'Discussed', published: false })

  async function load() {
    const r = await api.get<{ items: Item[] }>('/api/admin/meeting-updates')
    setItems(r.items)
  }

  useEffect(() => {
    load()
  }, [])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    await api.post('/api/admin/meeting-updates', form)
    setForm({ academic_week: 2, issue: '', summary: '', action: '', status: 'Discussed', published: false })
    load()
  }

  async function togglePublish(item: Item) {
    await api.put(`/api/admin/meeting-updates/${item.id}`, { published: !item.published })
    load()
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="grid gap-3 rounded-xl border border-[var(--color-border)] p-4 md:grid-cols-2">
        <input className="rounded border px-2 py-1" type="number" value={form.academic_week} onChange={(e) => setForm({ ...form, academic_week: +e.target.value })} />
        <input className="rounded border px-2 py-1" placeholder="Issue" value={form.issue} onChange={(e) => setForm({ ...form, issue: e.target.value })} />
        <textarea className="rounded border px-2 py-1 md:col-span-2" placeholder="Summary" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
        <input className="rounded border px-2 py-1 md:col-span-2" placeholder="Action" value={form.action} onChange={(e) => setForm({ ...form, action: e.target.value })} />
        <button type="submit" className="rounded bg-brand-600 px-3 py-2 text-white md:col-span-2">
          Create update
        </button>
      </form>
      {items.map((item) => (
        <article key={item.id} className="rounded-lg border border-[var(--color-border)] p-4 text-sm">
          <p className="font-medium">
            Week {item.academic_week}: {item.issue}
          </p>
          <p>{item.summary}</p>
          <button type="button" className="mt-2 text-xs text-brand-600" onClick={() => togglePublish(item)}>
            {item.published ? 'Unpublish' : 'Publish'}
          </button>
        </article>
      ))}
    </div>
  )
}
