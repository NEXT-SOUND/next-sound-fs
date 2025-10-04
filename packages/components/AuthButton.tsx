import * as React from 'react';
import { Link } from 'solito/link';
import { Text } from '@/ui/text';
import { View } from 'ui/view';
import { Button } from '@/ui/button';

// 이 컴포넌트는 현재 웹 전용이므로 useAuth hook을 직접 사용할 수 없습니다.
// 실제 프로젝트에서는 auth context를 packages/app에서 정의하거나
// props로 auth 상태를 전달받아야 합니다.

interface AuthButtonProps {
  user?: {
    name: string;
    email: string;
  } | null;
  isAuthenticated?: boolean;
  isLoading?: boolean;
  onLogout?: () => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  user,
  isAuthenticated = false,
  isLoading = false,
  onLogout
}) => {
  if (isLoading) {
    return (
      <View className="flex-row items-center space-x-2">
        <View className="w-8 h-8 bg-muted animate-pulse rounded-full" />
        <View className="w-20 h-4 bg-muted animate-pulse rounded" />
      </View>
    );
  }

  if (isAuthenticated && user) {
    return (
      <View className="flex-row items-center space-x-4">
        <View className="flex-row items-center space-x-2">
          <View className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Text className="text-primary-foreground text-xs font-bold">
              {user.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View className="flex-col">
            <Text className="text-sm font-medium text-foreground">{user.name}</Text>
            <Text className="text-xs text-muted-foreground">{user.email}</Text>
          </View>
        </View>
        
        <Button
          onPress={onLogout}
          variant="secondary"
          size="sm"
        >
          로그아웃
        </Button>
      </View>
    );
  }

  return (
    <View className="flex-row items-center space-x-2">
      <Link href="/auth/login">
        <Button variant="default" size="sm">
          로그인
        </Button>
      </Link>
      
      <Link href="/auth/register">
        <Button variant="secondary" size="sm">
          회원가입
        </Button>
      </Link>
    </View>
  );
};

export default AuthButton;