type ICarouselImage = {
  src: string;
  alt: string;
}
export const CarouselImage = (props: ICarouselImage) => {
  return (
    <img
      alt={props.alt}
      className={"w-[100vw]"}
      src={props.src}
    />
  )
}
