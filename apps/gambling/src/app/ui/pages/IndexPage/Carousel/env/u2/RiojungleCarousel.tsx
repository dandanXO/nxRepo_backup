// https://react-multi-carousel.surge.sh/
import Carousel, { ArrowProps, StateCallBack } from "react-multi-carousel";


import cx from "classnames";
import useBreakpoint from "../../../../../pageTemplate/hooks/useBreakpoint";
import { environment } from "../../../../../../../environments/environment";
import {tailwindVariables} from "../../../../../../../environments/tailwind.variables";

const mobilePoint = parseInt(tailwindVariables.theme.screens.mobile.replace("px", ""));
const tabletPoint = parseInt(tailwindVariables.theme.screens.tablet.replace("px", ""));
const desktopPoint = parseInt(tailwindVariables.theme.screens.desktop.replace("px", ""));

const responsive = {
  desktop: {
    breakpoint: { min: tabletPoint, max: 9999999999 },
    items: 3,
    partialVisible:true,
    partialVisibilityGutter: 20
    // partialVisible: false,
  },
  tablet: {
    breakpoint: { min: mobilePoint, max: tabletPoint },
    items: 2,
    partialVisible:true,
    partialVisibilityGutter: 20
    // partialVisible: false,
  },
  mobile: {
    breakpoint: { min: 0, max: mobilePoint },
    items: 1,
    partialVisible:true,
    // partialVisible: false,
  }
};


const CustomLeftArrow = ({ onClick }: ArrowProps) => (
  <button onClick={onClick} className='absolute top-1/2 -translate-y-[50%] left-0 px-[10px] py-[30px] text-white bg-[rgba(0,0,0,0.5)] border border-[var(--grayscale-30)] rounded'>
    <img alt='arrowLeft' className='w-5' src={`assets/${environment.uVersion}/ArrowLeft.png`}/>
  </button>
)

const CustomRightArrow = ({ onClick }: ArrowProps) => (
  <button onClick={onClick} className='absolute top-1/2 -translate-y-[50%] right-0 px-[10px] py-[30px] text-white bg-[rgba(0,0,0,0.5)] border border-[var(--grayscale-30)] rounded'>
    <img alt='arrowLeft' className='w-5' src={`assets/${environment.uVersion}/ArrowRight.png`}/>
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
        removeArrowOnDeviceType={['mobile']}
      >
        {props.children}
      </Carousel>
    </div>
  )

}
