// https://react-multi-carousel.surge.sh/
import Carousel, { ArrowProps, StateCallBack } from "react-multi-carousel";


import cx from "classnames";
import useBreakpoint from "../../../../../hooks/useBreakpoint";
import { environment } from "../../../../../../../environments/environment";

const responsive = {
  superLargeDesktop: {
    breakpoint: { min: 1024, max: 999999},
    items: 3,
    partialVisible: true,
    partialVisibilityGutter: 20
    // partialVisible: false,
  },
  desktop: {
    breakpoint: { min: 768, max: 1024 },
    items: 3,
    partialVisible:true,
    partialVisibilityGutter: 20
    // partialVisible: false,
  },
  tablet: {
    breakpoint: { min: 640, max: 768 },
    items: 2,
    partialVisible:true,
    partialVisibilityGutter: 20
    // partialVisible: false,
  },
  mobile: {
    breakpoint: { min: 0, max: 640 },
    items: 1,
    partialVisible:true,
    // partialVisible: false,
  }
};


const CustomLeftArrow = ({ onClick }: ArrowProps) => (
  <button onClick={onClick} className='absolute top-1/2 -translate-y-[50%] left-0 px-[10px] py-[30px] text-white bg-[rgba(0,0,0,0.5)] border border-[#4D4D4D] rounded'>
    <img alt='arrowLeft' className='w-5' src={`assets/${environment.assetPrefix}/ArrowLeft.png`}/>
  </button>
)

const CustomRightArrow = ({ onClick }: ArrowProps) => (
  <button onClick={onClick} className='absolute top-1/2 -translate-y-[50%] right-0 px-[10px] py-[30px] text-white bg-[rgba(0,0,0,0.5)] border border-[#4D4D4D] rounded'>
    <img alt='arrowLeft' className='w-5' src={`assets/${environment.assetPrefix}/ArrowRight.png`}/>
  </button>
)


type IAppCarousel = {
  children: React.ReactNode;
  setIsMoving: (isMoving: boolean) => void;
}

export const AppCarousel = (props: IAppCarousel) => {
  const {isMobile} = useBreakpoint();
  const TransitionDuration = 0.3

  return (
    <div className={cx({
      "isdesktop": !isMobile,
      "ismobile": isMobile
    })}>
      <Carousel
        // customDot={<div className={"bg-red w-[30px] h-[20px]"}/>}
        swipeable={true}
        draggable={true}
        showDots={false}
        arrows={true}
        responsive={responsive}
        autoPlay={true}
        // autoPlay={false}
        autoPlaySpeed={3000}
        // transitionDuration={500}
        infinite={true}
        // renderDotsOutside={true}
        // deviceType={"mobile"}
        // deviceType={deviceType}
        // removeArrowOnDeviceType={[]} // 在所有设备上都移除箭头
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        // ssr={true} // means to render carousel on server-side.
        customTransition={`transform ${TransitionDuration}s ease-in-out`}
        transitionDuration={TransitionDuration * 1000}
        keyBoardControl={false}
        partialVisbile={true}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass={isMobile?'':"image-item"}
        beforeChange={() => props.setIsMoving && props.setIsMoving(true)}
        afterChange={() => props.setIsMoving && props.setIsMoving(false)}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {props.children}
      </Carousel>
    </div>
  )

}
