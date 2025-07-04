import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// API 클라이언트 설정
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 쿠키를 포함하여 요청
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth 관련 타입들
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isEmailVerified: boolean;
}

export interface AuthResponse {
  user: User;
  message?: string;
}

// Auth API 서비스
export const authApi = {
  // 로그인
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  // 회원가입
  register: async (data: RegisterData): Promise<{ message: string }> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  // 로그아웃
  logout: async (): Promise<{ message: string }> => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  // 세션 확인
  checkSession: async (): Promise<boolean> => {
    try {
      const response = await apiClient.get('/auth/check-session');
      return response.data;
    } catch {
      return false;
    }
  },

  // 이메일 인증
  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await apiClient.get(`/auth/verify-email?token=${token}`);
    return response.data;
  },

  // 인증 이메일 재전송
  resendVerification: async (email: string): Promise<{ message: string }> => {
    const response = await apiClient.post('/auth/resend-verification', { email });
    return response.data;
  },
};