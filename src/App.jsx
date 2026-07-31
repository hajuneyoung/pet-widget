import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'
import AuthScreen from './components/AuthScreen'
import PetScreen from './components/PetScreen'
import './index.css'

export default function App() {
  const [session, setSession] = useState(undefined) // undefined = 확인중, null = 비로그인

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  if (session === undefined) {
    return (
      <div className="device-shell">
        <div className="device-screen"><p className="loading-text">로딩중...</p></div>
      </div>
    )
  }

  return session
    ? <PetScreen onLogout={() => setSession(null)} />
    : <AuthScreen onAuthed={() => {}} />
}
