import { twMerge } from "tailwind-merge";
import useBreakpoint from "../../../../../pageTemplate/hooks/useBreakpoint";

type ICarouselImage = {
  genieSrc?: string;
  src: string;
  alt: string;
}
export const CarouselImage = (props: ICarouselImage) => {

  const { isDesktop } = useBreakpoint();

  return (
    <div className='relative rounded-lg border border-[var(--grayscale-30)] overflow-hidden'>
      <img
        alt={props.alt}
        className={"w-[100vw]"}
        src={props.src}
      />
      <img alt='genie' className={twMerge('duration-300 absolute right-0 top-0 h-full', isDesktop && 'group-hover:scale-125', !isDesktop && 'group-active:scale-125')} src={props.genieSrc} />
    </div>
  )
}
