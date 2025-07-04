import { Link, TextLink } from "solito/link";
import Gradient from "components/gradient";
import { Text } from "@/ui/text";
import { View } from "ui/view";
import { SCREEN_WIDTH, useWindowSize } from "utils/screen";

export function Home() {
  const { width } = useWindowSize();

  return (
    <View className="flex-1 bg-background" edges={["top"]}>
      <View className="px-4 py-8">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-foreground mb-2">
            환영합니다!
          </Text>
          <Text className="text-muted-foreground">
            음악과 함께하는 여정을 시작하세요
          </Text>
        </View>
        
        <View className="space-y-4">
          <Link href="/artist/1">
            <Text className="text-primary hover:underline">아티스트 페이지로 이동</Text>
          </Link>
          
          <Link href="/auth/login">
            <Text className="text-primary hover:underline">로그인</Text>
          </Link>
          
          <Link href="/auth/register">
            <Text className="text-primary hover:underline">회원가입</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
