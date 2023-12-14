import styled from "styled-components";
import cx from "classnames";
import React, {useState} from "react";
import {UserMoneyStatusSection} from "../../UserMoneyStatusSection";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../reduxStore";
import {LoginButton} from "../../../../components/Buttons/LoginButton";
import {CocoAvatar} from "../../../../components/Avatar/CocoAvatar";
import {AppLocalStorage} from "../../../../../persistant/localstorage";
import {usePageNavigate} from "../../../../hooks/usePageNavigate";
import {IUserInfo} from "../../../../../persistant/IUserInfo";
import {AppLocalStorageKey} from "../../../../../persistant/AppLocalStorageKey";
import {NotificationAnimationIcon} from "../../../../components/Icons/animation/NotificationAnimationIcon";
import {MenuLogo} from "../../../../components/Logos/MenuLogo";
import {IHeader} from "../../types/IHeader";
import {appSlice} from "../../../../../reduxStore/appSlice";

const DirectionIcon = styled.img<{
  active?: boolean
}>`
  height: 8px;
  width: 12px;
  transform: rotate(${props => props.active ? 180 : 0}deg);
`

export const DesktopHeader = (props: IHeader) => {
  const user: IUserInfo = AppLocalStorage.getItem(AppLocalStorageKey.userInfo) ? JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || "") : {};

  const { isLogin, messageCount } = useSelector((state: RootState) => state.app);
  const [hover, setHover] = useState(false);
  const { onClickToIndex, onClickToInvite, onClickToVipGrade } = usePageNavigate();

  const dispatch = useDispatch();
  const isShowLoginModal = useSelector((state: RootState) => state.app.isShowLoginModal)

  return (
    <header
      className={cx("h-[72px]",
        "bg-[var(--primary-variant)]",
        "flex flex-row justify-between items-center relative",
      )}
    >
      <div
        className={"cursor-pointer"}
        onClick={() => onClickToIndex()}
      >
        <MenuLogo/>
      </div>

      {!isLogin ? (
        <div className="flex-1 flex justify-end mr-4">
            <LoginButton
              className={"text-white text-lg"}
              onClick={() => {
                // props.onClickUserLoginStatusDrawer()
                dispatch(appSlice.actions.showLoginDrawerOrModal(true))
              }}
            >Connecte-se</LoginButton>
        </div>
        ): (
        <section className={"flex flex-row items-center gap-6 mr-6"}>

          <div className={"hidden lg:block"}>
            <UserMoneyStatusSection />
          </div>

          <section
            className='flex gap-2 items-center'
            onClick={() => props.onClickToPopupUserInfoStatusPopover()}
            onMouseOver={() => {
              // console.log("onMouseOver")
              props.onClickToPopupUserInfoStatusPopover();
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

          <section className={"relative flex justify-center"}>
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
