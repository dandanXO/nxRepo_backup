import {useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../reduxStore";
import {usePageNavigate} from "../../../../router/hooks/usePageNavigate";
import {MobileMenuLink} from "../../components/MobileMenuLink";
import {CocoAvatar} from "../../../../components/Avatar/CocoAvatar";
import {AppLocalStorage} from "../../../../../persistant/localstorage";
import {InviteCopySection} from "../../../../pages/InvitePage/HowToInviteTabSection/env/u1/InviteCopySection";
import {uiSlice} from "../../../../../reduxStore/uiSlice";
import {CopyIcon} from "../../../../components-bs/Icons/CopyIcon";
import {MobileMenuItem} from "./MobileMenuItem";
import {environment} from "../../../../../../environments/environment";
import {AppLocalStorageKey} from "../../../../../persistant/AppLocalStorageKey";
import {IUserInfo} from "../../../../../persistant/IUserInfo";
import {appSlice} from "../../../../../reduxStore/appSlice";


export const MenuDrawerContent = () => {
  const location = useLocation();
  const userInfo: IUserInfo = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || '{}');
  const {isLogin, isShowLoginModal} = useSelector((state: RootState) => state.app)
  const recharge_first_cashback_rate = useSelector((rootState: RootState) => rootState.app.config.recharge_first_cashback_rate);
  const recharge_cashback_rate = useSelector((rootState: RootState) => rootState.app.config.recharge_cashback_rate);
  const {
    onClickToFirstDeposit,
    onClickToDepositCashback,
    onClickToInvite,
    onClickToVipGrade,
    onClickToCheckInDaily,
    onClickToTelegram,
    onClickToCompanyProfile
  } = usePageNavigate();

  const dispatch = useDispatch();
  const closeMenuDrawer = () => {
    dispatch(uiSlice.actions.setOpenMenuDrawer(false));
  }
  return (
    <>
      <div className="user-info flex flex-col justify-center items-center mb-3.5 relative">
        <div className="w-[80px] px-2.5 flex flex-col justify-center self-start items-center">
          <img
            src={`assets/${environment.uVersion}/icon_vip_info.png`}
            className={'w-[39px] h-[37px] mb-1.5'}
          />
          <div className="text-white text-base">VIP {userInfo.vip_level || 0}</div>
        </div>
        <div className={' flex  flex-col justify-center items-center'}>
          <CocoAvatar className="rounded"/>
          {isLogin && userInfo.user_id && (<div className="user-info flex mt-3 items-center">
            <p className="user-name text-white font-bold mr-2 text-xs">{userInfo.nickname}</p>
            <div className="user-code flex text-xs text-white items-center" >
              <p>ID:{userInfo.user_id || ''}</p>
              <CopyIcon className="ml-1 w-[14px] h-[14px]" copyText={userInfo.user_id || ''} />
            </div>
          </div>
          )}
          {!isLogin && (<div className="text-xs mt-3 text-white" onClick={()=>dispatch(appSlice.actions.showLoginDrawerOrModal(true))}>
            Registar Conta
          </div>)}
        </div>


      </div>
      <MobileMenuItem
        text={'Canal De Telegram'}
        className={`py-1.5 justify-between after:bg-gradient-to-b from-[var(--button-drawer-linear01-from)] to-[var(--button-drawer-linear01-to)]`}
        iconSuffix={true}
        icon={<img className="w-[14px] h-[14px]" alt={"telegram"} src={`assets/${environment.uVersion}/icon=telegram.png`} />}
        onClick={() => {
          onClickToTelegram();
          closeMenuDrawer();
        }}
      />
      <MobileMenuItem
        text={`Primeiro depósito +${recharge_first_cashback_rate}`}
        className={`after:bg-gradient-to-b from-[#2BE681] to-[#0E735B]`}
        onClick={() => {
          onClickToFirstDeposit();
          closeMenuDrawer();
        }}
      />
      <MobileMenuItem
        text={`Recarregar Cashback +${recharge_cashback_rate}`}
        className={`after:bg-gradient-to-b from-[#FF8E8E] to-[#FF3838]`}
        onClick={() => {
          onClickToDepositCashback();
          closeMenuDrawer();
        }}
      />
      <MobileMenuItem
        text={'Recompensa de check-in'}
        className={`after:bg-gradient-to-b from-[#FFE500] to-[#FF6A00]`}
        onClick={() => {
          onClickToCheckInDaily();
          closeMenuDrawer();
        }}
      />

      <MobileMenuLink
        text={'Bónus de Convite'}
        className="text-white mt-1 mb-6"
        icon={<img className="w-[14px] h-[14px] mr-2" alt={"invite"} src={`assets/${environment.uVersion}/icon=treasure.png`} />}
        onClick={() => {
          onClickToInvite();
          closeMenuDrawer();
        }}
      />
      <MobileMenuLink
        text={'Introdução ao nível VIP'}
        className="text-white"
        icon={<img className="w-[14px] h-[14px] mr-2" alt={"vip"} src={`assets/${environment.uVersion}/icon=vip.png`} />}
        onClick={() => {
          onClickToVipGrade();
          closeMenuDrawer();
        }}
      />
      <MobileMenuLink
        text={'Sobre nós'}
        className="text-white"
        icon={<img className="w-[14px] h-[14px] mr-2" alt={"about"} src={`assets/${environment.uVersion}/icon=building.png`} />}
        onClick={() => {
          onClickToCompanyProfile();
          closeMenuDrawer();
        }}
      />
      <span className="text-center text-xs text-[var(--secondary-assistant)] mb-4 font-medium">Copie o link e cole-o no navegador do seu computador para abri-lo em seu computador</span>
      <InviteCopySection />
    </>
  )
}
