import { useCallback } from 'react';
import { 
  useCheckSessionQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  CheckSessionQuery,
  LoginMutation,
  RegisterMutation,
  LogoutMutation,
  User,
  LoginInput,
  RegisterInput
} from '../types/generated';

// Re-export generated types for convenience
export type { User, LoginInput, RegisterInput };

export const useUser = () => {
  const { data, loading: isLoading, error, refetch } = useCheckSessionQuery({
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  });

  const user = data?.checkSession?.user || null;
  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    refetch,
  };
};

export const useLogin = () => {
  const { execute: loginMutation, isLoading, isError, data } = useMutation<
    LoginResponse,
    { input: LoginInput }
  >(LOGIN);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const result = await loginMutation({ input: { email, password } });
        return result.data?.login?.user || null;
      } catch (error) {
        throw error;
      }
    },
    [loginMutation]
  );

  return {
    login,
    isLoading,
    isError,
    data: data?.data?.login?.user,
  };
};

export const useRegister = () => {
  const { execute: registerMutation, isLoading, isError, data } = useMutation<
    RegisterResponse,
    { input: RegisterInput }
  >(REGISTER);

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      try {
        const result = await registerMutation({ input: { email, password, name } });
        return result.data?.register || '';
      } catch (error) {
        throw error;
      }
    },
    [registerMutation]
  );

  return {
    register,
    isLoading,
    isError,
    data: data?.data?.register,
  };
};

export const useLogout = () => {
  const { execute: logoutMutation, isLoading, isError, data } = useMutation<
    LogoutResponse
  >(LOGOUT);

  const logout = useCallback(async () => {
    try {
      const result = await logoutMutation();
      return result.data?.logout || '';
    } catch (error) {
      throw error;
    }
  }, [logoutMutation]);

  return {
    logout,
    isLoading,
    isError,
    data: data?.data?.logout,
  };
};

// Combined auth hook for convenience
export const useAuth = () => {
  const { user, isAuthenticated, isLoading: userLoading, refetch } = useUser();
  const { login, isLoading: loginLoading } = useLogin();
  const { register, isLoading: registerLoading } = useRegister();
  const { logout, isLoading: logoutLoading } = useLogout();

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      const user = await login(email, password);
      if (user) {
        // 로그인 성공 후 사용자 정보 새로고침
        await refetch();
      }
      return user;
    },
    [login, refetch]
  );

  const handleLogout = useCallback(async () => {
    await logout();
    // 로그아웃 후 사용자 정보 새로고침
    await refetch();
  }, [logout, refetch]);

  return {
    user,
    isAuthenticated,
    isLoading: userLoading || loginLoading || registerLoading || logoutLoading,
    login: handleLogin,
    register,
    logout: handleLogout,
    refetch,
  };
};
