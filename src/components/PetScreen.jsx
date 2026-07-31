import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { clearSession } from '../lib/session'
import CatSprite from './CatSprite'
import RoomBackground from './RoomBackground'
import {
  applyRevisitDecay,
  feed,
  play,
  sleep,
  getMood,
  randomLine,
} from '../lib/petLogic'

const STAT_META = [
  { key: 'hunger', label: '배고픔', icon: '🍖' },
  { key: 'happiness', label: '기분', icon: '💗' },
  { key: 'energy', label: '체력', icon: '⚡' },
]

export default function PetScreen({ user, onLogout }) {
  const [pet, setPet] = useState(null)
  const [line, setLine] = useState('')
  const [loading, setLoading] = useState(true)
  const [actionKey, setActionKey] = useState(null)

  useEffect(() => {
    loadPet()
  }, [])

  async function loadPet() {
    setLoading(true)

    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error || !data) {
      setLoading(false)
      return
    }

    const decayedPet = applyRevisitDecay(data)
    if (decayedPet.decayed) {
      await supabase
        .from('pets')
        .update({
          hunger: decayedPet.hunger,
          happiness: decayedPet.happiness,
          energy: decayedPet.energy,
          last_visit: decayedPet.last_visit,
        })
        .eq('user_id', user.id)
    }

    setPet(decayedPet)
    setLine(randomLine(getMood(decayedPet)))
    setLoading(false)
  }

  async function runAction(actionFn, key) {
    if (!pet) return
    const updated = actionFn(pet)
    setPet(updated)
    setActionKey(key)
    setLine(randomLine(getMood(updated)))
    setTimeout(() => setActionKey(null), 1400)

    await supabase
      .from('pets')
      .update({
        hunger: updated.hunger,
        happiness: updated.happiness,
        energy: updated.energy,
      })
      .eq('user_id', user.id)
  }

  function handleLogout() {
    clearSession()
    onLogout()
  }

  if (loading) {
    return (
      <div className="device-shell">
        <div className="device-screen"><p className="loading-text">불러오는 중...</p></div>
      </div>
    )
  }

  if (!pet) {
    return (
      <div className="device-shell">
        <div className="device-screen"><p className="loading-text">고양이를 찾을 수 없어요</p></div>
      </div>
    )
  }

  const mood = getMood(pet)

  return (
    <div className="device-shell">
      <div className="device-screen">
        <div className="pet-topbar">
          <span className="pet-name">{pet.display_name}의 고양이</span>
          <button className="btn-logout" onClick={handleLogout}>로그아웃</button>
        </div>

        <div className="speech-bubble">{line}</div>

        <div className={`cat-stage ${actionKey ? `action-${actionKey}` : ''}`}>
          <RoomBackground />
          <CatSprite color={pet.color} mood={mood} action={actionKey} />
        </div>

        <div className="stat-bars">
          {STAT_META.map((s) => (
            <div className="stat-row" key={s.key}>
              <span className="stat-icon">{s.icon}</span>
              <div className="stat-track">
                <div
                  className={`stat-fill stat-${s.key}`}
                  style={{ width: `${pet[s.key]}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="action-buttons">
          <button className="btn btn-action" onClick={() => runAction(feed, 'feed')}>
            🍖 먹이주기
          </button>
          <button className="btn btn-action" onClick={() => runAction(play, 'play')}>
            🎾 놀아주기
          </button>
          <button className="btn btn-action" onClick={() => runAction(sleep, 'sleep')}>
            😴 재우기
          </button>
        </div>
      </div>
    </div>
  )
}
