import { TextLink } from "solito/link";
import Gradient from "ui/gradient";
import { Text } from "ui/text";
import { View } from "ui/view";
import { SCREEN_WIDTH, useWindowSize } from "utils/screen";

export function Home() {
  const { width } = useWindowSize();

  return (
    <View className="flex-1 bg-background">
      <Gradient
        colors={["#c59090", "#09e209", "#0000ff"]}
        width={width}
        height={300}
      />
      <TextLink href="/artist/1">{width}</TextLink>
    </View>
  );
}
