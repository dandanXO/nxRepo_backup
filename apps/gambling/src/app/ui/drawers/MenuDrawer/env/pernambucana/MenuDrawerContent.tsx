import cx from "classnames";
import {PageOrModalPathEnum} from "../../../../PageOrModalPathEnum";
import {appSlice} from "../../../../../reduxStore/appSlice";
import {environment} from "../../../../../../environments/environment";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import {useLocation, useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../reduxStore";
import {DepositButton} from "../../../../components-bs/theme/Buttons/BackgroundButton/DepositButton";
import {CashBackButton} from "../../../../components-bs/theme/Buttons/BackgroundButton/CashBackButton";
import {DrawerButton} from "../../../../components-bs/theme/Buttons/DrawerButton";
import {usePageNavigate} from "../../../../hooks/usePageNavigate";
import {HomeButton} from "../../../../components-bs/theme/Buttons/BackgroundButton/HomeButton";

export const MenuDrawerContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {isMobile} = useBreakpoint();
  const {
    onClickToFirstDeposit,
    onClickToDepositCashback,
    onClickToInvite,
    onClickToVipGrade,
    onClickToCheckInDaily,
    onClickToTelegram,
  } = usePageNavigate();

  const dispatch = useDispatch();
  const {isLogin, isShowLoginModal} = useSelector((state: RootState) => state.app)

  return (
    <>
      {!isMobile && (
        <section>
          <HomeButton className={"h-[50px] !font-bold text-base mb-3"} onClick={() => {
            if(!isLogin) {
              dispatch(appSlice.actions.showLoginDrawerOrModal(true))
            } else {
              navigate(PageOrModalPathEnum.IndexPage)
            }
          }}>
            {location.pathname === PageOrModalPathEnum.IndexPage ? (
              <img className={"w-[24px] h-[24px] mr-2"} alt={"home-open"} src={`assets/${environment.assetPrefix}/ic_home.png`}/>
            ): (
              <img className={"w-[24px] h-[24px] mr-2"} alt={"home-open"} src={`assets/${environment.assetPrefix}/ic_home.png`}/>
            )}
            <span className={cx({
              "text-transparent": location.pathname === PageOrModalPathEnum.IndexPage,
            })}>Página Inicial</span>
          </HomeButton>
        </section>
      )}

      <DepositButton
        className={cx("flex text-base font-bold mb-3", {
          "active-drawer-button": location.pathname === PageOrModalPathEnum.InitialChargePage
        })}
        onClick={() => {
          onClickToFirstDeposit();
        }}
      >
          <span className={"pr-3"}>
          {location.pathname === PageOrModalPathEnum.InvitePage ? (
            <img className="w-[25px] h-[25px] ml-0" alt={"invite"} src={`assets/${environment.assetPrefix}/ic_first_deposit.png`}/>
          ): (
            <img className="w-[25px] h-[25px] ml-0" alt={"invite"} src={`assets/${environment.assetPrefix}/ic_first_deposit.png`}/>
          )}
          </span>
          <div className={"flex flex-col text-sm mr-1"}>
            <div>Primeiro Depósito</div>
            <div className={"flex"}>+ 20%</div>
          </div>
          <span>
            <img className="h-[58px] w-[58px]" alt={"invite"} src={`assets/${environment.assetPrefix}/Group.png`} style={{verticalAlign: 'middle'}}/>
          </span>
      </DepositButton>

      <CashBackButton
        className={cx("text-base font-bold mb-3", {
          "active-drawer-button": location.pathname === PageOrModalPathEnum.RechargeActivityPage
        })}
        onClick={() => {
          onClickToDepositCashback();
        }}
      >
        <span className={'pr-1'}>
          {location.pathname === PageOrModalPathEnum.InvitePage ? (
            <img className="w-[24px] h-[24px]" alt={"invite"} src={`assets/${environment.assetPrefix}/ic_cashback.png`}/>
          ): (
            <img className="w-[25px] h-[25px]" alt={"invite"} src={`assets/${environment.assetPrefix}/ic_cashback.png`}/>
          )}
        </span>
        <div className={"flex flex-col"}>
          <div style={{ fontSize: '12px' }}>Recarregar Cashback</div>
          <div className={"flex"} style={{ fontSize: '14px' }}>+ 10%</div>
        </div>
        <span>
           <img className="" alt={"invite"} src={`assets/${environment.assetPrefix}/gup.png`} style={{verticalAlign: 'middle'}}/>
        </span>
      </CashBackButton>

      <DrawerButton
        className={cx({
          "active-drawer-button": location.pathname === PageOrModalPathEnum.InvitePage
        })}
        onClick={() => {
          onClickToInvite()
        }}
      >
          <span className={"pr-4"}>
            {location.pathname === PageOrModalPathEnum.InvitePage ? (
              <img className="w-[24px] h-[24px] mr-2" alt={"invite"} src={`assets/${environment.assetPrefix}/ic_invite_friends.png`}/>
            ): (
              <img className="w-[25px] h-[25px]" alt={"invite"} src={`assets/${environment.assetPrefix}/ic_invite_friends.png`}/>
            )}
          </span>
          <span className={cx(
          "text-white",
          "text-purewhite",
          {
            "text-transparent": location.pathname === PageOrModalPathEnum.InvitePage,
          })}>Convide Amigos</span>
      </DrawerButton>


      <DrawerButton
        className={cx({
          "active-drawer-button": location.pathname === PageOrModalPathEnum.VIPGradePage
        })}
        onClick={() => {
          onClickToVipGrade();
        }}>
          <span className={"pr-4"}>
            {location.pathname === PageOrModalPathEnum.VIPGradePage ? (
              <img className={"w-[24px] h-[24px] mr-2"} alt={"home-open"} src={`assets/${environment.assetPrefix}/ic_vip.png`}/>
            ): (
              <img className="w-[25px] h-[25px]" alt={"vip"} src={`assets/${environment.assetPrefix}/ic_vip.png`}/>
            )}
          </span>
        <span className={cx("text-white", {
          "text-transparent": location.pathname === PageOrModalPathEnum.VIPGradePage,
        })}>Torne-se VIP</span>
      </DrawerButton>

      <DrawerButton
        className={cx({
          "active-drawer-button": location.pathname === PageOrModalPathEnum.DailySignInPage
        })}
        onClick={() => {
          onClickToCheckInDaily();
        }}
      >
          <span className={"pr-4"}>
            {location.pathname === PageOrModalPathEnum.DailySignInPage ? (
              <img className={"w-[24px] h-[24px] mr-2"} alt={"home-open"} src={`assets/${environment.assetPrefix}/ic_checkin.png`}/>
            ): (
              <img className="w-[25px] h-[25px]" alt={"Check-in diário"} src={`assets/${environment.assetPrefix}/ic_checkin.png`}/>
            )}
          </span>
          <span className={cx(
          "text-white",
          "text-purewhite",
          {
            "text-transparent": location.pathname === PageOrModalPathEnum.DailySignInPage,
          })}>Check-in Diário</span>
      </DrawerButton>

      <DrawerButton
        className={cx({
          "active-drawer-button": location.pathname === PageOrModalPathEnum.TelegramPage
        })}
        onClick={() => {
          onClickToTelegram();
        }}
      >
          <span className={"pr-4"}>
            {location.pathname === PageOrModalPathEnum.TelegramPage ? (
              <img className="w-[24px] h-[24px]  mr-2" alt={"telegram"} src={`assets/${environment.assetPrefix}/ic_tg.png`}/>
            ): (
              <img className="w-[25px] h-[25px]" alt={"telegram"} src={`assets/${environment.assetPrefix}/ic_tg.png`}/>
            )}
          </span>
         <span className={cx(
          "text-white",
          "text-purewhite",
          {
            "text-transparent": location.pathname === PageOrModalPathEnum.TelegramPage,
          })}>Adicionar Telegrama</span>
      </DrawerButton>

      {isMobile && (
        <section className={"flex flex-col items-center justify-end h-full"}>
          <div className={"w-[276px]"} style={{ position: 'relative' }}>
            <a>
              <img alt={"logo"} src={`assets/${environment.assetPrefix}/Rectangle 88.png`} style={{
                position: 'relative',
              }}/>
              <img alt={"anotherImage"} src={`assets/${environment.assetPrefix}/Group.png`} style={{
                position: 'absolute',
                left: '0',
                top: '0'
              }}/>
              <img alt={"thirdImage"} src={`assets/${environment.assetPrefix}/Products of SKY group.png`} style={{
                position: 'absolute',
                left: '20px', /* 調整第三張圖片的水平位置 */
                top: '27px' /* 調整第三張圖片的垂直位置 */
              }}/>
            </a>
          </div>
        </section>
      )}

    </>
  )
}
