import React from "react";
import Gradient from "ui/graident";
import { View } from "ui/view";

export function ArtistInfo() {
  return (
    <View className="flex-1">
      <Gradient
        className="hidden"
        colors={["#c59090", "#09e209", "#0000ff"]}
        name="홍길동"
      />
    </View>
  );
}
