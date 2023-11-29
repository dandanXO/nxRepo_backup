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

export const AppCarouselContent4 = (props: IAppCarouselContent) => {
  const {isMobile} = useBreakpoint();
  const {onClickToVipGrade} = usePageNavigate();

  return (
    <CarouselContainer
      isMoving={props.isMoving}
      className={"text-[22.5px] text-white"}
      onClickBanner={(event) => {
        onClickToVipGrade();
      }}
    >
      {isMobile ? (
        <div
        >
          <p className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-4 font-bold text-2xl md:text-3xl text-left">
            Prêmio upgrade VIP<br/> Só esperando você coletar!
          </p>
          <img
            className={"w-[100vw]"}
            src={`assets/${environment.assetPrefix}/h5_banner_4.png`}
          />
        </div>
      ) : (
        <div
          className="banner w-screen"
        >
          <Container
            className={cx("absolute top-1/2 transform -translate-y-1/2",
              "pl-4",
              "font-bold text-6xl text-left"
            )}
          >
            Prêmio upgrade VIP<br/> Só esperando você coletar!
          </Container>
          <img
            className={"w-[100vw]"}
            src={`assets/${environment.assetPrefix}/banner_4.png`}
          />
        </div>
      )}
    </CarouselContainer>
  )
}


