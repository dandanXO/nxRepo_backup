import styled from "styled-components";
import cx from "classnames";
import React, { useState } from "react";
import { ConfirmButton } from "../../../../components/Buttons/ConfirmButton";
import { UserMoneyStatusSection } from "../../UserMoneyStatusSection";
import { PageOrModalPathEnum } from "../../../../PageOrModalPathEnum";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../reduxStore";
import { MessageCountBadge } from "../../../../components/MessageCountBadge";
import { environment } from "../../../../../../environments/environment";
import { Avatar } from "../../../../components/Avatar";
import { AvatarAccountInfo } from "../../../../components/AvatarAccountInfo";
import { LoginButton } from "./LoginButton";
import { HeaderMenu } from "./HeaderMenu";
import { CocoAvatar } from "../../../../components/Avatar/CocoAvatar";
import { AppLocalStorage } from "../../../../../persistant/localstorage";
import { usePageNavigate } from "../../../../hooks/usePageNavigate";
import {IUserInfo} from "../../../../../persistant/IUserInfo";
import {AppLocalStorageKey} from "../../../../../persistant/AppLocalStorageKey";


const Notification = styled.section`
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    border: 2px solid currentColor;
    border-radius: inherit;
    opacity: 0;
    transition: opacity .2s ease-in-out;
  }
`

const DirectionIcon  = styled.img<{
  active?: boolean
}>`
  height: 8px;
  width: 12px;
  transform: rotate(${props => props.active ? 180: 0}deg);
`


export type IHeader = {
  className?: string;
  onClickUserLoginStatusDrawer: () => void;
  onClickToPopupUserInfoStatusPopover: () => void;
  isLogin: boolean;
  onClickToOpenNotificationDrawer: () => void;
  openLogoutPopover: boolean;
  openDesktopUserInfoStatusDrawer: boolean;
  onClickToChangeLogoutPopover: (display: boolean) => void;
  onClickToDownload: () => void;
}

const HeaderButton = styled.button.attrs((props) => ({
  className: cx("font-bold", props.className),
})) <{
  className?: string;
}>`
  width: 100%;
  background-color: #040404;
  color: #cdbbff;
  transform: skew(-8deg);
  font-size: 16px;
  &:hover {
   color:white;
   border-bottom: 3px solid #9dd9ff;
  }
`

const HeaderButtonText = styled.div`
  transform: skew(8deg);
  /* height: 100%; */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const Header = (props: IHeader) => {
  const navigate = useNavigate()
  const user: IUserInfo = AppLocalStorage.getItem(AppLocalStorageKey.userInfo) ? JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || "") : {};

  const { isLogin, messageCount } = useSelector((state: RootState) => state.app);
  const [hover, setHover] = useState(false);
  const {onClickToIndex,onClickToInvite,onClickToVipGrade} = usePageNavigate();


  return (
    <header
      className={cx("max-h-[66px]",
        "flex flex-row justify-start items-center relative",
        // "bg-purple-500"
      )}
    // style={{
    //   backgroundImage: `url("assets/${environment.assetPrefix}/top_di.png")`, // 替换成背景图片路径
    //   backgroundSize: 'cover', // 调整背景图片大小以填充整个元素
    //   backgroundPosition: '90% 50%', // 调整背景图片位置
    //   backgroundRepeat: 'no-repeat', // 禁止背景图片重复
    //   backgroundColor: '#013E42', // 设置背景颜色
    // }}
    >
      {
        hover && (
          <div
            onMouseOver={() => { setHover(true) }}
            onMouseOut={() => { setHover(false) }}
          >
            <HeaderMenu />
          </div>
        )
      }

      <div className={"flex  flex-row min-w-[680px] max-h-[67px] -mb-[1px]"}
        onMouseOver={() => {
          setHover(true);
        }}
        onMouseOut={() => {
          setHover(false)
        }}
      >
        <div className={"min-w-[100px] max-w-[130px] p-4 bg-[#5939f7] -mr-1"} onClick={() => onClickToIndex()}>
          <img alt={"logo"} src={`assets/${environment.assetPrefix}/LOGO.png`} />
        </div>
        <HeaderButton>
          <HeaderButtonText onClick={onClickToIndex}>Jogos</HeaderButtonText>
        </HeaderButton>
        <HeaderButton>
          <HeaderButtonText>Atividade</HeaderButtonText>
        </HeaderButton>
        <HeaderButton>
          <HeaderButtonText onClick={onClickToInvite}>Convidar</HeaderButtonText>
        </HeaderButton>
        <HeaderButton>
          <HeaderButtonText onClick={onClickToVipGrade}>VIP</HeaderButtonText>
        </HeaderButton>
        <HeaderButton>
          <HeaderButtonText onClick={props.onClickToDownload}>Download</HeaderButtonText>
        </HeaderButton>
      </div>

      {!isLogin && (
        <div className="flex-1 flex justify-end">
          <LoginButton className={"text-white text-lg"} onClick={() => {
            props.onClickUserLoginStatusDrawer()
          }}>Connecte-se</LoginButton>
        </div>
      )}


      {/*[How to Align Last Flex Item to Right](https://medium.com/@iamryanyu/how-to-align-last-flex-item-to-right-73512e4e5912)*/}
      {isLogin && (
        <section className={"flex flex-row items-center ml-auto"}>

          <div className={"mr-20 hidden lg:block"}>
            <UserMoneyStatusSection />
          </div>

          <section
            className='flex gap-4 items-center mr-6 py-5'
            onClick={()=>props.onClickToPopupUserInfoStatusPopover()}
          >
            <CocoAvatar />
            <div>
              <div className='text-lg text-white flex gap-2'>
                <div>{user.nickname}</div>
                <DirectionIcon
                  active={props.openDesktopUserInfoStatusDrawer}
                  className='mx-auto my-auto'
                  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAMAAAA/D5+aAAAATlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////+QlxstAAAAGnRSTlMAmWYJlZFeE4yBcU0xIRCJfGxZR0Q4LCYcBOMgs9gAAABiSURBVBjTjc9HDoAgAETRURCUZm/3v6iKhtA0vu1fTAafZJlixiZRpCpuE2mSQlfceB2n2a3pKiwScFRQGHyTV8SOwOBKQxDpn1JzxEhnC9VImfZKCjnbeWFE3kIZ3hD8dAA6kgJgxoBGKwAAAABJRU5ErkJggg=='
                />
              </div>
              <div className='text-base text-[#ff76ff] leading-none'>ID:{user.user_id}</div>
            </div>
          </section>

          <section className={"relative mr-4"}>
            <button onClick={() => {
              props.onClickToOpenNotificationDrawer();
            }}>
              <Notification>
                <img
                  className="w-[30px] h-[36px] min-w-[30px] min-h-[36px]"
                  alt={"notification"}
                  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAYAAAA2Lt7lAAAAAXNSR0IArs4c6QAAA3hJREFUSEvdll9oXEUYxc+ZudmtQaNQrCIJUqyiaOuDoKAo242IUV9ESv62pI9Cq1YQJKbl0ixBRH0wYMEHlRib2tUKBsmDZFlpkYIEsWBRqGICDRrTaKhpzO6dObK7SZvdpm7I5snvbZg75/f9u/MNUd2YaEs9YAO9BGGHQAtgAnAD/ry+ymbD6L8kWE3/4WfDLZvqbS/BPQIait8TiwS+dIhezQ6F52oBcGdHX4sxOAKwqSi9ZJJmIH9o8s+Z98+NDixeC3LNCBLd4Sa/YLfagPsM0Q2gfqWIgDykkcgpNT/vfxofCS+tBlkVUEzLdfY5kG0A7gfQQF7xviAkQQQuATrjhTQDHs8M9k4VtlaCrgI80hbeFg+CA4C6CG4BYKrUyUuaBfi5z0VvZNPhzyshZYDHd71+o4tFL5J4gcDmag1QkbKLkgYXjTv8zUfh9PLeCkBoEh02aQyPQLijMiVrgklTDv7liz+ePzE+/l6+1HBL9lBn2FAP85oh9wEsK+iaxEt5ydPreC5vD5xM9/xRBkh0ho0W9gOQyTXkfVVmofAgfqCi1rGPw7NlgMc6+u4MiDTJQtes2yRNOKfdXx87dLIc0Np3TxAUAfeuW714UJNy2JsZPpgpT1F7/93G+jSB+2oDYMJF6s4eO5j9nwGaW/vvUuA/JbG9lhRJ+JU0e8aGeiqKXOqiz0jWDPAeu7PDvadW1CA0yXY+DWPeJdlYWwSaIdEbuzD94ejoQGFuAI/u6r85FndvAmwFEK8FAMEJGsvJPX/qaPgLgdDs7LBPkqWhsq47qMKj4jACeiZnpwdZuJ5j1vab0t1fm/dXQB5Sxnm3n8muVDuEfgC3b4T3ywwBFyS9xWTX4S8I88QGer/EkId4hsnOVOFa3byR3l+OQlhgc2fqO5R+rsJ7ZyOtMEqnmOhKdRpgL4StV6kTghSRyJX2ludTaa5LrANVB7FythtAU5I+4baWd+KN1882waKRts4aG/llkHeBoVc9jYnDu8jTF5WNDGlpnUcEur+NRdkZo8jnnfntr9jcZCW5bL2tZX+s6aZbnqFRN8g4gX9KriMmeA/ixNycPzo+Ei5U/grL66pPx+b2cIeMfYXAUyJvKB3UPMExIXo7M4TTQHg5gso0VwUkEmEQ3Gq2e2M6QD1I0kD83sMN/57z355Nh0v1Wb0//gXUW3uITFgj8QAAAABJRU5ErkJggg=='
                />
                {messageCount !== 0 && <MessageCountBadge>{messageCount}</MessageCountBadge>}
              </Notification>
            </button>
          </section>

          <section className={""} onClick={() => {
            props.onClickToChangeLogoutPopover(!props.openLogoutPopover);
          }}>
            <button>
              <img className="w-[36px] h-[36px] min-w-[36px] min-h-[36px]" alt={"logout"} src={`assets/${environment.assetPrefix}/ic_signout.png`} />
            </button>
          </section>

        </section>
      )}

    </header>
  )
}
