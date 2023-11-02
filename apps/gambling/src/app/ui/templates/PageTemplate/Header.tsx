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

const RegisterButton = styled.button`
  width: 198px;
  height: 30px;
  background: url("assets/balance-bg-7d6b8cd6.png") no-repeat center/100% 100%;
  color: #fff;
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
    <header className={cx("w-full h-[52.5px] bg-[#284B39] px-4 flex flex-row items-center justify-between z-10", {
      "fixed top-0": true || isMobile
    })}>
      <div className={"flex flex-row items-center"}>
        <button className={"mr-4"}>
          <img
            onClick={() => {
              props.clickToOpenMenuDrawer();
            }}
            alt={"menu"} className={"w-[22.5px] h-[22.5px]"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAAA0NJREFUWMPtWL9rHEcU/t7M27vTORDrjIs0ghCTziYQq0gCBpdGDu6TKpX/AruWSRNwl79BkE5FSBdsYzVJkUCwOmMwuHFhsBRhrc+Kdj4X+2tmdvduQ4KkYj9Y7s17b3fezM28b+YBAwYMGLAI0qa8ycmaziem66UJ5p4c25r6Lnnc5TMHzATu9sr8xdKAb707dxlGnpRtek4WgCFhKxmwoCfDs3l+ACxLudCz0IOeXPtZECq48t0HR7t+fNoYgcAyGpEAsGT0UcJAgk7yYKRlUIU/AZVaZ4IAm74Q2ji+ZsCJSXnMt5B8Ym3RuREvWKlnxxTtPACBkpVvbgtn2qDwLwclXvD+PwAwUZMOu3bAgLNIHDeI8Ufp9MI00i9qryzxHb1LD2/P8Pd/DVjblGtH0zti8T0jgmCVR/PUAy+PoiILgQUroilJQUejP4Gjq32Cevjabggg12fZL7GtlX4tYLUYjZJQEAogKQKobZ5cPaxtLNoktB5jJ0jIgz3dtEZ+VpHPe89wQqYCuIpqpZgpiRjMIwAT+JVMWBONJReSwKM9nN850C0FNvJ/zfVfwyeNx29Gl5FxWxwvWZTLym2ur7p7vZbEiQb72n6Df9xv1vFSvvykWIbtONWAd/b1vjGypcA5BZGUe4boDFhPM2AFKG1HURDWncEZ/vL88V0VfpsAh2FWwtlcEgCw/mH2kyL7IhE+s2SQLnsvifvp+I4hfjCIbxFtNwwGtw3Tcpso/H+/tnr8VVt/V2bYfb7n1jPYLSE3ym/1nmGlTC1hlDDq8sc6GiULubCRnlzoPZt6Nm2ydYCPV7H/ySz7eiTYVMCpc/1nOIHLAFlwD4sII94wjTseYSDZ0oONgIC79/IV/pAOjmhV/kiMJTr8LDwIpcAKUk+bIn7XWRxe/R8OPwMGDDjtK9L2wfhTwP2lgAREEaU1U/B9adPK3jwXGEqQ7rT6XlhNMuLVxgjC4DO5iKeLKz+Zm1qDlbhW5rOXCXJ0WA9rlJ/inB3l9rIfKQt54e90KXGMEsnkmI3Oa1KIa2cMBhWUseL3O4io8xbhkPUijl/fTtZ0XtN2XgqdLy2fBqXWeQ+fRRjDyQwvhl07YMCAf4f3bFNE6dt1HxoAAAAASUVORK5CYII="}
          />
        </button>

        <button className={"w-[40px]"}>
          <a>
            <img className={""} onClick={() => {
              navigate(PageOrModalPathEnum.IndexPage)
            }} alt={"logo"} src={"assets/001/logo_catonly.png"}/>
          </a>
        </button>
      </div>



      {!login ? (
        <section>
          <RegisterButton className={"font-bold"} onClick={() => props.clickToOpenUserLoginStatusModal()}>Registar Conta</RegisterButton>
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
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  //box-shadow: inset 0 0 36px 5px rgba(255, 219, 0, 0.09);
  border-radius: 10px;
  border: none; /* 取消边框 */
  color: #fffa05;
  font-family: ERASBD;
  margin-top: 6px;
  float: right;
  font-weight: bold;
  background: url("assets/001/vip.png") no-repeat 3px center/70%;
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
        })} alt="avatar" src={"assets/001/avatar.png"}/>
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

  return (
    <section className={cx("flex flex-col items-start text-base", props.className)}>
      <span className={"flex flex-row"}>
        <span className={"text-white mr-2"}>ID:{user.user_id}</span>
        {/*<button>*/}
        {/*  <img className="w-[22px] h-[20px]" alt={"copy"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAkBAMAAAAX21WWAAAALVBMVEUAAAD///////////////////////////////////////////////////////+hSKubAAAAD3RSTlMAslqHLVh8VSU4cCENn3Foj007AAAAbUlEQVQoz2MgDbAkG0NAJkKMVxAGGuBibHCxAoTCFhcw8BMMwDCXCZ/YNGOYpXAxDkGEpTAxdoRYAVQMqH4JxFIvQQWEmALUgpEoVoAhxi24AUOM4QyCiWCQKoYIeyAXI46AXIy4BHIx4pwkAABWmSbbBWXeeAAAAABJRU5ErkJggg=="}/>*/}
        {/*</button>*/}
      </span>
      <VIPLabel>VIP {vip_level}</VIPLabel>
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
      backgroundImage: 'url("assets/001/top_di.png")', // 替换成背景图片路径
      backgroundSize: 'cover', // 调整背景图片大小以填充整个元素
      backgroundPosition: '90% 50%', // 调整背景图片位置
      backgroundRepeat: 'no-repeat', // 禁止背景图片重复
      backgroundColor: '#284B39', // 设置背景颜色
    }}>
      <div className={"w-[276px]"}>
        <a>
          <img onClick={() => {
            navigate(PageOrModalPathEnum.IndexPage)
          }} alt={"logo"} src={"assets/001/LOGO.png"}/>
        </a>
      </div>

      <div className={"w-[250px] hidden xl:block"}>
        <WebsiteButton/>
      </div>

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
                <img className="w-[36px] h-[36px] min-w-[36px] min-h-[36px]" alt={"notification"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIzMDg4NjZENjk5MzExRUU5RUUwOEM0MjFGODdBNDJDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIzMDg4NjZFNjk5MzExRUU5RUUwOEM0MjFGODdBNDJDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjMwODg2NkI2OTkzMTFFRTlFRTA4QzQyMUY4N0E0MkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjMwODg2NkM2OTkzMTFFRTlFRTA4QzQyMUY4N0E0MkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5ydrm2AAADJElEQVR42tSZWWgTQRjHZ2to631RibcgCl4vpT6oRcQDK1iPvni+eKCI6IuKUI8HqyAqgogHgorghSAVKyaoGKn6IB4P6ouopFZEpWpb04CkSeP/2/1itptNMmvb7OQPP8hkZ7v/fLMz831TLd4iuqIxYA4oB9PAcDAExEEIfAVvwDNwDwT/90FazLlRMrIFzAILQYGDe5+Ax+ASeOfIaLRZuu84sBFsAwNE13USnANvpYxG5IxuAKdAkeh+1YD9WY3++ZX1D90EVaJnRe/xPNCU1mg4vdGB/E5NFbkROVkAXtkaDf20vWkE8PNMzqVCvIK8TjHaYm/0Axgv3FEbmAw+m7/0dMRTOvpdNEnqB16CYZ2Mxjp3WsFro9sqARfA+n9D/y05z7wcbo9QR9PBCyOiyaHfqphJ0hEwV4/op+/6F4N5Xy4S6omMBhLv6GZFTZI2GUaNoa8U6moR6OWJxvUZNlNho7RDLqWILhHqq8oTFWJGHhidQBGdlAdGS+gdHeXwpgAnuyPTpH/XwA9hjFSZ5VqMd5x23gWHSj6zD0XUybLk51mY0EGwx9TeBY6Z2nVgMX+O8Jr4lNsHwHMwWuK5xVp9o2h1UFpMBO9N7b6cmmmgEYy19C/nGol0nksZsw6BaonnttJkcmLUGv3CNJ/t+hfbXO8t+dz2Agx9Ey36kpwFhab2UaDxZy84bLo2CFSb2qvAMlO7DKyUfG6YJhOVraWSv4xK5I/gISe31smyG8zmUriCM7KEqKyuBbc4OV7rYG40a3VBvUY/rfjydJuSEl8erKO1NPQNXPmVKmoyohvl7CmgsNEH+vLERs+AHYoavaKXIlGjQTP5ssOZmAvRCcpVa820T0GjO5PlctJoA+/dexUx+UgYZ6opRhNRXQ6mKGC0MtMBBIkOxX6D/i5Xnm3ZjnRq0iQQudJqXi5Fpohud/kdXcOJd4rMEZ0PTri4+1TYRdIaUaqb7rhk8j5YB75k6kQR9XLaluuTEipDjoPrMp09HULcsOSNPamwMLK1u+Cikxspoj4e+u6MKH6/iLIxOtgMcqHnExn+oZBJfwUYAMQSF6v9PklxAAAAAElFTkSuQmCC"}/>
                {messageCount !== 0 && <MessageCountBadge>{messageCount}</MessageCountBadge>}
              </Notification>
            </button>
          </section>

          <section className={""} onClick={() => {
            props.onClickToChangeLogoutPopover(!props.openLogoutPopover);
          }}>
            <button>
              <img className="w-[36px] h-[36px] min-w-[36px] min-h-[36px]" alt={"logout"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAArCAYAAAAKasrDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJFRjY5NkIzNjk5MzExRUVCQkFGOEUyM0Q4NDMyMEE3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJFRjY5NkI0Njk5MzExRUVCQkFGOEUyM0Q4NDMyMEE3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkVGNjk2QjE2OTkzMTFFRUJCQUY4RTIzRDg0MzIwQTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkVGNjk2QjI2OTkzMTFFRUJCQUY4RTIzRDg0MzIwQTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6nBmyPAAAC1klEQVR42sSYPWgUQRTHZ5M7IfGLgBpBUTGFdoYUFsGURlSwEK4K+NFEVIhiExAiSUwQI4Lxk7QBO63SBC2TQEBEYqeiNiqInHoRg5i7Xf/vnAnLMLc7szO7++B3O/vxZt+9mX1v5nlBEDBW8UqMsTtgI8tGZkCfzoMeGehXvBW0W1i2chTMxj1UoB/YWFPc+wFegPVgO/0ZC2Oo/1awI3Rtp45i3UCfsT84bFDc/wKGwCcHHmsCl8Ftfr6ib2CgvNcGzoDj4B54DD5YGAg/sOdJ/lVdM4KtYBS8B5Og3Y/XierLSKduYC3QZgB8BFNgm4GewDPV0fGgTAvoB2/BVQtvalEQHkwgm8E42A3OpRWLmkQMsKAftNfs+1Fi40HZm18tnORHhhkHBlYtdDt5KLve2MDs0ltrqC3yfhmMgi3gUloe1BXKTPM8bYqgX6FsCwbAdzCSp4EvQY90rZn9T7W0WBnmAzqW1xCrpCyd01z8CybWDKy68+A+cJYPmY6s8ghQlK7f5F6963qIu8Cgo74myUjXHlx2PPxTWX8kxlKwjbIRcc6FTLv2IMW5hajUpchAFF4OinVBSJ6A067nIBl3KIGevGmjXV8pj0Ctkk0Kz5XSmoNxQju5E7xN+5N3PAY2h66V8kx1FCcf8PZ5biC9fR14DXrVX3F2Bv4OtX/xYwd4Bk6muR5MIuKttKo5Eh0H8/1IyrGBOufVTHwmyXCIV/MyULckspzIwKpd5UqEjM+ivwaeoz3IRWklre3BNksDHybQKZpUtxZx6M54/s/pe5CxYzhcA1cSvox2Yt8UKxJZPB40lngWiZV6Cfj+m7UpeADcAocNDfTScrNc3VoCvaAHvDKoQu3Nuro1zxP7KT70HXkF6rj64DTYD8bAz7RrgQ0rrFSjjqAKhsAeMBHzrHNMKqwVMAg6wSPpXjHVOeibpToKERfAU3AD7Aqt7ZzLPwEGAJ0JMVtPxt9rAAAAAElFTkSuQmCC"}/>
            </button>
          </section>

        </section>
      )}
    </header>
  )
}
