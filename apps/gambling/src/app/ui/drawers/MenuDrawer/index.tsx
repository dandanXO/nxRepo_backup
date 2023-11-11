import styled from "styled-components";
import useBreakpoint from "../../hooks/useBreakpoint";
import cx from "classnames";
import {BackgroundButton} from "../../components/BackgroundButton";
import {useLocation, useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../reduxStore";
import {appSlice} from "../../../reduxStore/appSlice";
import {environment} from "../../../../environments/environment";
import {uiSlice} from "../../../reduxStore/uiSlice";

const HomeButton  = styled(BackgroundButton)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: url(assets/${environment.assetPrefix}/btn_home.png) no-repeat center/100%;
  height: 40px;
`

export type IMenuDrawer = {
  className?: string;
  children: React.ReactNode;
  // openMenuDrawer: boolean;
  // closeMenuDrawer: () => void;
}
export const MenuDrawer = (props: IMenuDrawer) => {
  const {isMobile} = useBreakpoint();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {isLogin, isShowLoginModal} = useSelector((state: RootState) => state.app)

  const {openMenuDrawer} = useSelector((state: RootState) => state.ui);

  const closeMenuDrawer = () => {
    dispatch(uiSlice.actions.setOpenMenuDrawer(false));
  }

  return (
    <div
      className={cx("", {
        "fixed right-0 top-0 bottom-0 left-0 z-30 w-full bg-[#090B0F] bg-[rgba(0,0,0,0.6)]": isMobile && openMenuDrawer,
      })}
      onClick={() => {
        closeMenuDrawer();
      }}
    >
      <div
        className={cx("bg-[#013E42] p-4 flex flex-col flex-between",
          "fixed bottom-0 w-[276px] min-w-[276px] h-full z-30",
          {
            "ease-in-out duration-300": isMobile,
            // "w-[0px]": !isShowDesktopMenuDrawer,
            "left-[-276px]": isMobile && !openMenuDrawer,
            "flex left-0": openMenuDrawer,
          },{
            "top-0": isMobile,
            "top-[130px]": !isMobile,
            "rounded-tr-lg": !isMobile,
          },
          props.className,
        )}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {/* 添加一个去背的背景图片*/}
        <div className="absolute inset-0 z-[-1] bg-no-repeat bg-center"
             style={{
               background: '#013E42',
               backgroundSize: '100% 40%',
               backgroundPosition: 'center bottom',
               borderRadius: '0 20px 0 0',
             }}
        ></div>

        {isMobile && (
          <div className={"flex flex-row justify-end mb-2"}>
            <button>
              <img
                onClick={() => closeMenuDrawer() }
                className="w-[20px] h-[20px]" alt={"close"} src={"data:image/png;base64,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"}
              />
            </button>
          </div>
        )}

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

        <section className={"flex flex-col"}>
          {props.children}
        </section>

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

      </div>
    </div>

  )
}
