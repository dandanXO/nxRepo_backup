type ICarouselImage = {
  src: string;
  alt: string;
}
export const CarouselImage = (props: ICarouselImage) => {
  return (
    <div className='rounded-lg border border-[#4D4D4D] overflow-hidden'>
      <img
        alt={props.alt}
        className={"w-[100vw]"}
        src={props.src}
      />
    </div>
  )
}
