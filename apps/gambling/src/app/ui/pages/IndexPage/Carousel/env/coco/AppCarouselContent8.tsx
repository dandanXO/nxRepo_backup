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

export const AppCarouselContent8= () => {
  const {isMobile} = useBreakpoint();
  const {onClickToFirstDeposit} = usePageNavigate();

  return (
    <CarouselContainer
      className={"text-[22.5px] text-white"}
      onClickBanner={() => {
        onClickToFirstDeposit();
      }}
    >
      {isMobile ? (
        <div
        >
          <p className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-4 font-bold text-2xl md:text-3xl text-left">
            <span>Convide Amigos A maior recompensa para<br/>uma pessoa é R$20</span>
          </p>
          <img
            src={`assets/${environment.assetPrefix}/h5_banner_8.png`}
          />
        </div>
      ) : (
        <div
          className="banner w-screen"
          // style={{ display: 'flex',justifyContent: 'center' }}
        >
          <p
            className={cx("absolute top-1/2 transform -translate-y-1/2",
              "pl-4",
              "font-bold text-6xl text-left"
            )}
          >
            <span>Convide Amigos A maior recompensa para<br/>uma pessoa é R$20</span>
          </p>
          <img
            src={`assets/${environment.assetPrefix}/banner_8.png`}
          />
        </div>
      )}
    </CarouselContainer>
  )
}

