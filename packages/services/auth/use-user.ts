import { useCallback } from 'react';
import {
  LoginInput,
  RegisterInput,
  useCheckSessionQuery,
  useLoginMutation,
  useLogoutMutation,
  User,
  useRegisterMutation,
} from "../types/generated";

// Re-export generated types for convenience
export type { LoginInput, RegisterInput, User };

export const useLogin = () => {
  const {
    execute: loginMutation,
    isLoading,
    isError,
    data,
  } = useLoginMutation();

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await loginMutation({ input: { email, password } });
      return result.data?.login?.user || null;
    },
    [loginMutation],
  );

  return {
    login,
    isLoading,
    isError,
    data: data?.data?.login?.user,
  };
};

export const useRegister = () => {
  const {
    execute: registerMutation,
    isLoading,
    isError,
    data,
  } = useRegisterMutation();

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      const result = await registerMutation({
        input: { email, password, name },
      });
      return result.data?.register || "";
    },
    [registerMutation],
  );

  return {
    register,
    isLoading,
    isError,
    data: data?.data?.register,
  };
};

export const useLogout = () => {
  const {
    execute: logoutMutation,
    isLoading,
    isError,
    data,
  } = useLogoutMutation();

  const logout = useCallback(async () => {
    const result = await logoutMutation();
    return result.data?.logout || "";
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
  const { data, isLoading: userLoading, refetch } = useCheckSessionQuery();
  const user = data?.data?.checkSession?.user || null;
  const isAuthenticated = !!user;
  const { login, isLoading: loginLoading } = useLogin();
  const { register, isLoading: registerLoading } = useRegister();
  const { logout, isLoading: logoutLoading } = useLogout();

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      const user = await login(email, password);
      if (user) {
        await refetch();
      }
      return user;
    },
    [login, refetch],
  );

  const handleLogout = useCallback(async () => {
    await logout();
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
