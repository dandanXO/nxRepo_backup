import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../reduxStore";
import {appSlice} from "../../../../../reduxStore/appSlice";

import useBreakpoint from "../../../../hooks/useBreakpoint";
import {PageOrModalPathEnum} from "../../../../PageOrModalPathEnum";
import {environment} from "../../../../../../environments/environment";
import {usePageNavigate} from "../../../../hooks/usePageNavigate";

export const CocoAppCarouselContent = () => {
  const {isMobile} = useBreakpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLogin, isShowLoginModal} = useSelector((state: RootState) => state.app)
  const {onClickToFirstDeposit} = usePageNavigate();
  return (
    <div className={"text-[22.5px] font-[Heebo]"}>
      {isMobile ? (
        <div
          onClick={() => {
            onClickToFirstDeposit();
          }}
        >
          <p className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-4 italic font-bold text-3xl text-left text-white" >
            Primeiro depósito <br/> + bônus de 20%
          </p>
          <img
              src={`assets/${environment.assetPrefix}/h5_banner_1.jpeg`}
          />
        </div>
      ) : (
        <div className="w-[calc(88.6vw-265px)]" onClick={() => {
          onClickToFirstDeposit();
        }} style={{ display: 'flex',justifyContent: 'center' }}>
          <p className="absolute top-1/2 transform -translate-y-1/2 pl-4 italic font-bold text-6xl text-left">
            Primeiro depósito <br/> bônus de 20%
          </p>
          <img src={`assets/${environment.assetPrefix}/banner1.jpeg`} className="rounded-box" style={{ display: 'block', borderRadius: '10px' }}/>
        </div>
      )}
      </div>
  )
}


