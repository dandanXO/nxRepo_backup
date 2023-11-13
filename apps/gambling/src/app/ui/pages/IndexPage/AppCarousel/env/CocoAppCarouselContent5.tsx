import useBreakpoint from "../../../../hooks/useBreakpoint";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../reduxStore";
import {usePageNavigate} from "../../../../hooks/usePageNavigate";
import {environment} from "../../../../../../environments/environment";
import {appSlice} from "../../../../../reduxStore/appSlice";
import {PageOrModalPathEnum} from "../../../../PageOrModalPathEnum";

export const CocoAppCarouselContent5 = () => {
  const {isMobile} = useBreakpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLogin, isShowLoginModal} = useSelector((state: RootState) => state.app)
  const {onClickToCheckInDaily} = usePageNavigate();
  return (
    <div className={"text-[22.5px] font-[Heebo]"}>
      {isMobile ? (
        <div onClick={() => {
          onClickToCheckInDaily();
        }}>
          <p
            className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-4 italic font-bold text-white text-2xl text-left">
            <span>Convide Amigos A maior recompensa para<br/>uma pessoa é R$20</span>
          </p>
          <img src={`assets/${environment.assetPrefix}/h5_banner_5.jpeg`}/>
        </div>
      ) : (
        <div className={"w-[calc(88.6vw-265px)]"} onClick={() => {
          onClickToCheckInDaily();
        }}>
          <p className="absolute left-28 top-1/2 transform -translate-y-1/2 pl-4 italic font-bold text-6xl text-left">
            <span>Convide Amigos A maior recompensa para<br/>uma pessoa é R$20</span>
          </p>
          <img src={`assets/${environment.assetPrefix}/banner5.jpeg`} className="rounded-box"
               style={{display: 'block', borderRadius: '10px'}}/>
        </div>
      )}
    </div>
  )

}
