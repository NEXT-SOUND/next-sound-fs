import { TextLink } from "solito/link";
import Gradient from "ui/gradient/gradient";
import { Text } from "ui/text";
import { View } from "ui/view";
import { SCREEN_WIDTH } from "utils/screen";

export function Home() {
  return (
    <View className="flex-1 bg-background">
      <Gradient
        colors={["#c59090", "#09e209", "#0000ff"]}
        width={SCREEN_WIDTH}
        height={300}
      />
      <TextLink href="/artist/1">Artist</TextLink>
    </View>
  );
}
