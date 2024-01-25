import { twMerge } from "tailwind-merge";
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";
import { useDispatch, useSelector } from "react-redux";
import { uiSlice } from "../../../../../reduxStore/uiSlice";
import styled from "styled-components";
import { BASE_DRAWER_WIDTH, BASE_TAB_HEIGHT } from "../../../../pageTemplate";
import { CloseICON } from "../../../../components-bs/Icons/CloseICON";
import { DepositButton } from "../../../../components-bs/Buttons/BackgroundButton/DepositButton";
import cx from "classnames";
import { PageOrModalPathEnum } from "../../../../PageOrModalPathEnum";
import { environment } from "../../../../../../environments/environment";
import { usePageNavigate } from "../../../../router/hooks/usePageNavigate";
import { RootState } from "../../../../../reduxStore";
import { CashBackButton } from "../../../../components-bs/Buttons/BackgroundButton/CashBackButton";
import { DrawerButton } from "../../../../components-bs/Buttons/DrawerButton";

type IMenuDrawer = {
  isShowMenuDrawer:boolean,
  className?: string;
}


export const MenuDrawer = ({ className, isShowMenuDrawer }:IMenuDrawer)=> {

  const { onClickToFirstDeposit, onClickToDepositCashback, onClickToInvite, onClickToVipGrade, onClickToCheckInDaily, onClickToTelegram} = usePageNavigate();

  const { recharge_first_cashback_rate, recharge_cashback_rate } = useSelector((rootState: RootState) => rootState.app.config);
  const { isMobile, isTablet, isDesktop} = useBreakpoint();
  const dispatch = useDispatch();

  const close = () => {
    const canClose = (isMobile || isTablet);
    canClose && dispatch(uiSlice.actions.setOpenMenuDrawer(false))
  }

  return (
    <div
      className={twMerge('h-full', (isMobile || isTablet) && "bg-[rgba(0,0,0,.6)] fixed left-0 top-0 right-0 bottom-0 w-full h-full", className)}
      onMouseDown={() => {
        // NOTE: 手機版用戶會誤點
        close();
      }}
    >
      <div className={twMerge(`fixed overflow-auto h-full w-[${BASE_DRAWER_WIDTH}px]`,
        "bg-[var(--drawer-bg)] pt-14 px-6 flex flex-col",
        isDesktop && "rounded-tr-lg",
        !isDesktop && 'bg-[var(--drawer-bg-opacity-50)]'
        )}
           onMouseDown={(e)=>e.stopPropagation()}
      >
        {
          !isDesktop && (
            <div
              className='absolute right-3 top-3'
              onClick={() => dispatch(uiSlice.actions.setOpenMenuDrawer(false))}
            >
              <CloseICON />
            </div>
          )
        }
        <DepositButton
          className="flex text-base font-bold mb-3 gap-2"
          onClick={() => {
            onClickToFirstDeposit();
            close();
          }}
        >
          <img className="w-[25px] h-[25px] ml-0" alt={"firstRecharge"} src={`assets/${environment.uVersion}/ic_first_deposit.png`}/>
          <div className={"flex flex-col text-xs mr-1"}>
            <div>Primeiro Depósito</div>
            <div className='text-left'>+ {recharge_first_cashback_rate}</div>
          </div>
        </DepositButton>

        <CashBackButton
          className="text-base font-bold mb-3 gap-2"
          onClick={() => {
            onClickToDepositCashback();
            close();
          }}
        >
          <img className="w-[25px] h-[25px]" alt={"rechargeActivity"} src={`assets/${environment.uVersion}/ic_cashback.png`}/>
          <div className={"flex flex-col text-xs mr-1"}>
            <div>Recarregar Cashback</div>
            <div className='text-left'>+ 10%</div>
          </div>
        </CashBackButton>

        <DrawerButton
          className='flex gap-2'
          onClick={() => {
            onClickToInvite();
            close();
          }}
        >
          <img className="w-[25px] h-[25px]" alt={"invite"} src={`assets/${environment.uVersion}/ic_invite_friends.png`}/>
          <div className='text-xs text-white'>Convide Amigos</div>
        </DrawerButton>

        <DrawerButton
          className='flex gap-2'
          onClick={() => {
            onClickToVipGrade();
            close();
          }}
        >
          <img className="w-[25px] h-[25px]" alt={"vip"} src={`assets/${environment.uVersion}/ic_vip.png`}/>
          <div className='text-xs text-white'>Torne-se VIP</div>
        </DrawerButton>

        <DrawerButton
          className='flex gap-2'
          onClick={() => {
            onClickToCheckInDaily();
            close();
          }}
        >
          <img className="w-[25px] h-[25px]" alt={"checkIn"} src={`assets/${environment.uVersion}/ic_checkin.png`}/>
          <div className='text-xs text-white'>Check-in Diário</div>
        </DrawerButton>

        <DrawerButton
          className='flex gap-2'
          onClick={() => {
            onClickToTelegram();
            close();
          }}
        >
          <img className="w-[25px] h-[25px]" alt={"tg"} src={`assets/${environment.uVersion}/ic_tg.png`}/>
          <div className='text-xs text-white'>Adicionar Telegrama</div>
        </DrawerButton>

        {isMobile && (
          <section className={"flex flex-col items-center mt-4"}>
            <div className={"w-full"} style={{ position: 'relative' }}>
              <a>
                <img alt={"logo"} src={`assets/${environment.uVersion}/Rectangle 88.png`} style={{
                  position: 'relative',
                }}/>
                <img alt={"anotherImage"} src={`assets/${environment.uVersion}/Group.png`} style={{
                  position: 'absolute',
                  left: '0',
                  top: '0'
                }}/>
                <img alt={"thirdImage"} src={`assets/${environment.uVersion}/Products of SKY group.png`} style={{
                  position: 'absolute',
                  left: '0', /* 調整第三張圖片的水平位置 */
                  right: '0',
                  width: '100%',
                  top: '27px' /* 調整第三張圖片的垂直位置 */
                }}/>
              </a>
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
