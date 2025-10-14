import ThemeToggle from '@/ui/theme-toggle';
import { View } from '@/ui/view';

const AuthPageHeader = () => {
  return (
    <View className="flex flex-row gap-2 p-4 justify-end">
      <ThemeToggle />
    </View>
  );
};

export default AuthPageHeader;