import styled from "styled-components";
import { twMerge } from "tailwind-merge";
import React, { useState } from "react";
import { UserMoneyStatusSection } from "../../UserMoneyStatusSection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../reduxStore";
import { LoginButton } from "../../../../components-bs/Buttons/LoginButton";
import { CocoAvatar } from "../../../../components/Avatar/CocoAvatar";
import { AppLocalStorage } from "../../../../../persistant/localstorage";
import { usePageNavigate } from "../../../../router/hooks/usePageNavigate";
import { IUserInfo } from "../../../../../persistant/IUserInfo";
import { AppLocalStorageKey } from "../../../../../persistant/AppLocalStorageKey";
import { NotificationAnimationIcon } from "../../../../components-bs/Icons/animation/NotificationAnimationIcon";
import { IHeader } from "../../types/IHeader";
import { appSlice } from "../../../../../reduxStore/appSlice";
import LogoContainerImg from "./LogoContainer.svg";
import useBreakpoint from "../../../hooks/useBreakpoint";
import { MenuSmallLogo } from "../../../../components-bs/Logos/env/riojungle/MenuSmallLogo";
import { renderByRWD } from "../../../../utils/renderByRWD";
import { MenuLogo } from "../../../../components-bs/Logos/MenuLogo";
import { MenuMediumLogo } from "../../../../components-bs/Logos/env/riojungle/MenuMediumLogo";
import { uiSlice } from "../../../../../reduxStore/uiSlice";
import searchSVGICON from "./MagnifyingGlass.svg";

const DirectionIcon = styled.img<{
  active?: boolean
}>`
  height: 8px;
  width: 12px;
  transform: rotate(${props => props.active ? 180 : 0}deg);
`

const SearchSection = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-[40px] shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#4d4d4d] flex flex-row p-1 justify-center items-center rounded-lg"
      onClick={() => dispatch(appSlice.actions.setShowGameSearchModal(true))}
    >
      <img
        src={searchSVGICON}
        alt="MagnifyingGlass"
        id="MagnifyingGlass"
        className="w-[32px] h-[32px]"
      />
    </div>
  )
}

type IUserStatusSection = {
  onClickToOpenNotificationDrawer: () => void;
}
const UserStatusSection = (props: IUserStatusSection) => {
  const user: IUserInfo = AppLocalStorage.getItem(AppLocalStorageKey.userInfo) ? JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || "") : {};
  const { openUserInfoStatusPopover } = useSelector((state: RootState) => state.ui)
  const dispatch = useDispatch();
  const { messageCount } = useSelector((state: RootState) => state.app);

  return (
    <>
      <section
        className='flex gap-2 items-center cursor-pointer w-full'
        onClick={() => { dispatch(uiSlice.actions.setUserInfoStatusPopover(!openUserInfoStatusPopover)) }}
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
          <div className='text-lg text-white flex mb-2'>
            <div className='text-base leading-none mr-2'>LV:{user.vip_level}</div>
            <DirectionIcon
              active={openUserInfoStatusPopover}
              className='mx-auto my-auto'
              src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAMAAAA/D5+aAAAATlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////+QlxstAAAAGnRSTlMAmWYJlZFeE4yBcU0xIRCJfGxZR0Q4LCYcBOMgs9gAAABiSURBVBjTjc9HDoAgAETRURCUZm/3v6iKhtA0vu1fTAafZJlixiZRpCpuE2mSQlfceB2n2a3pKiwScFRQGHyTV8SOwOBKQxDpn1JzxEhnC9VImfZKCjnbeWFE3kIZ3hD8dAA6kgJgxoBGKwAAAABJRU5ErkJggg=='
            />
          </div>
          <div className='text-base text-white leading-none'>ID:{user.user_id}</div>
        </div>
      </section>
      <section className={"flex relative justify-center"}>
        <div
          onClick={() => {
            props.onClickToOpenNotificationDrawer();
          }}
        >
          <NotificationAnimationIcon messageCount={messageCount} />
        </div>
      </section>
    </>
  )
}

type IUserMoneyStatusSection = {
  onClickToOpenNotificationDrawer: () => void;
}

const UserMoneyStatusSectionItem = (props: IUserMoneyStatusSection) => {

  const devices = useBreakpoint();
  return (
    <section className={"flex flex-row items-center gap-6 mr-3 grow w-full"}>

      <div className={"w-full min-w-[250px]"}>
        <UserMoneyStatusSection />
      </div>

      {renderByRWD({
        "mobile": <></>,
        "tablet": (
          <></>
        ),
        "desktop": (
          <UserStatusSection onClickToOpenNotificationDrawer={props.onClickToOpenNotificationDrawer} />
        )
      }, devices)}

    </section>
  )
}

const LogoBaseContainer = () => {
  return (
    <img
      className={"w-[300px] h-[96px] relative top-[12px] left-[-30px]"}
      src={LogoContainerImg}
    />
  )
}
const RWDLogo = () => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const { onClickToIndex } = usePageNavigate();
  return (
    <>
      {renderByRWD({
        mobile: (
          <div
            className={"cursor-pointer w-[40px] mr-3"}
            onClick={() => onClickToIndex()}
          >
            <MenuSmallLogo />
          </div>
        ),
        tablet: (
          <div
            className={"cursor-pointer"}
            onClick={() => onClickToIndex()}
          >
            <MenuMediumLogo />
          </div>
        ),
        desktop: (
          <div className={"relative"}>
            <LogoBaseContainer />
            <div
              className={"cursor-pointer absolute top-[26px] left-[42px]"}
              onClick={() => onClickToIndex()}
            >
              <MenuLogo />
            </div>
          </div>
        )
      }, {
        isMobile,
        isTablet,
        isDesktop
      })}
    </>
  )
}

const UserActionSection = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex-1 flex justify-end mr-4">
      <button
        id="BtnloginRoot"
        className="w-[91px] shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[var(--secondary-main)] flex flex-row justify-center pt-1 cursor-pointer items-start rounded-lg mr-3"
        onClick={() => {
          // props.onClickUserLoginStatusDrawer()
          dispatch(appSlice.actions.setLoginUIStatusType("login"));
          dispatch(appSlice.actions.showLoginDrawerOrModal(true))
        }}
      >
        <div className="text-xl font-['Inter'] font-medium leading-[28px] text-white mb-1">
          Entrar
        </div>
      </button>

      <button
        id="BtnregisterRoot"
        className="w-[112px] shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[var(--primary-main)] flex flex-row justify-center pt-1 cursor-pointer items-start rounded-lg"
        onClick={() => {
          // props.onClickUserLoginStatusDrawer()
          dispatch(appSlice.actions.setLoginUIStatusType("register"));
          dispatch(appSlice.actions.showLoginDrawerOrModal(true))
        }}
      >
        <div className="text-xl font-['Inter'] font-medium leading-[28px] text-white mb-1">
          Registro
        </div>
      </button>
    </div>
  )
}
export const Header = (props: IHeader) => {
  const devices = useBreakpoint();
  const { isLogin } = useSelector((state: RootState) => state.app);

  return (
    <header
      className={twMerge("h-[56px] sm:h-[72px]",
        "bg-gradient-to-b from-[var(--background-header-from)] to-[var(--background-header-to)]",
        "px-4 md:px-8",
        "py-0 sm:py-3",
        "flex flex-row justify-between items-center",
        props.className
      )}
    >

      {renderByRWD({
        "mobile": (
          <div className={"flex flex-row justify-between items-center w-full"}>
            <RWDLogo />
            {!isLogin ? (
              <UserActionSection />
            ) : (
              <>
                <UserMoneyStatusSectionItem onClickToOpenNotificationDrawer={props.onClickToOpenNotificationDrawer} />
                <SearchSection />
              </>
            )}
          </div>
        ),
        "tablet": (
          <div className={"flex flex-row justify-between items-center w-full"}>
            <RWDLogo />
            {!isLogin ? (
              <UserActionSection />
            ) : (
              <div className={"flex flex-row"}>
                <div className={"mr-6 min-w-[250px]"}>
                  <UserMoneyStatusSectionItem onClickToOpenNotificationDrawer={props.onClickToOpenNotificationDrawer} />
                </div>
                <SearchSection />
              </div>
            )}
          </div>
        ),
        "desktop": (
          <div className={"flex flex-row justify-between items-center w-full"}>
            <RWDLogo />
            {!isLogin ? (
              <UserActionSection />
            ) : (
              <div className={"flex flex-row"}>
                <UserMoneyStatusSectionItem onClickToOpenNotificationDrawer={props.onClickToOpenNotificationDrawer} />
              </div>
            )}
          </div>
        )
      }, devices)}


    </header>
  )
}
