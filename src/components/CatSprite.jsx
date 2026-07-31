import { useEffect, useRef, useState } from 'react'
import { CAT_SPRITE_FRAMES } from '../lib/catSprites'
import { MOOD_OVERLAY } from '../lib/petLogic'

const FRAME_MS = 220

// action: 'feed' | 'play' | 'sleep' 버튼을 누르면 잠깐 해당 동작 애니메이션을 재생.
// action이 없으면 mood에 따라 idle 또는 sleep 루프를 보여줌.
export default function CatSprite({ color = 'ginger', mood = 'normal', action = null }) {
  const clip = action === 'feed' ? 'eat'
    : action === 'play' ? 'play'
    : action === 'sleep' ? 'sleep'
    : mood === 'sleepy' ? 'sleep'
    : 'idle'

  const framesForColor = CAT_SPRITE_FRAMES[color] ?? CAT_SPRITE_FRAMES.ginger
  const framesList = framesForColor?.[clip] ?? framesForColor?.idle ?? []

  const [frameIndex, setFrameIndex] = useState(0)
  const indexRef = useRef(0)

  useEffect(() => {
    indexRef.current = 0
    setFrameIndex(0)
    if (framesList.length <= 1) return

    const id = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % framesList.length
      setFrameIndex(indexRef.current)
    }, FRAME_MS)
    return () => clearInterval(id)
  }, [clip, color, framesList.length])

  const overlay = action ? null : MOOD_OVERLAY[mood]
  const src = framesList[frameIndex]

  return (
    <div className={`cat-sprite-wrap mood-${mood}`}>
      {src
        ? <img src={src} alt="고양이" className="cat-sprite-img" draggable={false} />
        : <div className="cat-sprite-missing">🐱</div>}
      {overlay && <span className="mood-overlay">{overlay}</span>}
    </div>
  )
}
