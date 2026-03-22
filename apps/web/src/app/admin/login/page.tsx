'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UtensilsCrossed, Eye, EyeOff, LogIn } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = await res.json() as { error?: string }
        setError(data.error ?? 'Invalid credentials')
        return
      }

      router.push('/admin')
      router.refresh()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[100dvh] bg-[#0D1117] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#D4A853]/10 rounded-2xl mb-4">
            <UtensilsCrossed className="h-7 w-7 text-[#D4A853]" />
          </div>
          <h1 className="text-2xl font-bold text-[#E6EDF3]">Admin Login</h1>
          <p className="text-[#8B949E] text-sm mt-1">
            Dine Colorado Springs
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#161B22] border border-[#30363D] rounded-2xl p-6 space-y-4"
        >
          <div>
            <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="CEO@epicai.ai"
              className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-3 text-[#E6EDF3] placeholder-[#8B949E] text-sm focus:outline-none focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853] transition-colors min-h-[44px]"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-3 pr-12 text-[#E6EDF3] placeholder-[#8B949E] text-sm focus:outline-none focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853] transition-colors min-h-[44px]"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B949E] hover:text-[#E6EDF3] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-[#F85149] text-sm bg-[#F85149]/10 border border-[#F85149]/20 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#D4A853] hover:bg-[#E8C97A] disabled:opacity-50 disabled:cursor-not-allowed text-[#0D1117] font-semibold rounded-xl transition-colors min-h-[48px]"
          >
            {loading ? (
              'Signing in...'
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
