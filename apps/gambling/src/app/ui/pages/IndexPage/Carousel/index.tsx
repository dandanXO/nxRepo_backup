// https://react-multi-carousel.surge.sh/
import Carousel from "react-multi-carousel";
import useBreakpoint from "../../../hooks/useBreakpoint";

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
}

export const AppCarousel = (props: IAppCarousel) => {
  const {isMobile} = useBreakpoint();
  return (
    <Carousel
      showDots={true}
      arrows={false}
      responsive={responsive}
      // autoPlay={false}
      autoPlay={true}
      autoPlaySpeed={3000}
      infinite={true}
      // removeArrowOnDeviceType={[]} // 在所有设备上都移除箭头
      // ssr={true} // means to render carousel on server-side.
      customTransition="transform 1s ease-in-out"
      keyBoardControl={true}
      // transitionDuration={500}
      containerClass="carousel-container"
      // removeArrowOnDeviceType={["tablet", "mobile"]}
      // deviceType={this.props.deviceType}
      // deviceType={"mobile"}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {props.children}
    </Carousel>
  )

}
