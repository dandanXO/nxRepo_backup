import useBreakpoint from "../../../../hooks/useBreakpoint";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../reduxStore";
import {usePageNavigate} from "../../../../hooks/usePageNavigate";
import {environment} from "../../../../../../environments/environment";
import {PageOrModalPathEnum} from "../../../../PageOrModalPathEnum";

export const CocoAppCarouselContent4 = () => {
  const {isMobile} = useBreakpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLogin, isShowLoginModal} = useSelector((state: RootState) => state.app)
  const {onClickToVipGrade} = usePageNavigate();
  return (
    <div className={"text-[22.5px] font-[Heebo]"}>
      {isMobile ? (
        <div onClick={() => {
          onClickToVipGrade();
        }}>
          <img src={`assets/${environment.assetPrefix}/h5_banner_4.jpeg`}/>
        </div>
      ) : (
        <div className={'w-[calc(88.6vw-265px)]'} onClick={() => {
          onClickToVipGrade();
        }}>
          <img src={`assets/${environment.assetPrefix}/banner4.jpeg`} className="rounded-box"
               style={{display: 'block', borderRadius: '10px'}}/>
        </div>
      )}
    </div>
  )
}
