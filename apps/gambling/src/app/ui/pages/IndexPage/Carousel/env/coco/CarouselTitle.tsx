import cx from "classnames";
import {Container} from "../../../../../components/container/Container";
import useBreakpoint from "../../../../../hooks/useBreakpoint";

export type ICarouselTitle = {
  children: React.ReactNode;
}
export const CarouselTitle = (props: ICarouselTitle) => {
  const {isMobile} = useBreakpoint();
  if(isMobile) {
    return (
      <p className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-4 font-bold text-2xl md:text-3xl text-left">
        {props.children}
      </p>
    )
  }
  return (
    <Container
      className={cx("absolute top-1/2 transform -translate-y-1/2",
        "font-bold text-7xl text-left"
      )}
    >
      {props.children}
    </Container>
  )
}
