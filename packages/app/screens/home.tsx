import { TextLink } from "solito/link";
import Gradient from "ui/graident";
import { View } from "ui/view";

export function Home() {
  return (
    <View className="flex-1">
      <Gradient colors={["#ff0000", "#09e209", "#0000ff"]} name="홍길동" />
      <TextLink href="/artist/1">Artist</TextLink>
    </View>
  );
}
