import useBreakpoint from "../../pageTemplate/hooks/useBreakpoint";
import cx from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../reduxStore";
import {uiSlice} from "../../../reduxStore/uiSlice";
import styled from "styled-components";
import {environment} from "../../../../environments/environment";

const StyledMenuDrawerContainer = styled.div`
  background: url(assets/${environment.uVersion}/bg_sidebar_mobile.png);
`

export type IMenuDrawer = {
  className?: string;
  children: React.ReactNode;
  // openMenuDrawer: boolean;
  // closeMenuDrawer: () => void;
  isTabletShow?: boolean;
  isShowCloseButton?: boolean;
}
export const MenuDrawerContainer = (props: IMenuDrawer) => {
  const dispatch = useDispatch();
  const {isMobile} = useBreakpoint();
  const {openMenuDrawer} = useSelector((state: RootState) => state.ui);
  const tabletShow = props.isTabletShow === undefined ? true : props.isTabletShow;
  const showCloseButton = props.isShowCloseButton === undefined ? true : props.isShowCloseButton;

  const closeMenuDrawer = () => {
    dispatch(uiSlice.actions.setOpenMenuDrawer(false));
  }

  if(!isMobile && !tabletShow) return ;

  return (
    <div
      className={cx("", {
        "fixed right-0 top-0 bottom-0 left-0 z-30 w-full bg-[#090B0F] bg-[rgba(0,0,0,0.6)]": isMobile && openMenuDrawer,
      })}
      onClick={() => {
        closeMenuDrawer();
      }}
    >
      <StyledMenuDrawerContainer
        className={cx("py-8 px-6 flex flex-col flex-between",
          "border-r border-r-[var(--drawer-border)]",
          "fixed bottom-0 w-[276px] min-w-[276px] h-full z-30",
          "bg-[var(--drawer-bg)]",
          "overflow-auto",
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
        {/*<div className="absolute inset-0 z-[-1] bg-no-repeat bg-center"*/}
        {/*     style={{*/}
        {/*       background: '#013E42',*/}
        {/*       backgroundSize: '100% 40%',*/}
        {/*       backgroundPosition: 'center bottom',*/}
        {/*       borderRadius: '0 20px 0 0',*/}
        {/*     }}*/}
        {/*></div>*/}

        {isMobile && showCloseButton && (
          <div className={"flex flex-row justify-end"}>
            <button>
              <img
                onClick={() => closeMenuDrawer() }
                className="w-[40px] h-[40px]" alt={"close"} src={`assets/${environment.uVersion}/icon=close.png`}
              />
            </button>
          </div>
        )}

        <section className={"flex flex-col"}>
          {props.children}
        </section>

      </StyledMenuDrawerContainer>
    </div>

  )
}
