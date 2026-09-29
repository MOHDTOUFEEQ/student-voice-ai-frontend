import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { useLocale } from '../contexts/LocaleContext'

type Props = {
  type: 'feedback' | 'suggestion'
  id?: string
}

export function FeedbackForm({ type, id }: Props) {
  const { t, locale } = useLocale()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState<string>(t.categories[0]?.value ?? 'Other')
  const [importance, setImportance] = useState('medium')
  const [loading, setLoading] = useState(false)
  const [diceLoading, setDiceLoading] = useState(false)
  const [error, setError] = useState('')

  const isFeedback = type === 'feedback'
  const copy = isFeedback ? t.feedback : t.suggest

  async function onDice() {
    setDiceLoading(true)
    setError('')
    try {
      const res = await api.post<{ message: string }>(
        `/api/public/ai/suggest-feedback?lang=${encodeURIComponent(locale)}`,
        { category },
      )
      setMessage(res.message)
    } catch {
      setError(t.common.diceError)
    } finally {
      setDiceLoading(false)
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const path = isFeedback ? '/api/feedback' : '/api/suggestions'
      await api.post(path, { message, category, importance })
      navigate(isFeedback ? '/feedback/thanks' : '/suggest/thanks')
    } catch (err) {
      setError(err instanceof Error ? err.message : t.common.submitError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form id={id} onSubmit={onSubmit} className="space-y-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm md:p-8">
      <div>
        <h2 className="text-xl font-semibold">{copy.title}</h2>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">{copy.description}</p>
      </div>
      <label className="block space-y-2">
        <span className="text-sm font-medium">{t.feedback.messageLabel}</span>
        <textarea
          required
          minLength={10}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500/40"
        />
      </label>
      {isFeedback && (
        <button
          type="button"
          onClick={onDice}
          disabled={diceLoading}
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm hover:bg-[var(--color-surface-muted)]"
        >
          <span aria-hidden>🎲</span>
          {diceLoading ? t.common.loading : t.feedback.dice}
        </button>
      )}
      <label className="block space-y-2">
        <span className="text-sm font-medium">{t.feedback.categoryLabel}</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-sm"
        >
          {t.categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </label>
      <fieldset>
        <legend className="text-sm font-medium">{t.feedback.importanceLabel}</legend>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(['low', 'medium', 'high', 'critical'] as const).map((level) => (
            <label key={level} className="flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm">
              <input
                type="radio"
                name={`importance-${type}`}
                value={level}
                checked={importance === level}
                onChange={() => setImportance(level)}
              />
              {t.common[level]}
            </label>
          ))}
        </div>
      </fieldset>
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60 sm:w-auto"
      >
        {loading ? t.common.loading : isFeedback ? t.feedback.submit : t.suggest.submit}
      </button>
    </form>
  )
}
