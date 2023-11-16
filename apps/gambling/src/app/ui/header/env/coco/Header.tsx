import styled from "styled-components";
import cx from "classnames";
import React, { useState } from "react";
import { ConfirmButton } from "../../../components/Buttons/ConfirmButton";
import { UserMoneyStatusSection } from "../../UserMoneyStatusSection";
import { PageOrModalPathEnum } from "../../../PageOrModalPathEnum";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reduxStore";
import { MessageCountBadge } from "../../../components/MessageCountBadge";
import { environment } from "../../../../../environments/environment";
import { Avatar } from "../../../components/Avatar";
import { AvatarAccountInfo } from "../../../components/AvatarAccountInfo";
import { LoginButton } from "./LoginButton";
import { HeaderMenu } from "./HeaderMenu";


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


export type IHeader = {
  className?: string;
  onClickUserLoginStatusDrawer: () => void;
  onClickToPopupUserInfoStatusPopover: () => void;
  isLogin: boolean;
  onClickToOpenNotificationDrawer: () => void;
  openLogoutPopover: boolean;
  onClickToChangeLogoutPopover: (display: boolean) => void;
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
  const { isLogin, messageCount } = useSelector((state: RootState) => state.app);
  const [hover, setHover] = useState(false);

  return (
    <header
      className={cx("max-h-[66px]",
        "flex flex-row justify-between items-center relative",
        // "bg-purple-500"
      )}
      // style={{
      //   backgroundImage: `url("assets/${environment.assetPrefix}/top_di.png")`, // 替换成背景图片路径
      //   backgroundSize: 'cover', // 调整背景图片大小以填充整个元素
      //   backgroundPosition: '90% 50%', // 调整背景图片位置
      //   backgroundRepeat: 'no-repeat', // 禁止背景图片重复
      //   backgroundColor: '#013E42', // 设置背景颜色
      // }}

      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false)
      }}
    >
      {
        isLogin && (hover && <HeaderMenu />)
      }
      <div className={"flex flex-row basis-[58%] min-w-[680px] max-h-[67px] -mb-[1px]"}>
        <div className={"min-w-[100px] max-w-[130px] p-4 bg-[#5939f7] -mr-1"}>
          <img alt={"logo"} src={`assets/${environment.assetPrefix}/LOGO.png`} />
        </div>
        <HeaderButton>
          <HeaderButtonText>Jogos</HeaderButtonText>
        </HeaderButton>
        <HeaderButton>
          <HeaderButtonText>Atividade</HeaderButtonText>
        </HeaderButton>
        <HeaderButton>
          <HeaderButtonText>Convidar</HeaderButtonText>
        </HeaderButton>
        <HeaderButton>
          <HeaderButtonText>VIP</HeaderButtonText>
        </HeaderButton>
        <HeaderButton>
          <HeaderButtonText>Download</HeaderButtonText>
        </HeaderButton>
      </div>

      {!isLogin && (
        <LoginButton className={"text-white text-lg"} onClick={() => {
          props.onClickUserLoginStatusDrawer()
        }}>Connecte-se</LoginButton>
      )}

      {/*[How to Align Last Flex Item to Right](https://medium.com/@iamryanyu/how-to-align-last-flex-item-to-right-73512e4e5912)*/}
      {isLogin && (
        <section className={"flex flex-row items-center ml-auto"}>

          <div className={"mr-24 hidden lg:block"}>
            <UserMoneyStatusSection />
          </div>

          <section className={"mr-6"}>
            <Avatar onClickToPopupUserInfoStatusPopover={() => props.onClickToPopupUserInfoStatusPopover()} />
          </section>

          <section className={"mr-3"}>
            <AvatarAccountInfo />
          </section>


          <section className={"relative mr-4"}>
            <button onClick={() => {
              props.onClickToOpenNotificationDrawer();
            }}>
              <Notification>
                <img className="w-[36px] h-[36px] min-w-[36px] min-h-[36px]" alt={"notification"} src={`assets/${environment.assetPrefix}/ic_notification.png`} />
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
