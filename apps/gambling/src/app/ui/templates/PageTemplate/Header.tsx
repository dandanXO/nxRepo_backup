import styled from "styled-components";
import cx from "classnames";

import useBreakpoint from "../../hooks/useBreakpoint";
import {WebsiteButton} from "../../components/WebsiteButton";
import React, {useState} from "react";
import {ConfirmButton} from "../../components/ConfirmButton";
import {UserMoneyStatusSection} from "../../components/UserMoneyStatusSection";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {RootState} from "../../../reduxStore";

import {AppLocalStorage} from "../../../persistant/localstorage";
import {MessageCountBadge} from "../../components/MessageCountBadge";
import {IUserInfo} from "../../../persistant/pending/loginMode";
import {environment} from "../../../../environments/environment";
import { RightOutlined } from "@ant-design/icons";

const RegisterButton = styled.button`
  width: 150px;
  height: 30px;
  border-radius: 25px;
  background: linear-gradient(180deg,#56F0D6 0%,#8499FD 99%);
`


export type IHeaderMobile = {
  clickToOpenMenuDrawer: () => void;
  clickToOpenUserLoginStatusModal: () => void;
}
export const HeaderMobile = (props: IHeaderMobile) => {
  const {isMobile} = useBreakpoint();
  // const [login, setLogin] = useState(false);
  const login = useSelector((state: RootState) => state.app.isLogin);
  const navigate = useNavigate();
  return (
    <header className={cx("w-full h-[52.5px] bg-[#014F4B] px-4 flex flex-row items-center justify-between z-10", {
      "fixed top-0": true || isMobile
    })}>
      <div className={"flex flex-row items-center"}>
        <button className={"mr-4"}>
          <img
            onClick={() => {
              props.clickToOpenMenuDrawer();
            }}
            alt={"menu"} className={"w-[22.5px] h-[22.5px]"} src={`assets/${environment.assetPrefix}/ic_menu.png`}
          />
        </button>

        <button className={"w-[40px]"}>
          <a>
            <img className={""} onClick={() => {
              navigate(PageOrModalPathEnum.IndexPage)
            }} alt={"logo"} src={`assets/${environment.assetPrefix}/logo_h5.png`}/>
          </a>
        </button>
      </div>



      {!login ? (
        <section>
          <RegisterButton className={"text-[#ffffff] font-bold"} onClick={() => props.clickToOpenUserLoginStatusModal()}>Registar Conta</RegisterButton>
        </section>
      ): (
        <>
          <UserMoneyStatusSection/>
          <button onClick={() => {
            navigate(PageOrModalPathEnum.GameSearchPage);
          }}>
            <img alt={"search"} className={"w-[22.5px] h-[22.5px]"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAABWxJREFUWMPtmF+IXOUZh5/fmT/bZDaycWd2e2OpMRW10ilIWwy4UCdIA5WElhbEQsWApYhSCq3QWAn2rorEFhNrxdZQLNhoaexFSzdIakBFamrvqiWEKlHbCYnOTrJ7zve9rxdnz+xsmmazOxM3F3nhMGdmznzznN/3/j1wyS7ZItNyf+AdGtlpbo1wk8M1UUw4VE3qmHPUpMOZ2/Qn6xyUsFUDTt+nKbHDxLboVIycJgoc8vP5VwNcesfEo7rcHrtCnP7YgN2phDY/NeeeCCXrQQnTAmDvUN/3+fujniR3fGZ9OHjBgf1dGlmJfRGmzgLqBkccjsWEGXcmo3RldNb3wL13A5mLez97uT1+wYA779KolHg5wlV9amHwlvBHIuxvNDh2xm4k/z7BjYHk9gDbzan274TLH/j8evvJ0IHdqcy2mY7OVAHrYi5KPxwft90SYamF3zzJhsxLv4jO5sK3HdwTvvmFsbhvpcDJ2T7sHueh4ExFRBQE+K8lfnO9bj87H1iAq8c48p+/xy0RHovzARlAwfXrlz4cuXpoCs+8T9MS/a0vwOaSkdKXxy8LL6/0T149WXkmut9WxAHiT1NjYctQFA4l3R+gVKji0g8GgQWInWy7iX8Wa2bwlQOnKl8cGLjToWGwNeTbRxRvNsZtz6CRvekKThu+IwAhdzFC4K6BgdOUWzOnEucLQkz0yPn67FI2NRafi9K/eiq7b3NffqVdDOzJTbkKIiC3aC8Ms6xawh8CKtYff2Gmet1AwCa/JkpFiT3yqTPy7MDA2KGoXOEIZDFeu9w1youCQ5oIXkSyhgoLEMvJsZAVJVx4kkzk6CsEzpzqQlViZtjAc1Fdw7GFNq40kMIGnTDfLyCfHDawYZNB6nV3Lh0fyIcz6WiRIYLrymd9+QqcyzLKGyN52gmC4Ml7AwFHdLgIugDrN5wo3zhchX1LL+ik4KOzrw1W6cRfiqIRgCzx24cF+1SHRobfslA8/PXtojMQ8PVj4a8R3omCKGHozpdm2TCcUWFkR4S1ERERJu0duNJJmJW1q/CzzKmG2fITL/ri4FyuPXFqzaYI382LBkRx0rtzTw+l+bF1YXfAj+YqQ4DW3IeVXSuF3XPiE5+2aM9nTrXnvwk7755YWdr8H+BN4nQs644IWe7LIjp3//GD6jPPvs2a5SpLxV+JYnL+5jHplRNr5n4+1Ab+5nXhYED35v5WKO23VS6rHN7XqX596QAbbTw+M7IrmL0YYLLX/eVutrHWrV1/QYbQ/R+UH3C0M4IWZjPHpbeifL9Lh0x+bC6qK5JJg42e+BZzbjFYu3iaVu88ojaetHaMdv8x9DH/+U71G9H9Vwa13jDaN85HwItnFIvG/IXrHL0aYaPBeN/03caT1s5lQidLXfC1denvnOSGKP25P0f3/LuoXEUPTd8hTpr4Xnft7CYqpVaE41HMZwqvZ4kd+NFM7XMX7FHV3lOVL0XTXQZbo2u8UDBXuRipCIZeN3zvqe7c0zv7ssGDaa0Zgk1HqPeeW6C2l9R6eOT8lNZKHN8d/TKtXpelXGuJJtwou5J26v6ejc6+dt85KtiP01ozC37A5OML47/anqj16HlAi1Ww+9JaM0Sfjni9LxjbLrX2LAG9KsAA309rzWCeu8dCkLZdaj15DuhVAwa4J601U3zabN6ngehqI1p7/w/0qgIDfCetNTN82lz1vlTYdqf127NArzowwJ1prZmJ6dintIu2Ga3nzoC+KIABvjUPbU69SJMmtd28tb8POrlYgH9T7b6RltkcpHaUMAmgrpJ2L6vSfZz2e3XfoOybEe18//1tlbJvc7HbV9Nac2sYPbRtduQqLtklO7d9BNWLAbpCEviQAAAAAElFTkSuQmCC"}/>
          </button>
        </>
      )}

    </header>
  )
}

const VIPLabel = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  //box-shadow: inset 0 0 36px 5px rgba(255, 219, 0, 0.09);
  border-radius: 10px;
  border: none; /* 取消边框 */
  color: #ffffff;
  margin-top: 6px;
  //float: right;
  font-weight: bold;
  background: url("assets/${environment.assetPrefix}/account_vip.png") no-repeat 3px center/70%;
`

const AvatarBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(data:image/png;base64,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);
  background-size: 100% 100%;
`

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

export const AvatarSrcMap: { [key: number]: string} = {
  1: 'alterar_1.c00fc635.png',
  2: 'alterar_2.9083d2ef.png',
  3: 'alterar_3.79b553f9.png',
  4: 'alterar_4.bb0b3c7c.png',
  5: 'alterar_5.5e0b2dbf.png',
  6: 'alterar_6.cbf95e56.png',
  7: 'alterar_7.e38e8e0b.png',
  8: 'alterar_8.c988f1a4.png',
  9: 'alterar_9.d00377c6.png',
}


export const Avatar = (props: {
  onClickToPopupUserInfoStatusPopover?: () => void;
  big?: boolean;
}) => {

  const userInfo = JSON.parse(AppLocalStorage.getItem('userInfo') || '{}')

  return (
    // <div className={cx("relative", {
    //   "w-[56px] h-[64px] min-w-[56px] min-h-[64px]}": !props.big,
    //   "w-[82px] h-[95px]": props.big,
    // })}>
      <button className={"relative"} onClick={() => {
        props.onClickToPopupUserInfoStatusPopover && props.onClickToPopupUserInfoStatusPopover()
      }}>
        {/*<img className={cx({*/}
        {/*  "w-[56px] h-[64px] min-w-[56px] min-h-[64px]}": !props.big,*/}
        {/*  "w-[82px] h-[95px]": props.big,*/}
        {/*})} alt="avatar" src={`assets/${AvatarSrcMap[userInfo.avatar || 1]}`}/>*/}
        <img className={cx("rounded-full",{
          "w-[56px] h-[56px] min-w-[56px] min-h-[56px]}": !props.big,
          "w-[82px] h-[82px]": props.big,
        })} alt="avatar" src={`assets/${environment.assetPrefix}/ic_avatar_select.png`}/>
        {/*<AvatarBorder/>*/}
      </button>
    /*</div>*/
  )
}

export type IAvatarAccountInfo = {
  className?: string;
}
export const AvatarAccountInfo = (props: IAvatarAccountInfo) => {
  const user: IUserInfo = AppLocalStorage.getItem("userInfo") ? JSON.parse(AppLocalStorage.getItem("userInfo") || ""): {};
  // const vip_level = useSelector((state: RootState) => state.app?.userStore?.userinfo?.vip_level)
  const vip_level = useSelector((state: RootState) => state.app?.vip_level)
  const navigate = useNavigate();

  const imageStyles = {
    marginLeft: '3px', /* 可以根据需要调整间距 */
    marginTop: '1px'
  };

  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'left', // 使用 "left" 代替字符串
  };

  const contentStyles = {
    display: 'flex',
    alignItems: 'center',
  };



  return (
    <section className={cx("flex flex-col items-start text-base", props.className)}>
      <span className={"flex flex-row"}>
        <span className={"text-white mr-2"}>ID:{user.user_id}</span>
        <button>
          <img className="w-[22px] h-[20px]" alt={"copy"} src={`assets/${environment.assetPrefix}/ic_copy.png`}/>
        </button>
      </span>
      <div style={contentStyles}>
        <VIPLabel className="" onClick={() => navigate(PageOrModalPathEnum.VIPGradePage)}>
      <span className={'mr-6'}>VIP. {vip_level}</span>
      {/*<img src={"assets/001/Seta.png"} alt="箭头" width="35px" height="50px" style={imageStyles} />*/}
        </VIPLabel>
        {/*<RightOutlined className="mt-1 mr-8" style={{ fontSize: 25, color: 'white', fontWeight: 1000 }} onClick={() => navigate(PageOrModalPathEnum.VIPGradePage)}/>*/}
      </div>


    </section>
  )
}




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
      backgroundColor: '#013E42', // 设置背景颜色
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
