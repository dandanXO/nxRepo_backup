import styled from "styled-components";
import cx from "classnames";
import React from "react";
import {ConfirmButton} from "../../../components/ConfirmButton";
import {UserMoneyStatusSection} from "../../../components/UserMoneyStatusSection";
import {PageOrModalPathEnum} from "../../../PageOrModalPathEnum";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {RootState} from "../../../../reduxStore";
import {MessageCountBadge} from "../../../components/MessageCountBadge";
import {environment} from "../../../../../environments/environment";
import {Avatar} from "../../../components/Avatar";
import {AvatarAccountInfo} from "../../../components/AvatarAccountInfo";


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

export const Header = (props: IHeader) => {
  const navigate = useNavigate()
  const { isLogin, messageCount } = useSelector((state: RootState) => state.app)

  return (
    <header className={cx("flex flex-row justify-start items-center px-5", props.className)} style={{
      // backgroundImage: `url("assets/${environment.assetPrefix}/top_di.png")`, // 替换成背景图片路径
      backgroundSize: 'cover', // 调整背景图片大小以填充整个元素
      backgroundPosition: '90% 50%', // 调整背景图片位置
      backgroundRepeat: 'no-repeat', // 禁止背景图片重复
      backgroundColor: 'var(--assistant)', // 设置背景颜色
    }}>
      <div className={"w-[200px]"}>
        <a>
          <img onClick={() => {
            navigate(PageOrModalPathEnum.IndexPage)
          }} alt={"logo"} src={`assets/${environment.assetPrefix}/LOGO.png`}/>
        </a>
      </div>
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
            left: '20px', /* 调整第三张图片的水平位置 */
            top: '27px' /* 调整第三张图片的垂直位置 */
          }}/>
        </a>
      </div>


      {/*<div className={"w-[250px] hidden xl:block"}>*/}
      {/*  <WebsiteButton/>*/}
      {/*</div>*/}

      {/*[How to Align Last Flex Item to Right](https://medium.com/@iamryanyu/how-to-align-last-flex-item-to-right-73512e4e5912)*/}
      {!isLogin ? (
        <ConfirmButton onClick={() => props.onClickUserLoginStatusDrawer()} className={"ml-auto"}>Conecte-se</ConfirmButton>
      ): (
        <section className={"flex flex-row items-center ml-auto"}>

          <div className={"mr-24 hidden lg:block"}>
            <UserMoneyStatusSection/>
          </div>

          <section className={"mr-6"}>
            <Avatar onClickToPopupUserInfoStatusPopover={() => props.onClickToPopupUserInfoStatusPopover()}/>
          </section>

          <section className={"mr-3"}>
            <AvatarAccountInfo/>
          </section>


          <section className={"relative mr-4"}>
            <button onClick={() => {
              props.onClickToOpenNotificationDrawer();
            }}>
              <Notification>
                <img className="w-[36px] h-[36px] min-w-[36px] min-h-[36px]" alt={"notification"} src={`assets/${environment.assetPrefix}/ic_notification.png`}/>
                {messageCount !== 0 && <MessageCountBadge>{messageCount}</MessageCountBadge>}
              </Notification>
            </button>
          </section>

          <section className={""} onClick={() => {
            props.onClickToChangeLogoutPopover(!props.openLogoutPopover);
          }}>
            <button>
              <img className="w-[36px] h-[36px] min-w-[36px] min-h-[36px]" alt={"logout"} src={`assets/${environment.assetPrefix}/ic_signout.png`}/>
            </button>
          </section>

        </section>
      )}
    </header>
  )
}
