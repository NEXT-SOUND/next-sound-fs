import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import GLOBAL_ENV from "../constants/globalEnv";

const API_BASE_URL = GLOBAL_ENV.BACKEND_URL;

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

// TanStack Query hooks
export const useAuth = () => {
  const queryClient = useQueryClient();

  // 세션 확인 쿼리
  const checkSessionQuery = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: authApi.checkSession,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5분
  });

  // 로그인 뮤테이션
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'session'] });
    },
  });

  // 회원가입 뮤테이션
  const registerMutation = useMutation({
    mutationFn: authApi.register,
  });

  // 로그아웃 뮤테이션
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'session'] });
    },
  });

  // 이메일 인증 뮤테이션
  const verifyEmailMutation = useMutation({
    mutationFn: authApi.verifyEmail,
  });

  // 인증 이메일 재전송 뮤테이션
  const resendVerificationMutation = useMutation({
    mutationFn: authApi.resendVerification,
  });

  return {
    // 쿼리
    checkSessionQuery,
    
    // 뮤테이션
    loginMutation,
    registerMutation,
    logoutMutation,
    verifyEmailMutation,
    resendVerificationMutation,
    
    // 편의 메서드
    isLoggedIn: checkSessionQuery.data,
    isLoading: checkSessionQuery.isLoading,
    isError: checkSessionQuery.isError,
  };
};
