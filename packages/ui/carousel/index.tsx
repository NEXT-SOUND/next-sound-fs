import { View } from "moti";
import { CarouselProps } from "./types";

const Carousel = <T,>({ data, renderItem }: CarouselProps<T>) => {
  return (
    <View>
      {data.map((item, index) => (
        <View key={index}>{renderItem({ item, index })}</View>
      ))}
    </View>
  );
};

export { Carousel };
