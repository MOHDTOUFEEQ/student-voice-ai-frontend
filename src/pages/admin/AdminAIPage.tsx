import { useState, type FormEvent } from 'react'
import { api } from '../../api/client'

export function AdminAIPage() {
  const [question, setQuestion] = useState('What are students most concerned about this week?')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post<{ answer: string }>('/api/admin/ai/query', { question })
      setAnswer(res.answer)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-4">
      <form onSubmit={onSubmit} className="space-y-3">
        <textarea className="w-full rounded-lg border border-[var(--color-border)] p-3 text-sm" rows={4} value={question} onChange={(e) => setQuestion(e.target.value)} />
        <button type="submit" disabled={loading} className="rounded-lg bg-brand-600 px-4 py-2 text-sm text-white">
          {loading ? 'Thinking…' : 'Ask'}
        </button>
      </form>
      {answer && (
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm">
          <p className="text-xs text-[var(--color-text-muted)]">AI-generated from aggregated data</p>
          <p className="mt-2 whitespace-pre-wrap">{answer}</p>
        </div>
      )}
    </div>
  )
}
