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

export const AppCarouselContent2 = () => {
  const {isMobile} = useBreakpoint();
  const {onClickToDepositCashback} = usePageNavigate();

  return (
    <CarouselContainer
      className={"text-[22.5px] text-white"}
      onClickBanner={() => {
        onClickToDepositCashback();
      }}
    >
      {isMobile ? (
        <div
        >
          <p className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-4 font-bold text-2xl md:text-3xl text-left">
            Benefícios-ofertasde deposito<br/>Ate 10% bônus
          </p>
          <img
            src={`assets/${environment.assetPrefix}/h5_banner_1.png`}
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
            Benefícios-ofertasde deposito<br/>Ate 10% bônus
          </Container>
          <img
            src={`assets/${environment.assetPrefix}/banner_1.png`}
          />
        </div>
      )}
    </CarouselContainer>
  )
}


