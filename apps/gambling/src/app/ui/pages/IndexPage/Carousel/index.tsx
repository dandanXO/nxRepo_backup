// https://react-multi-carousel.surge.sh/
import Carousel, {StateCallBack} from "react-multi-carousel";
import "./style.scss";

import useBreakpoint from "../../../hooks/useBreakpoint";
import cx from "classnames";
import {renderByPlatform} from "../../../utils/renderByPlatform";
import {AppCarousel as RiojungleAppCarousel} from "./env/riojungle/RiojungleCarousel"

// const responsive = {
//   superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 3000 },
//     items: 1,
//     partialVisible:true
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 1,
//     partialVisible:true
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 1,
//     partialVisible:true
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items:1,
//     partialVisible:true
//   }
// };


const responsive = {
  superLargeDesktop: {
    breakpoint: { min: 1024, max: 999999},
    items: 1,
    partialVisible: true,
    // partialVisible: false,
  },
  desktop: {
    breakpoint: { min: 768, max: 1024 },
    items: 1,
    partialVisible:true
    // partialVisible: false,
  },
  tablet: {
    breakpoint: { min: 640, max: 768 },
    items: 1,
    partialVisible:true
    // partialVisible: false,
  },
  mobile: {
    breakpoint: { min: 0, max: 640 },
    items: 1,
    partialVisible:true
    // partialVisible: false,
  }
};


type IAppCarousel = {
  children: React.ReactNode;
  setIsMoving: (isMoving: boolean) => void;
}

const CocoAppCarousel = (props: IAppCarousel) => {
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
        showDots={true}
        arrows={!isMobile}
        responsive={responsive}
        autoPlay={true}
        // autoPlay={false}
        autoPlaySpeed={3000}
        // transitionDuration={500}
        infinite={true}
        // renderDotsOutside={true}
        // deviceType={"mobile"}
        // deviceType={deviceType}
        removeArrowOnDeviceType={[]} // 在所有设备上都移除箭头
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        // ssr={true} // means to render carousel on server-side.
        customTransition={`transform ${TransitionDuration}s ease-in-out`}
        transitionDuration={TransitionDuration * 1000}
        keyBoardControl={false}

        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        beforeChange={() => props.setIsMoving && props.setIsMoving(true)}
        afterChange={() => props.setIsMoving && props.setIsMoving(false)}
      >
        {props.children}
      </Carousel>
    </div>
  )

}

export const AppCarousel = (props: IAppCarousel) => {
  return renderByPlatform({
    "wild777bet": <CocoAppCarousel {...props}/>,
    "coco777bet": <CocoAppCarousel {...props}/>,
    "riojungle777bet": <RiojungleAppCarousel {...props}/>,
  }, CocoAppCarousel)
}
