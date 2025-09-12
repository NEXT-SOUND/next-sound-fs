import * as React from 'react';
import { authApi, User, useAuth as useAuthQuery } from "lib/api";
import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);

  // TanStack Query hooks 사용
  const {
    checkSessionQuery,
    loginMutation,
    registerMutation,
    logoutMutation,
    isLoggedIn,
    isLoading,
    isError,
  } = useAuthQuery();

  const checkAuth = async () => {
    // TanStack Query가 자동으로 세션을 확인하므로 별도 로직 불필요
    // 필요시 수동으로 refetch 가능
    checkSessionQuery.refetch();
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await loginMutation.mutateAsync({ email, password });
      setUser(response.user);
      toast.success("로그인에 성공했습니다!");
    } catch (error: any) {
      const message = error.response?.data?.message || "로그인에 실패했습니다.";
      toast.error(message);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await registerMutation.mutateAsync({
        email,
        password,
        name,
      });
      toast.success(
        response.message || "회원가입이 완료되었습니다. 이메일을 확인해주세요.",
      );
    } catch (error: any) {
      const message =
        error.response?.data?.message || "회원가입에 실패했습니다.";
      toast.error(message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      setUser(null);
      toast.success("로그아웃되었습니다.");
    } catch (error: any) {
      toast.error("로그아웃에 실패했습니다.");
    }
  };

  // 세션 상태에 따라 사용자 상태 업데이트
  React.useEffect(() => {
    if (isLoggedIn === false) {
      setUser(null);
    }
  }, [isLoggedIn]);

  const value: AuthContextType = {
    user,
    isLoading:
      isLoading ||
      loginMutation.isPending ||
      registerMutation.isPending ||
      logoutMutation.isPending,
    isAuthenticated: !!user && !!isLoggedIn,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};