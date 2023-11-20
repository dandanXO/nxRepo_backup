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

export const AppCarouselContent = () => {
  const {isMobile} = useBreakpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLogin, isShowLoginModal} = useSelector((state: RootState) => state.app)
  const {onClickToFirstDeposit} = usePageNavigate();
  return (
    <CarouselContainer className={"text-[22.5px] font-[Heebo] text-white"}>
      {isMobile ? (
        <div
          onClick={() => {
            onClickToFirstDeposit();
          }}
        >
          {/*<p className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-4 italic font-bold text-2xl md:text-3xl text-left">*/}
          {/*  Primeiro depósito <br/> + bônus de 20%*/}
          {/*</p>*/}
          <img
              src={`assets/${environment.assetPrefix}/h5_banner_1.png`}
          />
        </div>
      ) : (
        <div
          className="banner w-screen"
          onClick={() => {
            onClickToFirstDeposit();
          }}
          // style={{ display: 'flex',justifyContent: 'center' }}
        >
          {/*<p*/}
          {/*  className={cx("absolute top-1/2 transform -translate-y-1/2",*/}
          {/*    "pl-4",*/}
          {/*    "italic font-bold text-6xl text-left"*/}
          {/*  )}*/}
          {/*>*/}
          {/*  Primeiro depósito <br/> bônus de 20%*/}
          {/*</p>*/}
          <img
            src={`assets/${environment.assetPrefix}/banner1.png`}
            // className="rounded-box"
          />
        </div>
      )}
      </CarouselContainer>
  )
}


