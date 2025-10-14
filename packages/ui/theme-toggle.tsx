import { IS_WEB } from '@/utils/screen';
import { useColorScheme } from '@/utils/theme';
import { useEffect, useState } from 'react';
import Toggle from './toggle';

function ThemeToggle({ label = false }: { size?: number; label?: boolean }) {
  const { isDarkColorScheme, setColorScheme, toggleColorScheme } =
    useColorScheme();

  const [Icons, setIcons] = useState<{ Sun?: any; Moon?: any } | null>(null);
  useEffect(() => {
    try {
      if (IS_WEB) {
        const mod = require("lucide-react");
        setIcons({ Sun: mod.Sun, Moon: mod.Moon });
      } else {
        const mod = require("lucide-react-native");
        setIcons({ Sun: mod.Sun, Moon: mod.Moon });
      }
    } catch {
      setIcons(null);
    }
  }, []);

  const SunIcon = Icons?.Sun ? (
    <Icons.Sun size={16} color={isDarkColorScheme ? "#9ca3af" : "#111827"} />
  ) : (
    "☀️"
  );
  const MoonIcon = Icons?.Moon ? (
    <Icons.Moon size={16} color={isDarkColorScheme ? "#e5e7eb" : "#6b7280"} />
  ) : (
    "🌙"
  );

  const handleChange = (nextChecked: boolean) => {
    if (typeof toggleColorScheme === "function") {
      toggleColorScheme();
      return;
    }
    setColorScheme(nextChecked ? "dark" : "light");
  };

  return (
    <Toggle
      checked={isDarkColorScheme}
      onChange={handleChange}
      size="md"
      label={label ? (isDarkColorScheme ? "Dark" : "Light") : false}
      leftIcon={SunIcon}
      rightIcon={MoonIcon}
    />
  );
}

export default ThemeToggle;
