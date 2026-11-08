import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { input, label, primary } from '../styles'

const FAKE_REQUEST_MS = 700

type Mode = 'login' | 'register'

// Fake login/sign-up flow: it only validates that fields are filled in
export default function AuthScreen({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('ana@example.com')
  const [password, setPassword] = useState('password123')
  const [name, setName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(false)

  const isLogin = mode === 'login'

  const fakeRequest = (onDone: () => void) => {
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onDone()
    }, FAKE_REQUEST_MS)
  }

  const submit = () => {
    if (loading) return
    if (isLogin) {
      if (!email || !password) return setError('Enter email and password')
      fakeRequest(onLogin)
    } else {
      if (!name || !regEmail || !regPassword) return setError('All fields are required')
      fakeRequest(() => {
        setMode('login')
        setEmail(regEmail)
        setPassword('')
        setNotice('Account created! Log in now.')
      })
    }
  }

  const switchMode = () => {
    setMode(isLogin ? 'register' : 'login')
    setError('')
    if (isLogin) setNotice('')
  }

  // Each field clears the error as soon as the user types
  const bind = (value: string, setValue: (v: string) => void) => ({
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
      setError('')
    },
  })

  return (
    <div className="flex min-h-0 flex-1 flex-col px-6 pb-8 pt-2">
      <div className="flex items-center justify-between border-b-2 border-tm-divider pb-3">
        {isLogin ? (
          <span className="text-xs font-semibold uppercase tracking-widest">Task Manager</span>
        ) : (
          <button
            onClick={switchMode}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest"
          >
            <ArrowLeft size={16} />
            Task Manager
          </button>
        )}
        <span className="h-3.5 w-3.5 rounded-full bg-tm-accent" />
      </div>

      <div className="mt-auto flex flex-col gap-4">
        <h1 className="mb-3 text-5xl font-extrabold leading-none tracking-tight">
          {isLogin ? 'Log in to your account' : 'Create your account'}
        </h1>
        {isLogin && notice && (
          <div className="bg-tm-accent-soft px-3.5 py-3 text-sm font-semibold text-tm-accent">{notice}</div>
        )}
        {!isLogin && (
          <label className={label}>
            Name
            <input className={input} placeholder="Your name" {...bind(name, setName)} />
          </label>
        )}
        <label className={label}>
          Email
          <input
            className={input}
            type="email"
            placeholder="you@example.com"
            {...(isLogin ? bind(email, setEmail) : bind(regEmail, setRegEmail))}
          />
        </label>
        <label className={label}>
          Password
          <input
            className={input}
            type="password"
            placeholder={isLogin ? '••••••••' : 'At least 8 characters'}
            {...(isLogin ? bind(password, setPassword) : bind(regPassword, setRegPassword))}
          />
        </label>
        {error && <div className="text-sm font-semibold text-tm-accent">{error}</div>}
        <button onClick={submit} className={`${primary} mt-2 ${loading ? 'opacity-60' : ''}`}>
          <span>
            {isLogin ? (loading ? 'Logging in...' : 'Log in') : loading ? 'Signing up...' : 'Sign up'}
          </span>
          <ArrowRight size={20} />
        </button>
      </div>

      <div className="mt-7 flex gap-1.5 border-t-2 border-tm-divider pt-4 text-sm">
        <span className="text-tm-muted">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
        </span>
        <button className="font-extrabold text-tm-accent" onClick={switchMode}>
          {isLogin ? 'Sign up' : 'Log in'}
        </button>
      </div>
    </div>
  )
}
