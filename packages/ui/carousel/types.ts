export interface CarouselProps<T> {
  data: T[];
  renderItem: ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => React.ReactNode;
}
