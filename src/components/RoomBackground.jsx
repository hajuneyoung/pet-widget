import bed from '../assets/room/bed.png'
import house from '../assets/room/house.png'
import cushion from '../assets/room/cushion.png'
import tower from '../assets/room/tower.png'
import food from '../assets/room/food.png'
import mouse from '../assets/room/mouse.png'

// 고양이 화면 뒤에 깔리는 간단한 방 배경.
// 절대 위치로 소품을 배치해서 "작은 방" 느낌만 가볍게 줌.
export default function RoomBackground() {
  return (
    <div className="room-bg" aria-hidden="true">
      <img src={tower} className="room-item room-tower" alt="" />
      <img src={house} className="room-item room-house" alt="" />
      <img src={bed} className="room-item room-bed" alt="" />
      <img src={cushion} className="room-item room-cushion" alt="" />
      <img src={food} className="room-item room-food" alt="" />
      <img src={mouse} className="room-item room-mouse" alt="" />
    </div>
  )
}
