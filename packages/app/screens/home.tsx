import { Link, TextLink } from "solito/link";
import Gradient from "ui/gradient";
import { Text } from "ui/text";
import { View } from "ui/view";
import { SCREEN_WIDTH, useWindowSize } from "utils/screen";

export function Home() {
  const { width } = useWindowSize();

  return (
    <View className="flex-1 bg-background" edges={["top"]}>
      <Link href="/artist/1">
        <Text className="text-white">go to artist</Text>
      </Link>
    </View>
  );
}
