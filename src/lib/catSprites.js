// 스프라이트 프레임을 자동으로 불러옵니다.
// 경로 규칙: src/assets/cat/{color}/{action}-{frameIndex}.png
const modules = import.meta.glob('../assets/cat/*/*.png', { eager: true, as: 'url' })

const frames = {} // { ginger: { idle: [url,url,url,url], sleep: [...], eat: [...], play: [...] }, gray: {...} }

for (const path in modules) {
  const match = path.match(/cat\/([a-z]+)\/([a-z]+)-(\d+)\.png$/)
  if (!match) continue
  const [, color, action, indexStr] = match
  const index = Number(indexStr)
  frames[color] ??= {}
  frames[color][action] ??= []
  frames[color][action][index] = modules[path]
}

export const CAT_SPRITE_FRAMES = frames

export const CAT_COLORS = {
  ginger: { label: '치즈' },
  gray: { label: '그레이' },
}
