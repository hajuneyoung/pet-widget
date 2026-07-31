import { useState } from 'react'
import AuthScreen from './components/AuthScreen'
import PetScreen from './components/PetScreen'
import { loadSession } from './lib/session'
import './index.css'

export default function App() {
  const [user, setUser] = useState(() => loadSession())

  return user
    ? <PetScreen user={user} onLogout={() => setUser(null)} />
    : <AuthScreen onAuthed={() => setUser(loadSession())} />
}
