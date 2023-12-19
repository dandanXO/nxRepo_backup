import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../reduxStore";
import {appSlice} from "../../../../../../reduxStore/appSlice";

import useBreakpoint from "../../../../../hooks/useBreakpoint";
import {PageOrModalPathEnum} from "../../../../../PageOrModalPathEnum";
import {environment} from "../../../../../../../environments/environment";
import {usePageNavigate} from "../../../../../hooks/usePageNavigate";
import cx from "classnames";
import {CarouselContainer} from "../../CarouselContainer";
import {Container} from "../../../../../components/container/Container";
import {IAppCarouselContent} from "../../types";
import {CarouselTitle} from "./CarouselTitle";
import {CarouselImage} from "./CarouselImage";
import {CarouselTitleSection} from "./CarouselTitleSection";


export const AppCarouselContent = (props: IAppCarouselContent) => {
  const {isMobile, } = useBreakpoint();
  const {onClickToFirstDeposit} = usePageNavigate();

  return (
    <CarouselContainer
      isMoving={props.isMoving}
      className={"text-[22.5px] text-white"}
      onClickBanner={(event) => {
        onClickToFirstDeposit();
      }}
    >
      <div className={""}>
        <CarouselTitleSection className={"sm:top-[45%] md:top-[35%]"}>
          Prêmio upgrade VIP
          <br/>
          Só esperando você coletar!
        </CarouselTitleSection>

        {isMobile ? (
          <CarouselImage alt={"h5_banner_2"} src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/h5_banner_2.png`}/>
        ): (
          <CarouselImage alt={"banner_2"} src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/banner_2.png`}/>
        )}

        <Container
          className={cx("absolute top-[74%] transform -translate-y-1/2",
          )}
        >
          <div className="w-full bg-[rgba(255,255,255,0.5)] px-3 md:px-3 md:py-2 xl:px-4 xl:py-3 flex flex-row justify-center items-start rounded-lg">
            <div className="text-lg md:text-3xl xl:text-6xl font-bold leading-7 md:leading-9 xl:leading-none text-white">
              VIP0 Pode Retirar
            </div>
          </div>
        </Container>
      </div>
    </CarouselContainer>
  )
}


