# 내 고양이 키우기 (친구용 펫 위젯)

Tamagotchi 감성의 미니 웹 위젯. 이름+비밀번호로 로그인하면 자기 고양이를 키울 수 있어요.

## 1. Supabase 설정

1. https://supabase.com 에서 프로젝트 생성
2. SQL Editor에서 `supabase-schema.sql` 내용 실행 (테이블 + RLS 정책 생성)
3. **Authentication > Providers > Email** 에서 "Confirm email" 옵션을 꺼주세요.
   (이름 기반 로그인을 위해 내부적으로 `이름@pet.local` 형태의 가짜 이메일을 쓰기 때문에,
   이메일 인증 메일이 실제로 발송/확인될 수 없어요.)
4. Project Settings > API 에서 `Project URL`과 `anon public` 키 복사

## 2. 로컬 실행

```bash
cp .env.example .env
# .env 파일 열어서 VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY 채우기

npm install
npm run dev
```

## 3. 현재 구현된 것

- 이름 + 비밀번호 회원가입/로그인
- 고양이 색상 선택 (하양이 / 치즈 / 턱시도)
- 케어 3종: 먹이주기 / 놀아주기 / 재우기
- 배고픔·기분·체력 게이지
- 상태별 말풍선 대사 (예: 배고프면 "밥내놔 주인놈아")
- 재접속 시 소량 상태 감소 (10분 쿨다운, 실시간 타이머 없음)

## 4. 스프라이트 에셋

`src/assets/cat/{ginger|gray}/{idle|sleep|eat|play}-{0~3}.png`

- 출처: [Pet Mobile Pixel Asset Pack by ToffeeCraft](https://toffeecraft.itch.io/pet-virtual-mobile-pixel-asset) (무료 버전)
- 라이선스: 개인 프로젝트 무료 사용 가능, 재배포·재판매 금지
- 무료 버전에는 색상이 **치즈(ginger) / 그레이(gray)** 2종만 있어서, 회원가입 화면 색상
  선택지도 이 2종으로 맞춰뒀어요. 흰둥이 등 다른 색을 넣고 싶으면 유료 확장판을 구매하거나
  직접 스프라이트를 그려서 같은 폴더 구조로 추가하면 됩니다.

## 5. 아직 안 된 것 / 다음 단계

- **친구 펫 구경 기능** — 이번 1차 구현에서는 제외됨. 나중에 `pets` 테이블에서
  본인 것만 보이는 RLS를 "친구 관계"까지 허용하도록 정책 추가하면 됩니다.
- **우측 하단 고정 배치** — 지금은 일반 웹페이지. PWA 창 고정 또는
  Picture-in-Picture 적용은 추후 논의 예정.
