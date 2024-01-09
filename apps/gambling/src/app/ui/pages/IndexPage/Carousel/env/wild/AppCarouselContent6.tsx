import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../reduxStore";
import {appSlice} from "../../../../../../reduxStore/appSlice";

import useBreakpoint from "../../../../../pageTemplate/hooks/useBreakpoint";
import {PageOrModalPathEnum} from "../../../../../PageOrModalPathEnum";
import {environment} from "../../../../../../../environments/environment";
import {usePageNavigate} from "../../../../../router/hooks/usePageNavigate";
import cx from "classnames";
import {CarouselContainer} from "../../CarouselContainer";
import {IAppCarouselContent} from "../../types";

export const AppCarouselContent6= (props: IAppCarouselContent) => {
  const {isMobile} = useBreakpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLogin, isShowLoginModal} = useSelector((state: RootState) => state.app)
  const {onClickToFirstDeposit} = usePageNavigate();
  return (
    <CarouselContainer isMoving={props.isMoving} className={"text-[22.5px] font-[Heebo] text-white"}>
      {isMobile ? (
        <div
          onClick={() => {
            onClickToFirstDeposit();
          }}
        >
          <p className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-4 italic font-bold text-2xl md:text-3xl text-left">
            <span>Convide Amigos A maior recompensa para<br/>uma pessoa é R$20</span>
          </p>
          <img
            src={`assets/${environment.uVersion}/h5_banner_6.jpeg`}
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
          <p
            className={cx("absolute top-1/2 transform -translate-y-1/2",
              "pl-4",
              "italic font-bold text-6xl text-left"
            )}
          >
            <span>Convide Amigos A maior recompensa para<br/>uma pessoa é R$20</span>
          </p>
          <img
            src={`assets/${environment.uVersion}/banner6.jpeg`}
            // className="rounded-box"
          />
        </div>
      )}
    </CarouselContainer>
  )
}


