import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { saveSession } from '../lib/session'
import { CAT_COLORS } from '../lib/catSprites'
import CatSprite from './CatSprite'

const SWATCH_HEX = { ginger: '#F2A65A', gray: '#D8C4A8' }

export default function AuthScreen({ onAuthed }) {
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [color, setColor] = useState('ginger')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const trimmedName = name.trim()
    if (!trimmedName || !password) {
      setError('이름과 비밀번호를 입력해줘')
      return
    }
    setLoading(true)

    try {
      const fn = mode === 'signup' ? 'signup_user' : 'login_user'
      const args = mode === 'signup'
        ? { p_name: trimmedName, p_password: password, p_color: color }
        : { p_name: trimmedName, p_password: password }

      const { data, error: rpcError } = await supabase.rpc(fn, args)
      if (rpcError) throw rpcError

      saveSession({ id: data, name: trimmedName })
      onAuthed()
    } catch (err) {
      setError(err.message || '문제가 생겼어요, 다시 시도해줘')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="device-shell">
      <div className="device-screen auth-screen">
        <div className="auth-header">
          <CatSprite color={color} mood="normal" />
          <h1>내 고양이 키우기</h1>
        </div>

        <div className="auth-tabs">
          <button
            type="button"
            className={mode === 'login' ? 'tab active' : 'tab'}
            onClick={() => setMode('login')}
          >
            로그인
          </button>
          <button
            type="button"
            className={mode === 'signup' ? 'tab active' : 'tab'}
            onClick={() => setMode('signup')}
          >
            회원가입
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            이름
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="닉네임 (한글/영문 자유롭게)"
              autoComplete="username"
            />
          </label>
          <label>
            비밀번호
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            />
          </label>

          {mode === 'signup' && (
            <div className="color-picker">
              <span className="color-picker-label">고양이 색상</span>
              <div className="color-options">
                {Object.entries(CAT_COLORS).map(([key, meta]) => (
                  <button
                    type="button"
                    key={key}
                    className={color === key ? 'swatch active' : 'swatch'}
                    style={{ background: SWATCH_HEX[key] }}
                    onClick={() => setColor(key)}
                    aria-label={meta.label}
                  >
                    {color === key ? '✓' : ''}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '처리중...' : mode === 'signup' ? '가입하고 시작하기' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  )
}
