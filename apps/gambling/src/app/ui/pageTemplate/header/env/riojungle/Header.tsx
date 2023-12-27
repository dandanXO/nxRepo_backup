import styled from "styled-components";
import {twMerge} from "tailwind-merge";
import React, {useState} from "react";
import {UserMoneyStatusSection} from "../../UserMoneyStatusSection";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../reduxStore";
import {LoginButton} from "../../../../components-bs/theme/Buttons/LoginButton";
import {CocoAvatar} from "../../../../components/Avatar/CocoAvatar";
import {AppLocalStorage} from "../../../../../persistant/localstorage";
import {usePageNavigate} from "../../../../hooks/usePageNavigate";
import {IUserInfo} from "../../../../../persistant/IUserInfo";
import {AppLocalStorageKey} from "../../../../../persistant/AppLocalStorageKey";
import {NotificationAnimationIcon} from "../../../../components-bs/theme/Icons/animation/NotificationAnimationIcon";
import {IHeader} from "../../types/IHeader";
import {appSlice} from "../../../../../reduxStore/appSlice";
import LogoContainerImg from "./LogoContainer.svg";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import {MenuSmallLogo} from "../../../../components-bs/theme/Logos/env/riojungle/MenuSmallLogo";
import {renderByRWD} from "../../../../utils/renderByRWD";
import {MenuLogo} from "../../../../components-bs/theme/Logos/MenuLogo";
import {MenuMediumLogo} from "../../../../components-bs/theme/Logos/env/riojungle/MenuMediumLogo";

const DirectionIcon = styled.img<{
  active?: boolean
}>`
  height: 8px;
  width: 12px;
  transform: rotate(${props => props.active ? 180 : 0}deg);
`

export const Header = (props: IHeader) => {
  const {isMobile, isTablet, isDesktop} = useBreakpoint();
  const user: IUserInfo = AppLocalStorage.getItem(AppLocalStorageKey.userInfo) ? JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || "") : {};

  const { isLogin, messageCount } = useSelector((state: RootState) => state.app);
  const [hover, setHover] = useState(false);
  const { onClickToIndex, onClickToInvite, onClickToVipGrade } = usePageNavigate();

  const dispatch = useDispatch();
  const isShowLoginModal = useSelector((state: RootState) => state.app.isShowLoginModal)

  return (
    <header
      className={twMerge("h-[56px] sm:h-[72px]",
        "bg-gradient-to-b from-[var(--background-header-from)] to-[var(--background-header-to)]",
        "flex flex-row justify-between items-center",
        "px-4 md:px-8",
        "py-0 sm:py-3",
        props.className
      )}
    >
      {renderByRWD({
        mobile: (
          <div
            className={"cursor-pointer"}
            onClick={() => onClickToIndex()}
          >
            <MenuSmallLogo/>
          </div>
        ),
        tablet: (
          <div
            className={"cursor-pointer"}
            onClick={() => onClickToIndex()}
          >
            <MenuMediumLogo/>
          </div>
        ),
        desktop: (
          <div className={"relative"}>
            <img
              className={"w-[300px] h-[96px] relative top-[12px] left-[-30px]"}
              src={LogoContainerImg}
            />
            <div
              className={"cursor-pointer absolute top-[26px] left-[42px]"}
              onClick={() => onClickToIndex()}
            >
              <MenuLogo/>
            </div>
          </div>
        )
      }, {
        isMobile,
        isTablet,
        isDesktop
      })}

      {!isLogin ? (
        <div className="flex-1 flex justify-end mr-4">
          <button
            id="BtnloginRoot"
            className="w-[91px] shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#10b98f] flex flex-row justify-center pt-1 cursor-pointer items-start rounded-lg mr-3"
            onClick={() => {
              // props.onClickUserLoginStatusDrawer()
              dispatch(appSlice.actions.showLoginDrawerOrModal(true))
            }}
          >
            <div className="text-xl font-['Inter'] font-medium leading-[28px] text-white mb-1">
              Entrar
            </div>
          </button>
          <button
            id="BtnregisterRoot"
            className="w-[112px] shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#8547eb] flex flex-row justify-center pt-1 cursor-pointer items-start rounded-lg"
            onClick={() => {
              // props.onClickUserLoginStatusDrawer()
              dispatch(appSlice.actions.showLoginDrawerOrModal(true))
            }}
          >
            <div className="text-xl font-['Inter'] font-medium leading-[28px] text-white mb-1">
              Registro
            </div>
          </button>
        </div>
        ): (
        <section className={"flex flex-row items-center gap-6 mr-6"}>

          <div className={""}>
            <UserMoneyStatusSection />
          </div>

          <section
            className='hidden lg:flex gap-2 items-center'
            onClick={() => props.onClickToPopupUserInfoStatusPopover()}
            onMouseOver={() => {
              // console.log("onMouseOver")
              // props.onClickToPopupUserInfoStatusPopover();
            }}
            onMouseOut={() => {
              // console.log("onMouseOut")
            }}
            onMouseLeave={() => {
              // console.log("onMouseLeave")
              // NOTICE: StatusPopover 不能有 mash div 佔滿全部螢幕，不然會導致 over out leave 瞬間連續觸發
              // props.onClickToPopupUserInfoStatusPopover();
            }}
          >
            <CocoAvatar className='w-[44px] h-[44px]' />
            <div>
              <div className='text-lg text-white flex gap-2'>
                <div>{user.nickname}</div>
                <DirectionIcon
                  active={props.openDesktopUserInfoStatusDrawer}
                  className='mx-auto my-auto'
                  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAMAAAA/D5+aAAAATlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////+QlxstAAAAGnRSTlMAmWYJlZFeE4yBcU0xIRCJfGxZR0Q4LCYcBOMgs9gAAABiSURBVBjTjc9HDoAgAETRURCUZm/3v6iKhtA0vu1fTAafZJlixiZRpCpuE2mSQlfceB2n2a3pKiwScFRQGHyTV8SOwOBKQxDpn1JzxEhnC9VImfZKCjnbeWFE3kIZ3hD8dAA6kgJgxoBGKwAAAABJRU5ErkJggg=='
                />
              </div>
              <div className='text-base text-[var(--text-tertiary)] leading-none'>ID:{user.user_id}</div>
            </div>
          </section>

          <section className={"hidden lg:flex relative justify-center"}>
            <div
              onClick={() => {
                props.onClickToOpenNotificationDrawer();
              }}
            >
              <NotificationAnimationIcon messageCount={messageCount}/>
            </div>
          </section>


        </section>
      )}
    </header>
  )
}
