import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { api } from '../api/client'

type AuthState = {
  token: string | null
  displayName: string
  role: string
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('sv_token'))
  const [displayName, setDisplayName] = useState('Toufeeq Mohammed')
  const [role, setRole] = useState('MSc Representative')

  const value = useMemo<AuthState>(
    () => ({
      token,
      displayName,
      role,
      async login(username, password) {
        const res = await api.post<{
          access_token: string
          display_name: string
          role: string
        }>('/api/admin/login', { username, password })
        localStorage.setItem('sv_token', res.access_token)
        setToken(res.access_token)
        setDisplayName(res.display_name)
        setRole(res.role)
      },
      async logout() {
        try {
          await api.post('/api/admin/logout')
        } catch {
          /* ignore */
        }
        localStorage.removeItem('sv_token')
        setToken(null)
      },
    }),
    [token, displayName, role],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth outside provider')
  return ctx
}
