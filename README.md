# 내 고양이 키우기 (친구용 펫 위젯)

Tamagotchi 감성의 미니 웹 위젯. 이름+비밀번호로 로그인하면 자기 고양이를 키울 수 있어요.

## 1. Supabase 설정

1. https://supabase.com 에서 프로젝트 생성
2. SQL Editor에서 `supabase-schema.sql` 내용을 **전체** 실행
   (맨 위에 기존 테이블/함수를 지우는 `drop` 문이 포함되어 있어서, 이전에 이메일 기반으로
   만들었던 테이블이 있어도 깨끗하게 다시 만들어져요)
3. 이제 이메일을 전혀 안 써서 **"Confirm email" 설정은 신경 안 써도 됩니다.**
4. Project Settings > API 에서 `Project URL`과 `anon public`(= Publishable key) 복사

## 2. 로컬 실행

```bash
cp .env.example .env
# .env 파일 열어서 VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY 채우기

npm install
npm run dev
```

## 3. 현재 구현된 것

- **이름 + 비밀번호만으로 회원가입/로그인** (이메일 전혀 사용 안 함).
  Supabase Auth 대신 직접 만든 `signup_user` / `login_user` SQL 함수를 씀.
  비밀번호는 `pgcrypto`로 해시해서 저장하고, 로그인 세션은 브라우저에 저장돼요.
  ⚠️ 친구들끼리 쓰는 캐주얼 프로젝트라 정식 인증(비밀번호 재설정, 세션 만료 등)은
  없어요 — 이름만 알면 로그인 시도는 가능한 구조이니 민감한 용도로는 쓰지 마세요.
- 고양이 색상 선택 (치즈 / 그레이)
- 케어 3종: 먹이주기 / 놀아주기 / 재우기 (실제 스프라이트 애니메이션)
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
