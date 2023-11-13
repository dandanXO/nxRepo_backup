import useBreakpoint from "../../../../hooks/useBreakpoint";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../reduxStore";
import {usePageNavigate} from "../../../../hooks/usePageNavigate";
import {environment} from "../../../../../../environments/environment";
import {appSlice} from "../../../../../reduxStore/appSlice";
import {PageOrModalPathEnum} from "../../../../PageOrModalPathEnum";

export const CocoAppCarouselContent2 = () => {
  const {isMobile} = useBreakpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLogin, isShowLoginModal} = useSelector((state: RootState) => state.app)
  const {onClickToDepositCashback} = usePageNavigate();
  return (
    <>

      {isMobile ? (
        <div onClick={() => {
          onClickToDepositCashback();
        }}>
          <p className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-4 italic font-bold text-3xl text-left"
             style={{
               WebkitTextStroke: '1px black',
               WebkitTextFillColor: 'white'
             }}>
            Benefícios-ofertasde deposito<br/>Ate 10% bônus
          </p>
          <img src={`assets/${environment.assetPrefix}/h5_banner_2.jpeg`}/>
        </div>
      ) : (
        <div className={"w-[calc(88.6vw-265px)]"} onClick={() => {
          onClickToDepositCashback();
        }} style={{display: 'flex', justifyContent: 'center'}}>
          <p className="absolute left-28 top-1/2 transform -translate-y-1/2 pl-4 italic font-bold text-6xl text-left"
             style={{
               WebkitTextStroke: '2.5px black',
               WebkitTextFillColor: 'white'
             }}>
            Benefícios-ofertasde deposito<br/>Ate 10% bônus
          </p>
          <img src={`assets/${environment.assetPrefix}/banner2.jpeg`} className="rounded-box"
               style={{display: 'block', borderRadius: '10px'}}/>
        </div>
      )}


    </>
  )

}
