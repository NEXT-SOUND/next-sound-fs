import * as React from 'react';
import { useRouter } from 'expo-router';
import { LoginScreen } from 'app/screens/auth/login';

const LoginPage = () => {
  const router = useRouter();
  
  // Mock auth functions - replace with actual auth implementation
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Implement actual login logic here
      console.log('Login attempt:', { email, password });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to home screen after successful login
      router.replace('/(tabs)/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToRegister = () => {
    router.push('/auth/register');
  };

  const handleNavigateToForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  return (
    <LoginScreen
      onLogin={handleLogin}
      onNavigateToRegister={handleNavigateToRegister}
      onNavigateToForgotPassword={handleNavigateToForgotPassword}
      isLoading={isLoading}
      isWeb={false}
    />
  );
};

export default LoginPage;