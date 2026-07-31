// 접속(방문)마다 소량 감소하는 방식. 실시간 타이머 없음.
// 마지막 방문 후 10분이 지나지 않았으면 감소시키지 않음 (새로고침 스팸 방지).
export const REVISIT_COOLDOWN_MS = 10 * 60 * 1000 // 10분

export const DECAY = { hunger: 8, happiness: 6, energy: 4 }
export const FEED_GAIN = { hunger: 30 }
export const PLAY_GAIN = { happiness: 30, energy: -10 }
export const SLEEP_GAIN = { energy: 40, happiness: 5 }

const clamp = (n) => Math.max(0, Math.min(100, n))

// 마지막 방문 시각을 기준으로 감소를 적용할지 계산.
// 반환: { hunger, happiness, energy, lastVisit, decayed }
export function applyRevisitDecay(pet, now = Date.now()) {
  const last = new Date(pet.last_visit).getTime()
  const elapsed = now - last

  if (elapsed < REVISIT_COOLDOWN_MS) {
    return { ...pet, decayed: false }
  }

  return {
    ...pet,
    hunger: clamp(pet.hunger - DECAY.hunger),
    happiness: clamp(pet.happiness - DECAY.happiness),
    energy: clamp(pet.energy - DECAY.energy),
    last_visit: new Date(now).toISOString(),
    decayed: true,
  }
}

export function feed(pet) {
  return { ...pet, hunger: clamp(pet.hunger + FEED_GAIN.hunger) }
}

export function play(pet) {
  return {
    ...pet,
    happiness: clamp(pet.happiness + PLAY_GAIN.happiness),
    energy: clamp(pet.energy + PLAY_GAIN.energy),
  }
}

export function sleep(pet) {
  return {
    ...pet,
    energy: clamp(pet.energy + SLEEP_GAIN.energy),
    happiness: clamp(pet.happiness + SLEEP_GAIN.happiness),
  }
}

export function getMood(pet) {
  if (pet.energy < 20) return 'sleepy'
  if (pet.hunger < 30) return 'hungry'
  if (pet.happiness >= 70) return 'happy'
  return 'normal'
}

export const MOOD_LINES = {
  hungry: ['밥내놔 주인놈아', '배고파 죽겠다 진짜...', '나 아사 직전이야 빨리!', '꼬르륵... 밥 언제 줄거야'],
  sleepy: ['졸려... 눈이 안 떠져', '나 잘래, 방해하지마', '하암... 낮잠 잘 시간이야', '눈꺼풀이 무거워...'],
  happy: ['오늘따라 기분 째지네', '주인 최고! 냥냥', '가릉가릉~ 행복해', '오늘 하루도 나쁘지 않네'],
  normal: ['오늘도 평화롭구나', '심심한데 좀 놀아줘', '주인 뭐하는겨', '...(하품)'],
}

export function randomLine(mood) {
  const lines = MOOD_LINES[mood] ?? MOOD_LINES.normal
  return lines[Math.floor(Math.random() * lines.length)]
}

export const MOOD_OVERLAY = {
  hungry: '💧',
  sleepy: '💤',
  happy: '✨',
  normal: null,
}
