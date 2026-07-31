import ginger_idle_0 from '../assets/cat/ginger/idle-0.png'
import ginger_idle_1 from '../assets/cat/ginger/idle-1.png'
import ginger_idle_2 from '../assets/cat/ginger/idle-2.png'
import ginger_idle_3 from '../assets/cat/ginger/idle-3.png'
import ginger_eat_0 from '../assets/cat/ginger/eat-0.png'
import ginger_eat_1 from '../assets/cat/ginger/eat-1.png'
import ginger_play_0 from '../assets/cat/ginger/play-0.png'
import ginger_play_1 from '../assets/cat/ginger/play-1.png'
import ginger_sleep_0 from '../assets/cat/ginger/sleep-0.png'
import ginger_sleep_1 from '../assets/cat/ginger/sleep-1.png'
import ginger_sleep_2 from '../assets/cat/ginger/sleep-2.png'
import ginger_sleep_3 from '../assets/cat/ginger/sleep-3.png'
import gray_idle_0 from '../assets/cat/gray/idle-0.png'
import gray_idle_1 from '../assets/cat/gray/idle-1.png'
import gray_idle_2 from '../assets/cat/gray/idle-2.png'
import gray_idle_3 from '../assets/cat/gray/idle-3.png'
import gray_eat_0 from '../assets/cat/gray/eat-0.png'
import gray_eat_1 from '../assets/cat/gray/eat-1.png'
import gray_eat_2 from '../assets/cat/gray/eat-2.png'
import gray_eat_3 from '../assets/cat/gray/eat-3.png'
import gray_play_0 from '../assets/cat/gray/play-0.png'
import gray_play_1 from '../assets/cat/gray/play-1.png'
import gray_play_2 from '../assets/cat/gray/play-2.png'
import gray_play_3 from '../assets/cat/gray/play-3.png'
import gray_sleep_0 from '../assets/cat/gray/sleep-0.png'
import gray_sleep_1 from '../assets/cat/gray/sleep-1.png'
import gray_sleep_2 from '../assets/cat/gray/sleep-2.png'
import gray_sleep_3 from '../assets/cat/gray/sleep-3.png'

export const CAT_SPRITE_FRAMES = {
  ginger: {
    idle: [ginger_idle_0, ginger_idle_1, ginger_idle_2, ginger_idle_3],
    eat: [ginger_eat_0, ginger_eat_1],
    play: [ginger_play_0, ginger_play_1],
    sleep: [ginger_sleep_0, ginger_sleep_1, ginger_sleep_2, ginger_sleep_3],
  },
  gray: {
    idle: [gray_idle_0, gray_idle_1, gray_idle_2, gray_idle_3],
    eat: [gray_eat_0, gray_eat_1, gray_eat_2, gray_eat_3],
    play: [gray_play_0, gray_play_1, gray_play_2, gray_play_3],
    sleep: [gray_sleep_0, gray_sleep_1, gray_sleep_2, gray_sleep_3],
  },
}

export const CAT_COLORS = {
  ginger: { label: '치즈' },
  gray: { label: '아이보리' },
}
