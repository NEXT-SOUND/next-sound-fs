# Auth 기능 구현 완료

백엔드에 구현된 auth API를 연결하여 모던한 프론트엔드 인증 시스템을 구현했습니다.

## 🚀 구현된 기능

### 1. **인증 API 클라이언트** (`apps/web/lib/api.ts`)
- Axios 기반 API 클라이언트
- 쿠키 기반 세션 관리
- TypeScript 타입 정의
- 에러 핸들링

### 2. **Auth Context & Hooks** (`apps/web/contexts/AuthContext.tsx`)
- React Context를 통한 전역 인증 상태 관리
- `useAuth` 훅으로 간편한 인증 기능 접근
- 자동 세션 확인 및 복원
- 토스트 메시지를 통한 사용자 피드백

### 3. **모던한 UI 컴포넌트들**
- **Input 컴포넌트** (`packages/ui/input.tsx`): 라벨, 에러 메시지, 도움말 텍스트 지원
- **Button 컴포넌트**: 로딩 상태, 다양한 변형 지원
- Tailwind CSS + class-variance-authority 기반 스타일링

### 4. **인증 페이지들**

#### 🔐 **로그인 페이지** (`/auth/login`)
- 이메일/비밀번호 로그인
- Google OAuth 로그인
- GitHub OAuth 로그인
- 비밀번호 표시/숨김 토글
- 실시간 폼 검증
- "비밀번호 찾기" 링크

#### 📝 **회원가입 페이지** (`/auth/register`)
- 이름, 이메일, 비밀번호 입력
- 비밀번호 확인 기능
- Google/GitHub OAuth 회원가입
- 실시간 폼 검증 (이메일 형식, 비밀번호 최소 길이 등)
- 자동 이메일 인증 페이지 리다이렉트

#### ✉️ **이메일 인증 페이지** (`/auth/verify-email`)
- 토큰 기반 이메일 인증
- 인증 상태별 UI (처리중/성공/실패/대기)
- 인증 이메일 재전송 기능
- 자동 로그인 페이지 리다이렉트

#### 🔄 **OAuth 콜백 페이지** (`/auth/callback`)
- Google/GitHub OAuth 후 처리
- 에러 상황 핸들링
- 자동 홈페이지 리다이렉트

### 5. **사용자 인터페이스 컴포넌트**
- **AuthButton** (`apps/web/components/AuthButton.tsx`): 로그인/로그아웃 버튼
- 사용자 정보 표시 (이름, 이메일)
- 로딩 상태 표시

### 6. **토스트 메시지 시스템**
- react-hot-toast 라이브러리 통합
- 성공/에러 메시지 자동 표시
- 테마와 일치하는 스타일링

## 🎨 디자인 특징

- **모던한 글래스모피즘 디자인**: 반투명 배경, 블러 효과
- **그라데이션 배경**: 아름다운 시각적 효과
- **다크/라이트 테마 지원**: CSS 변수 기반
- **반응형 디자인**: 모바일 친화적
- **애니메이션**: 페이드인, 슬라이드 효과
- **일관된 컬러 시스템**: Tailwind CSS 기반

## 📱 지원하는 인증 방식

1. **이메일/비밀번호 인증**
   - 회원가입 → 이메일 인증 → 로그인
   - 비밀번호 최소 6자 이상

2. **Google OAuth**
   - 원클릭 로그인/회원가입
   - 자동 계정 생성

3. **GitHub OAuth**
   - 개발자 친화적 로그인
   - 자동 계정 생성

## 🔧 사용법

### 1. 환경 설정
```bash
# 백엔드 API URL 설정
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 2. 패키지 설치 및 실행
```bash
cd apps/web
npm install
npm run dev
```

### 3. 사용 예시
```tsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout, isLoading } = useAuth();
  
  if (isLoading) return <div>로딩 중...</div>;
  
  if (isAuthenticated) {
    return (
      <div>
        <p>안녕하세요, {user?.name}님!</p>
        <button onClick={logout}>로그아웃</button>
      </div>
    );
  }
  
  return (
    <button onClick={() => login(email, password)}>
      로그인
    </button>
  );
}
```

## 🛡️ 보안 기능

- **쿠키 기반 세션**: HTTP-only 쿠키로 안전한 인증
- **CSRF 보호**: withCredentials 설정
- **자동 세션 만료 처리**: 만료된 세션 자동 감지
- **입력값 검증**: 프론트엔드 + 백엔드 이중 검증
- **에러 메시지 표준화**: 보안 정보 노출 방지

## 📋 API 엔드포인트 연결

| 기능 | 엔드포인트 | 메서드 | 설명 |
|------|-----------|--------|------|
| 회원가입 | `/auth/register` | POST | 이메일, 비밀번호, 이름 |
| 로그인 | `/auth/login` | POST | 이메일, 비밀번호 |
| 로그아웃 | `/auth/logout` | POST | 세션 종료 |
| 세션 확인 | `/auth/check-session` | GET | 인증 상태 확인 |
| 이메일 인증 | `/auth/verify-email` | GET | 토큰 기반 인증 |
| 인증 이메일 재전송 | `/auth/resend-verification` | POST | 이메일 재발송 |
| Google OAuth | `/auth/google` | GET | Google 로그인 시작 |
| GitHub OAuth | `/auth/github` | GET | GitHub 로그인 시작 |

## 🎯 다음 단계

1. **비밀번호 재설정** 페이지 구현
2. **프로필 수정** 기능 추가
3. **계정 삭제** 기능 구현
4. **2단계 인증 (2FA)** 추가
5. **소셜 계정 연결** 기능

모든 인증 기능이 완전히 구현되어 사용자가 안전하고 편리하게 계정을 관리할 수 있습니다! 🎉