import Carousel from "react-multi-carousel";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
    partialVisible:true
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    partialVisible:true
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    partialVisible:true
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items:1,
    partialVisible:true
  }
};

type IAppCarousel = {
  children: React.ReactNode;
}

export const AppCarousel = (props: IAppCarousel) => {
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      arrows={false}
      responsive={responsive}
      autoPlay={false} // 啟用自動輪播
      autoPlaySpeed={3000} // 自動輪播速度（毫秒）
      infinite={true} // 啟用無限循環
      // removeArrowOnDeviceType={[]} // 在所有设备上都移除箭头
      // ssr={true} // means to render carousel on server-side.
      // autoPlay={this.props.deviceType !== "mobile" ? true : false}
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
