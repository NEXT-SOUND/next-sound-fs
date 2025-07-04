import * as React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, LogIn } from 'lucide-react';

const AuthButton = () => {
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-muted animate-pulse rounded-full" />
        <div className="w-20 h-4 bg-muted animate-pulse rounded" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="flex items-center space-x-1 px-3 py-2 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>로그아웃</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Link 
        href="/auth/login"
        className="flex items-center space-x-1 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        <LogIn className="w-4 h-4" />
        <span>로그인</span>
      </Link>
      
      <Link 
        href="/auth/register"
        className="flex items-center space-x-1 px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
      >
        <User className="w-4 h-4" />
        <span>회원가입</span>
      </Link>
    </div>
  );
};

export default AuthButton;