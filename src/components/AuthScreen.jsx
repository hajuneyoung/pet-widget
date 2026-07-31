import { useState } from 'react'
import { supabase, nameToEmail } from '../lib/supabaseClient'
import { CAT_COLORS } from '../lib/catSprites'
import CatSprite from './CatSprite'

const SWATCH_HEX = { ginger: '#F2A65A', gray: '#9AA0AE' }

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
    if (!name.trim() || !password) {
      setError('이름과 비밀번호를 입력해줘')
      return
    }
    setLoading(true)
    const email = nameToEmail(name)

    try {
      if (mode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        })
        if (signUpError) throw signUpError

        // 회원가입 성공 시, 고양이 1마리 생성
        const userId = data.user?.id
        if (userId) {
          const { error: insertError } = await supabase.from('pets').insert({
            user_id: userId,
            display_name: name.trim(),
            color,
            hunger: 80,
            happiness: 80,
            energy: 80,
            last_visit: new Date().toISOString(),
          })
          if (insertError) throw insertError
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (signInError) throw signInError
      }
      onAuthed()
    } catch (err) {
      setError(err.message === 'Invalid login credentials'
        ? '이름 또는 비밀번호가 틀렸어'
        : err.message)
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
              placeholder="닉네임"
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
