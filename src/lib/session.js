// 이름+비밀번호 로그인은 Supabase Auth를 쓰지 않기 때문에,
// 로그인 상태를 브라우저에 직접 저장해서 유지합니다.
const KEY = 'pet-widget-session'

export function saveSession(user) {
  localStorage.setItem(KEY, JSON.stringify(user))
}

export function loadSession() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function clearSession() {
  localStorage.removeItem(KEY)
}
