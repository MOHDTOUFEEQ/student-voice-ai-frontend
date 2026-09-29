import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function RedirectHomeSection({ hash }: { hash: string }) {
  const navigate = useNavigate()
  useEffect(() => {
    navigate({ pathname: '/', hash: hash.replace('#', '') }, { replace: true })
  }, [hash, navigate])
  return null
}
