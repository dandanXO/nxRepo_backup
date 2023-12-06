import {environment} from "../../../../../../../environments/environment";
import cx from "classnames";
import {Container} from "../../../../../components/container/Container";
import useBreakpoint from "../../../../../hooks/useBreakpoint";

type ICarouselSubTitle = {
  children: React.ReactNode;
}
export const CarouselTitleSection = (props: ICarouselSubTitle) => {
  const {isMobile} = useBreakpoint();
  return (
    <Container
      className={cx("absolute transform -translate-y-1/2",
        "top-1/2",
        "leading-none"
      )}
    >
      <div className={cx("text-left",
          // "mb-[10px] sm:mb-[8px] md:mb-[26px]",
          "mb-[8px] sm:mb-[8px] md:mb-[20px] lg:mb-[20px]",
          "text-xs sm:text-xs md:text-xl lg:text-2xl",
          "font-normal sm:font-bold"
        )}>
        <div>{environment.platformName} ({environment.platformGroup}) <span className={"hidden lg:block"}>merece a sua confiança</span></div>
        {isMobile && (<div>merece a sua confiança</div>)}
        {!isMobile && <div className={"none md:block"}>O usuário é o primeiro, o jogo é justo e os fundos estão seguros</div>}
      </div>

      <div className={cx("text-left",
        "text-base sm:text-base md:text-3xl lg:text-7xl",
        "font-normal sm:font-bold"
      )}>
        {props.children}
      </div>
    </Container>
  )
}
