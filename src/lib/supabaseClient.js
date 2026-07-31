import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY 가 설정되지 않았어요. .env 파일을 확인하세요 (.env.example 참고).'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 이름 기반 로그인을 위해 내부적으로 사용하는 가짜 이메일 도메인.
// Supabase Auth는 이메일 기반이라, 이름을 이메일 형태로 변환해서 사용합니다.
export function nameToEmail(name) {
  const normalized = name.trim().toLowerCase().replace(/\s+/g, '')
  return `${normalized}@pet.local`
}
