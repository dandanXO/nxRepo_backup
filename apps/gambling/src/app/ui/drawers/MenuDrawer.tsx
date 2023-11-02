import styled from "styled-components";
import useBreakpoint from "../hooks/useBreakpoint";
import cx from "classnames";
import {WebsiteButton} from "../components/WebsiteButton";
import {BackgroundButton} from "../components/BackgroundButton";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../PageOrModalPathEnum";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reduxStore";
import {appSlice} from "../../reduxStore/appSlice";

const DepositButton = styled(BackgroundButton)`
  background: url(assets/001/btn_FirstDeposit.png) no-repeat center/100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

const CashBackButton = styled(BackgroundButton)`
  background: url(assets/001/btn_cashback.png) no-repeat center/100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

const HomeButton  = styled(BackgroundButton)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: url(assets/001/btn_home.png) no-repeat center/100%;
  height: 40px;
`

type IStyledDrawerButton = {
  className?: string;
  // hover: boolean;
}
const StyledDrawerButton = styled.button.attrs<IStyledDrawerButton>(props => ({
  className: cx("text-base !font-bold md:!h-[50px]", props.className, {
    // "text-transparent": props.hover,

  })
}))`

  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 55px;
  box-sizing: border-box;

  //background: gray;
  margin-top: 12px;
  font-weight: 600;

  padding: 4px 14px;
  border-radius: 8px;
  box-shadow: inset 0 0 3rem 0.1rem rgba(255,255,255,.08);
`

type IDrawerButton = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  // active?: boolean;
}
const DrawerButton = (props: IDrawerButton) => {
  const [hover, setHover] = useState(false);

  return (
    <StyledDrawerButton
      // active={props.active}
      className={props.className}
      // hover={hover}
      onMouseOver={() => {
        setHover(true)
      }}
      onMouseOut={() => {
        setHover(false)
      }}
      onClick={() => props.onClick && props.onClick()}
    >{props.children}</StyledDrawerButton>
  )
}
export type IMenuDrawer = {
  closeMenuDrawer: () => void;
  className?: string;
  openMenuDrawer: boolean;
}
export const MenuDrawer = (props: IMenuDrawer) => {
  const {isMobile} = useBreakpoint();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {isLogin, isShowLoginModal} = useSelector((state: RootState) => state.app)

  return (
    <div className={cx("", {
      "fixed right-0 top-0 bottom-0 left-0 z-30 w-full bg-[#090B0F] bg-[rgba(0,0,0,0.6)]": isMobile && props.openMenuDrawer,
    })} onClick={() => {
      props.closeMenuDrawer();
    }}>

      <div className={cx("bg-[#274B38] p-4 flex flex-col flex-between", props.className, {
        "top-0": isMobile,
        "top-[130px]": !isMobile,
        "rounded-tr-lg": !isMobile,
      })} onClick={(event) => {
        event.stopPropagation();
      }}>
        {/* 添加一个去背的背景图片*/}
        <div className="absolute inset-0 z-[-1] bg-no-repeat bg-cover bg-center"
             style={{ backgroundImage: 'url("assets/001/Sidebar_Shading.png")',
               backgroundSize: '100% 40%',
               backgroundPosition: 'center bottom',}}></div>

        {isMobile && (
          <div className={"flex flex-row justify-end mb-2"}>
            <button>
              <img
                onClick={() => props.closeMenuDrawer() }
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
                <img className={"w-[24px] h-[24px] mr-2"} alt={"home-open"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXCAYAAADk3wSdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE3REVFOTNCNjk5MzExRUU5QkFDRkU1MjJFNzMwQkI3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE3REVFOTNDNjk5MzExRUU5QkFDRkU1MjJFNzMwQkI3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTdERUU5Mzk2OTkzMTFFRTlCQUNGRTUyMkU3MzBCQjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTdERUU5M0E2OTkzMTFFRTlCQUNGRTUyMkU3MzBCQjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6/1cPJAAABhElEQVR42qyUPUvDQBjHrySxKA51chCsg+AmKAiCiDq5C24iKtrBjyB+APEbqIvgN3B2Ed9LfRmEDoKTiKiDdLBpNBf/j73YS3uXpCZ/+ME1ufz6XO7yZIreEIuRRbANKmAO3IdNNr89L0q4CvbEuBeUwBS40kq/wqUrktBPFpyCCVBUSh2ulRbAjq4YUekouG25WfO46qHlEKEcEo+Dm6CUt0jXwC6LFwtciHd8KUkDy19qQ+inA5yDMXD9K7UblRZiLlmVjDgVJC6Z1bp0IYFQzhmYMW2Xz2NwwNIJvYojqnSfpZtOkr5iMJCm1ay6Ln3LW4CaQD6h787fKPoiZoEBHkH/P4XHYLpeaeNIueAlgfRZWj5vbhbNoT87BB/i9yCYVMzr+pPanEdVcCJ6qJwn0KfdqBjSiuLaZ+ju2zyySWc1rU8vrUVX2v45dYL91NS0tziVWrrOn1NM7lZcy4XtvtGzzhjVKjDACKCD5oB3sAnK0hzCAsPSvDewAR7o/o8AAwAVmIm73jKj6gAAAABJRU5ErkJggg=="}/>
              ): (
                <img className={"w-[24px] h-[24px] mr-2"} alt={"home-open"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXCAYAAADk3wSdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE3REVFOTNCNjk5MzExRUU5QkFDRkU1MjJFNzMwQkI3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE3REVFOTNDNjk5MzExRUU5QkFDRkU1MjJFNzMwQkI3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTdERUU5Mzk2OTkzMTFFRTlCQUNGRTUyMkU3MzBCQjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTdERUU5M0E2OTkzMTFFRTlCQUNGRTUyMkU3MzBCQjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6/1cPJAAABhElEQVR42qyUPUvDQBjHrySxKA51chCsg+AmKAiCiDq5C24iKtrBjyB+APEbqIvgN3B2Ed9LfRmEDoKTiKiDdLBpNBf/j73YS3uXpCZ/+ME1ufz6XO7yZIreEIuRRbANKmAO3IdNNr89L0q4CvbEuBeUwBS40kq/wqUrktBPFpyCCVBUSh2ulRbAjq4YUekouG25WfO46qHlEKEcEo+Dm6CUt0jXwC6LFwtciHd8KUkDy19qQ+inA5yDMXD9K7UblRZiLlmVjDgVJC6Z1bp0IYFQzhmYMW2Xz2NwwNIJvYojqnSfpZtOkr5iMJCm1ay6Ln3LW4CaQD6h787fKPoiZoEBHkH/P4XHYLpeaeNIueAlgfRZWj5vbhbNoT87BB/i9yCYVMzr+pPanEdVcCJ6qJwn0KfdqBjSiuLaZ+ju2zyySWc1rU8vrUVX2v45dYL91NS0tziVWrrOn1NM7lZcy4XtvtGzzhjVKjDACKCD5oB3sAnK0hzCAsPSvDewAR7o/o8AAwAVmIm73jKj6gAAAABJRU5ErkJggg=="}/>
              )}
              <span className={cx({
                "text-transparent": location.pathname === PageOrModalPathEnum.IndexPage,
              })}>Página Inicial</span>
            </HomeButton>
          </section>
        )}

        <section className={"flex flex-col"}>

          <DepositButton className={cx("flex text-base font-bold mb-3", {
            "active-drawer-button": location.pathname === PageOrModalPathEnum.InitialChargePage
          })} onClick={() => {
            if(!isLogin) {
              dispatch(appSlice.actions.showLoginDrawerOrModal(true))
            } else {
              navigate(PageOrModalPathEnum.InitialChargePage)
            }
          }}>
            {/*<span className={"pr-4"}>*/}
            {/*{location.pathname === PageOrModalPathEnum.InvitePage ? (*/}
            {/*  <img className="w-[25px] h-[25px] ml-0" alt={"invite"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI5MjBBODVCNjk5MzExRUVBNUFEQzMzMzBBNTBEN0I1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI5MjBBODVDNjk5MzExRUVBNUFEQzMzMzBBNTBEN0I1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjkyMEE4NTk2OTkzMTFFRUE1QURDMzMzMEE1MEQ3QjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjkyMEE4NUE2OTkzMTFFRUE1QURDMzMzMEE1MEQ3QjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz58EsXKAAAC1ElEQVR42syYa4hMYRjHz4zZkLCYEFFyFx9EblGkECFJZBuX4pP7paWwkbtWUuQakWKJL4Qily++uIVds7LYD0RiWbksi/F/6r/1dDrnzJndZ2c89eu87/OemfnPe3me55xI6rNjYU3BCjAX9AGl4BjYC/5m8kURA0HdwWXQi/37YBDbSTAavA/7ZVGD2bmixGwFg8E08AL0Bbcz+Z2GCpIl6sn2QrAerAMp8JF+WcKZ1oLGgI4e/imqXc3rW7AdDFFj4ywFyT03QJmajTrLU+2zoATcBP3AATXWwlJQOy5BW27SeWrstWofAj/BFvbvqbFKS0H5chrZbgKOg03sF6v7noI5oAAscI0dsRTUysNXBDqAl2ADfRJzysEkCmhD/xrw3FJQxMd/gVdZoiWgBvQGl+ivAivBLvbHWwma6uMfAQ6yvQ/EuVwSsWeD9mAPx8+Bq1zuWEMidSHYmUbwLbCRAdArXGwDw5TvIRgJvmcqaBH/ucO9IvtjYoCwZzyFb0Bn0B/08Lm3jOOhBQ0Aj1W/gvukmjORZ5ByToFEWEEVTJraJMY0A6fBLMfGJAk/8NvUMZ6oZUpMrQp+Z1QssrKjbkeMp+UwI/Fv0MUlOMkjK4FvAjO5lQ3k9niil+wOrsPTfPAi+AWmO/YmAXW5nqEwG3Sy03g2gzWVBNK7IuiHk1vrxKAptiPq/F+2NhqQq3JhxbJkLXMsoopxTR4EHkVdETkXJmnpmoipO2VLwSvQlUEvkWVB59OljutgbBYFxdUTimc9VJhFMSe0mKDkejJLSycH6muYinE++NDIYhJuMUGC/gRVdQa2m/VQRjW1VIBDwTtjMZvB6voW+aV8Ci0xEFLJErjI6nVMDd8D1dcWg/1WLxta+7x4SgXsQa9iMK3FQgqSWrq5h38VS4c4/9w38InP9fkeAdBM0BfmvG7KV8sclPS4X6rQUa4ZKw/zQ/8EGAA3PZ3uS0v8DAAAAABJRU5ErkJggg=="}/>*/}
            {/*): (*/}
            {/*  <img className="w-[25px] h-[25px] ml-0" alt={"invite"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI5MjBBODVCNjk5MzExRUVBNUFEQzMzMzBBNTBEN0I1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI5MjBBODVDNjk5MzExRUVBNUFEQzMzMzBBNTBEN0I1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjkyMEE4NTk2OTkzMTFFRUE1QURDMzMzMEE1MEQ3QjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjkyMEE4NUE2OTkzMTFFRUE1QURDMzMzMEE1MEQ3QjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz58EsXKAAAC1ElEQVR42syYa4hMYRjHz4zZkLCYEFFyFx9EblGkECFJZBuX4pP7paWwkbtWUuQakWKJL4Qily++uIVds7LYD0RiWbksi/F/6r/1dDrnzJndZ2c89eu87/OemfnPe3me55xI6rNjYU3BCjAX9AGl4BjYC/5m8kURA0HdwWXQi/37YBDbSTAavA/7ZVGD2bmixGwFg8E08AL0Bbcz+Z2GCpIl6sn2QrAerAMp8JF+WcKZ1oLGgI4e/imqXc3rW7AdDFFj4ywFyT03QJmajTrLU+2zoATcBP3AATXWwlJQOy5BW27SeWrstWofAj/BFvbvqbFKS0H5chrZbgKOg03sF6v7noI5oAAscI0dsRTUysNXBDqAl2ADfRJzysEkCmhD/xrw3FJQxMd/gVdZoiWgBvQGl+ivAivBLvbHWwma6uMfAQ6yvQ/EuVwSsWeD9mAPx8+Bq1zuWEMidSHYmUbwLbCRAdArXGwDw5TvIRgJvmcqaBH/ucO9IvtjYoCwZzyFb0Bn0B/08Lm3jOOhBQ0Aj1W/gvukmjORZ5ByToFEWEEVTJraJMY0A6fBLMfGJAk/8NvUMZ6oZUpMrQp+Z1QssrKjbkeMp+UwI/Fv0MUlOMkjK4FvAjO5lQ3k9niil+wOrsPTfPAi+AWmO/YmAXW5nqEwG3Sy03g2gzWVBNK7IuiHk1vrxKAptiPq/F+2NhqQq3JhxbJkLXMsoopxTR4EHkVdETkXJmnpmoipO2VLwSvQlUEvkWVB59OljutgbBYFxdUTimc9VJhFMSe0mKDkejJLSycH6muYinE++NDIYhJuMUGC/gRVdQa2m/VQRjW1VIBDwTtjMZvB6voW+aV8Ci0xEFLJErjI6nVMDd8D1dcWg/1WLxta+7x4SgXsQa9iMK3FQgqSWrq5h38VS4c4/9w38InP9fkeAdBM0BfmvG7KV8sclPS4X6rQUa4ZKw/zQ/8EGAA3PZ3uS0v8DAAAAABJRU5ErkJggg=="}/>*/}
            {/*)}*/}
            {/*</span>*/}
            <div className={"flex flex-col"}>
              <div>Primeiro Depósito</div>
              <div className={"flex"}>+ 20%</div>
            </div>
          </DepositButton>

          <CashBackButton className={cx("text-base font-bold mb-3", {
            "active-drawer-button": location.pathname === PageOrModalPathEnum.RechargeActivityPage
          })} onClick={() => {
            if(!isLogin) {
              dispatch(appSlice.actions.showLoginDrawerOrModal(true))
            } else {
              navigate(PageOrModalPathEnum.RechargeActivityPage)
            }
          }}>
          {/*   <span className={"pr-4"}>*/}
          {/*  {location.pathname === PageOrModalPathEnum.InvitePage ? (*/}
          {/*    <img className="w-[25px] h-[25px]" alt={"invite"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAlCAYAAAC6TzLyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkREMEMxOTZFNjk5MzExRUU5NDA0Q0JGOENDOEFFMEMyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkREMEMxOTZGNjk5MzExRUU5NDA0Q0JGOENDOEFFMEMyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REQwQzE5NkM2OTkzMTFFRTk0MDRDQkY4Q0M4QUUwQzIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REQwQzE5NkQ2OTkzMTFFRTk0MDRDQkY4Q0M4QUUwQzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7JA6jAAAADMElEQVR42rSYaYiNURjH71yXyZgxdzAMmmu7KUyIIWWJDyLNTERm8VXG5IuEEvkoasZWJvJFIqZskeUDSnaThGHElOVaxhIz9nWu/1P/o9Pbvfec897x1K/ue8/7nOdsz3LejHhbwFbKwGLwFbRpfNB+N4Nnth1mOBg/A2YZ3pGB9QcfbToMpmjLBoO055MW/YnRZeAmqEpn5rfAWHAe7ALXwWPRSdHfEzDYM+CFXBEn419Alvb8mqvRI+Amk8GVRA2hFEpZnud+AXep5YoFXI2nI79BOTji58DlpGl8vcmwac/XggmgA0wDvS0Ny4lfBIaDMPgBGsFZ9uXs57KEBy3eewWqwVHQxdPWxEHdcTUuHVWCQq5AT9CNbZ/AG3AbjAF9wQAwELwDvcAkuqisykxww+XA5dFXT4MH4LvW1h1MBMvBXP63DczX3hkHDjMGnADFIGYz8yg4ByJ87uBsRX6C/AQ6v0AReOjp5yroAzaCNUGD4Rn004jHQ3JJfhK9ruCAtjUiLUxODWC/ac9rwPY0Y8EhUAH+2Pq5HIw6UN8JQWgB2Jvg5Cc1vhmsMHQaBxfpvyapSjYA77LXcMYmecqTG2YxYSOSGZcmm7lEpK0WnUilslsrHlZS755Br5oknLnk3jmGDsTlSjx+rkT8fItB/xtd7qVufDQjlEmmgkuM9asYYMTn28EIBhuT7OT2/jO+Cay2UBR/jzFjzfPpAbJVBTJoteclloqjtJTZ7NO4FCml6sDlcMlspI6JpYlbJcXiWx8DmK2MjzcUhbqM5NkoZbVSTy9pcDRerIxHHRUlVR6ndwzlZaHSpnLRZJgyHvG5d+KWd3ny45YxQokknHCQhUEgjcNTxt+trsquiaOFES6Xg34B9rCtyLG6bQ+paGMpO5Isr5RKGxz6eSRbFWJZZCsVXK374BT3bh1Y4nipuKAiXDYLvUwHZT9ZTRcJw41y4D5rWcpWCljl1PowfEzVASq257GcjQb+r8Q461Y9n8vSTU92m+wkuQam6C7prWSC/PpQzheHGD4g2NxgLoN9jIpxl+tSJmN3Id1Jkchv1XeZ9+A5PxSk/DzyV4ABAFlCxwbz2qycAAAAAElFTkSuQmCC"}/>*/}
          {/*  ): (*/}
          {/*    <img className="w-[25px] h-[25px]" alt={"invite"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAlCAYAAAC6TzLyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkREMEMxOTZFNjk5MzExRUU5NDA0Q0JGOENDOEFFMEMyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkREMEMxOTZGNjk5MzExRUU5NDA0Q0JGOENDOEFFMEMyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REQwQzE5NkM2OTkzMTFFRTk0MDRDQkY4Q0M4QUUwQzIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REQwQzE5NkQ2OTkzMTFFRTk0MDRDQkY4Q0M4QUUwQzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7JA6jAAAADMElEQVR42rSYaYiNURjH71yXyZgxdzAMmmu7KUyIIWWJDyLNTERm8VXG5IuEEvkoasZWJvJFIqZskeUDSnaThGHElOVaxhIz9nWu/1P/o9Pbvfec897x1K/ue8/7nOdsz3LejHhbwFbKwGLwFbRpfNB+N4Nnth1mOBg/A2YZ3pGB9QcfbToMpmjLBoO055MW/YnRZeAmqEpn5rfAWHAe7ALXwWPRSdHfEzDYM+CFXBEn419Alvb8mqvRI+Amk8GVRA2hFEpZnud+AXep5YoFXI2nI79BOTji58DlpGl8vcmwac/XggmgA0wDvS0Ny4lfBIaDMPgBGsFZ9uXs57KEBy3eewWqwVHQxdPWxEHdcTUuHVWCQq5AT9CNbZ/AG3AbjAF9wQAwELwDvcAkuqisykxww+XA5dFXT4MH4LvW1h1MBMvBXP63DczX3hkHDjMGnADFIGYz8yg4ByJ87uBsRX6C/AQ6v0AReOjp5yroAzaCNUGD4Rn004jHQ3JJfhK9ruCAtjUiLUxODWC/ac9rwPY0Y8EhUAH+2Pq5HIw6UN8JQWgB2Jvg5Cc1vhmsMHQaBxfpvyapSjYA77LXcMYmecqTG2YxYSOSGZcmm7lEpK0WnUilslsrHlZS755Br5oknLnk3jmGDsTlSjx+rkT8fItB/xtd7qVufDQjlEmmgkuM9asYYMTn28EIBhuT7OT2/jO+Cay2UBR/jzFjzfPpAbJVBTJoteclloqjtJTZ7NO4FCml6sDlcMlspI6JpYlbJcXiWx8DmK2MjzcUhbqM5NkoZbVSTy9pcDRerIxHHRUlVR6ndwzlZaHSpnLRZJgyHvG5d+KWd3ny45YxQokknHCQhUEgjcNTxt+trsquiaOFES6Xg34B9rCtyLG6bQ+paGMpO5Isr5RKGxz6eSRbFWJZZCsVXK374BT3bh1Y4nipuKAiXDYLvUwHZT9ZTRcJw41y4D5rWcpWCljl1PowfEzVASq257GcjQb+r8Q461Y9n8vSTU92m+wkuQam6C7prWSC/PpQzheHGD4g2NxgLoN9jIpxl+tSJmN3Id1Jkchv1XeZ9+A5PxSk/DzyV4ABAFlCxwbz2qycAAAAAElFTkSuQmCC"}/>*/}
          {/*  )}*/}
          {/*</span>*/}
            <div className={"flex flex-col"}>
              <div>Recarregar Cashback</div>
              <div className={"flex"}>+ 10%</div>
            </div>
          </CashBackButton>

          <DrawerButton className={cx({
            "active-drawer-button": location.pathname === PageOrModalPathEnum.InvitePage
          })} onClick={() => {
            if(!isLogin) {
              dispatch(appSlice.actions.showLoginDrawerOrModal(true))
            } else {
              navigate(PageOrModalPathEnum.InvitePage)
            }
          }}>
          <span className={"pr-4"}>
            {location.pathname === PageOrModalPathEnum.InvitePage ? (
              <img className="w-[24px] h-[24px] mr-2" alt={"invite"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAjCAYAAABsFtHvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJCMzI2MDcyNjk5NDExRUVCNTM1OTI5MDkyRDk5ODMzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJCMzI2MDczNjk5NDExRUVCNTM1OTI5MDkyRDk5ODMzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkIzMjYwNzA2OTk0MTFFRUI1MzU5MjkwOTJEOTk4MzMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkIzMjYwNzE2OTk0MTFFRUI1MzU5MjkwOTJEOTk4MzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4lvAiUAAAC6klEQVR42rSYSWgUQRSGu2McSRSNKCJuYAbXBAxxPYhOwJV4EBdUvCgYLyoOLnhQ9KASQiTuIHrxoriBFxOJl7gcRQ+jgwthInEJHnQEjUZmJvF/5h9pOunu1zX44GO6q6v6r3qvql712H3fLK3NBXvAcjCBZR3gHjgH2q2QZueCxYtBE4W9LAOOggbQpxbPpP2fg9tgvfJ94oG9avEef/EDoDGkNzeDmyrxn189n41mTEeFFH8PpoJcYDxz3hFaZyAsNhksA63B4t7PYpa5LVGJZ71HPqkA8YmaSn5ut63/bH4j/1TAe7sKFX8MthiKP1IttdRn36Umy2a4wVKLctfzH3nGe+Sy/ZwA9SHFD2qEg9xucXdbCNYqhc9rdzeNuGwDm8AFUOdTLwuOhfWS/eyjuu4isJspdRzLPoBmcMokpfrF3J1WX1NcrAT0gt+ufUHeNgLsAtc5+YzdvgLsAzUgEtDBV6ASxMFxMA9sNBEvBRfBthBevEyPxHkvZ4CZ9Jja7aVMCotDCH8BVzgpxzjCcAhs145cGtxSCneCtxxZM9f2fledrVwFnRpxaVzrI/gL7AR3QI+jfCw4OUgmHArO8Gg1YPLZd1P/riU+CTbwssPgNA+TFWAGKVN46gc99YaT85Iz5k0BwmJPuQIaDJKNLMFq8ndjyrt9AViteIE0PAvauPxMTba2G8XZ/pu4stER8BCs4cdCjaGwHNE65CQjh8QNIVz3gK436UBeuD0/25cqYu20kexAjB0QT8xX7gUxZw4Q8UoD10kH7oPxoEUp/sSdfMTtEcNJ852/05T1o4Od29OG4kn+Vijrz2J4M86RtxUgPoSbk9tS/GSyXWl5uqPTVhHEE+CanN9DkgTlYJij7CWoBVFQBVpdbWY774t6+08FO0AjSPNeQzeI8LoL1IEq0MKyBFgFVoIXLCtzvsOuTw5IBNXManNAOZjCxFHicu1VpkuJ+TvQ7ROiIv6z8dz59fpHgAEAYVIZDgMgmDUAAAAASUVORK5CYII="}/>
            ): (
              <img className="w-[25px] h-[25px]" alt={"invite"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAjCAYAAABsFtHvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJCMzI2MDcyNjk5NDExRUVCNTM1OTI5MDkyRDk5ODMzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJCMzI2MDczNjk5NDExRUVCNTM1OTI5MDkyRDk5ODMzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkIzMjYwNzA2OTk0MTFFRUI1MzU5MjkwOTJEOTk4MzMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkIzMjYwNzE2OTk0MTFFRUI1MzU5MjkwOTJEOTk4MzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4lvAiUAAAC6klEQVR42rSYSWgUQRSGu2McSRSNKCJuYAbXBAxxPYhOwJV4EBdUvCgYLyoOLnhQ9KASQiTuIHrxoriBFxOJl7gcRQ+jgwthInEJHnQEjUZmJvF/5h9pOunu1zX44GO6q6v6r3qvql712H3fLK3NBXvAcjCBZR3gHjgH2q2QZueCxYtBE4W9LAOOggbQpxbPpP2fg9tgvfJ94oG9avEef/EDoDGkNzeDmyrxn189n41mTEeFFH8PpoJcYDxz3hFaZyAsNhksA63B4t7PYpa5LVGJZ71HPqkA8YmaSn5ut63/bH4j/1TAe7sKFX8MthiKP1IttdRn36Umy2a4wVKLctfzH3nGe+Sy/ZwA9SHFD2qEg9xucXdbCNYqhc9rdzeNuGwDm8AFUOdTLwuOhfWS/eyjuu4isJspdRzLPoBmcMokpfrF3J1WX1NcrAT0gt+ufUHeNgLsAtc5+YzdvgLsAzUgEtDBV6ASxMFxMA9sNBEvBRfBthBevEyPxHkvZ4CZ9Jja7aVMCotDCH8BVzgpxzjCcAhs145cGtxSCneCtxxZM9f2fledrVwFnRpxaVzrI/gL7AR3QI+jfCw4OUgmHArO8Gg1YPLZd1P/riU+CTbwssPgNA+TFWAGKVN46gc99YaT85Iz5k0BwmJPuQIaDJKNLMFq8ndjyrt9AViteIE0PAvauPxMTba2G8XZ/pu4stER8BCs4cdCjaGwHNE65CQjh8QNIVz3gK436UBeuD0/25cqYu20kexAjB0QT8xX7gUxZw4Q8UoD10kH7oPxoEUp/sSdfMTtEcNJ852/05T1o4Od29OG4kn+Vijrz2J4M86RtxUgPoSbk9tS/GSyXWl5uqPTVhHEE+CanN9DkgTlYJij7CWoBVFQBVpdbWY774t6+08FO0AjSPNeQzeI8LoL1IEq0MKyBFgFVoIXLCtzvsOuTw5IBNXManNAOZjCxFHicu1VpkuJ+TvQ7ROiIv6z8dz59fpHgAEAYVIZDgMgmDUAAAAASUVORK5CYII="}/>
            )}
          </span>
            <span className={cx("text-white", {
              "text-transparent": location.pathname === PageOrModalPathEnum.InvitePage,
            })}>Convide Amigos</span>
          </DrawerButton>


          <DrawerButton className={cx({
            "active-drawer-button": location.pathname === PageOrModalPathEnum.VIPGradePage
          })} onClick={() => {
            if(!isLogin) {
              dispatch(appSlice.actions.showLoginDrawerOrModal(true))
            } else {
              navigate(PageOrModalPathEnum.VIPGradePage)
            }
          }}>
          <span className={"pr-4"}>
            {location.pathname === PageOrModalPathEnum.VIPGradePage ? (
              <img className={"w-[24px] h-[24px] mr-2"} alt={"home-open"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM4NTZFRkM2Njk5NDExRUU5NTE5RUMwMzZCQTJBNjlBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM4NTZFRkM3Njk5NDExRUU5NTE5RUMwMzZCQTJBNjlBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Mzg1NkVGQzQ2OTk0MTFFRTk1MTlFQzAzNkJBMkE2OUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Mzg1NkVGQzU2OTk0MTFFRTk1MTlFQzAzNkJBMkE2OUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5xXvkfAAACXElEQVR42szXTUiUQRzHcZ91yUqjgsIoYSEqOpRB0VmKXkS0k+ClIBAJotLAQ4eOHjtUJ4Ps0qnC6CIU3Xxh86Dhe2aH3AqKSk1MbXV3+07M4fHZmT86D/vQwEfYeZ4Zf888M/M8j5ebKwpbSnACHgaxFKazWMgwpzGNPvTiE+rCdOhlZp3b7sUkygL1f3AYH51GKMMfRw0oM9SXoN613/hqznmEdgnHdrp2Gs+4B0o6HpPn0OyPUAviJc4G6l+jGlmnQN/XBtqsO0qvs/0W9Ohlr0o/Tm1g6W9Csf/82Aq3DEfQjSWtCwl9TLIblb7fx7BjHe324Dl+YxH9OKmOedPfisoJNmqYpFM4qpexrbTjSqDuHlqkeYsBVAbqf6n/FydVo2XFHEQtOi0dH0Cjob4JbbDNzlpDGFW247IKdEi4mgrh2G19tcGyFa24ZWmXEPrcrwJNCSekhNG5KLS7hjuWUUoJ7SbUpH6EGcvke4JOnEPMV9+GYmHSluK677e68At4gaeWNl/R4SU//0um7uldVAkPXHVlD/EGr/TTXSpqkp5HPS6h3HJeRu9dN9RC8rpTeZtdk149UZSreODfROPptY+OrH6niaoMBXd0dW/zJlaEgSbzNilDoAX90pUocJgZ/MwLlDY/7cciCPTeuI2v5KxDWfM/BRqNYP6YA62a31rGIwj0biMjFEWgD+YRMp88jy/YF/0ts79TTxQwUMr2VikFGsGZAgUadvnqeIabBQrU7vKhmEQzlkN8TAapvlrQZf1QzMrfZffxGMexLeSoqIXyFuLH+18BBgBeCWwN7k4wTgAAAABJRU5ErkJggg=="}/>
            ): (
              <img className="w-[25px] h-[25px]" alt={"vip"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM4NTZFRkM2Njk5NDExRUU5NTE5RUMwMzZCQTJBNjlBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM4NTZFRkM3Njk5NDExRUU5NTE5RUMwMzZCQTJBNjlBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Mzg1NkVGQzQ2OTk0MTFFRTk1MTlFQzAzNkJBMkE2OUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Mzg1NkVGQzU2OTk0MTFFRTk1MTlFQzAzNkJBMkE2OUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5xXvkfAAACXElEQVR42szXTUiUQRzHcZ91yUqjgsIoYSEqOpRB0VmKXkS0k+ClIBAJotLAQ4eOHjtUJ4Ps0qnC6CIU3Xxh86Dhe2aH3AqKSk1MbXV3+07M4fHZmT86D/vQwEfYeZ4Zf888M/M8j5ebKwpbSnACHgaxFKazWMgwpzGNPvTiE+rCdOhlZp3b7sUkygL1f3AYH51GKMMfRw0oM9SXoN613/hqznmEdgnHdrp2Gs+4B0o6HpPn0OyPUAviJc4G6l+jGlmnQN/XBtqsO0qvs/0W9Ohlr0o/Tm1g6W9Csf/82Aq3DEfQjSWtCwl9TLIblb7fx7BjHe324Dl+YxH9OKmOedPfisoJNmqYpFM4qpexrbTjSqDuHlqkeYsBVAbqf6n/FydVo2XFHEQtOi0dH0Cjob4JbbDNzlpDGFW247IKdEi4mgrh2G19tcGyFa24ZWmXEPrcrwJNCSekhNG5KLS7hjuWUUoJ7SbUpH6EGcvke4JOnEPMV9+GYmHSluK677e68At4gaeWNl/R4SU//0um7uldVAkPXHVlD/EGr/TTXSpqkp5HPS6h3HJeRu9dN9RC8rpTeZtdk149UZSreODfROPptY+OrH6niaoMBXd0dW/zJlaEgSbzNilDoAX90pUocJgZ/MwLlDY/7cciCPTeuI2v5KxDWfM/BRqNYP6YA62a31rGIwj0biMjFEWgD+YRMp88jy/YF/0ts79TTxQwUMr2VikFGsGZAgUadvnqeIabBQrU7vKhmEQzlkN8TAapvlrQZf1QzMrfZffxGMexLeSoqIXyFuLH+18BBgBeCWwN7k4wTgAAAABJRU5ErkJggg=="}/>
            )}
          </span>
            <span className={cx("text-white", {
              "text-transparent": location.pathname === PageOrModalPathEnum.VIPGradePage,
            })}>Torne-se VIP</span>
          </DrawerButton>

          <DrawerButton className={cx({
            "active-drawer-button": location.pathname === PageOrModalPathEnum.DailySignInPage
          })} onClick={() => {
            if(!isLogin) {
              dispatch(appSlice.actions.showLoginDrawerOrModal(true))
            } else {
              navigate(PageOrModalPathEnum.DailySignInPage)
            }
          }}>
          <span className={"pr-4"}>
            {location.pathname === PageOrModalPathEnum.DailySignInPage ? (
              <img className={"w-[24px] h-[24px] mr-2"} alt={"home-open"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAYAAACiyHcXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRCMEZGODYxNjk5NDExRUU4REJDQTBDMkIzOTg3RkE4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRCMEZGODYyNjk5NDExRUU4REJDQTBDMkIzOTg3RkE4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEIwRkY4NUY2OTk0MTFFRThEQkNBMEMyQjM5ODdGQTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEIwRkY4NjA2OTk0MTFFRThEQkNBMEMyQjM5ODdGQTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6bZ/tCAAACEElEQVR42tyXTyiDYRzH32l2WP4duCJJcdJCastBU8hB2YokpIjEhYMoF1K4cCAHKaUUBzc10RIOsjg4aQcHSnFw0A4z4/trv2W9Pe/7vO9mW/nVZ0897/M872fP/9fy/a7IogUcgSWwoBiPOTADOsGJXsGcKH4kOIEduA2UTcTN9ZyystavbyXroZaoAnXABi5AUFAnD3h02jwEH4L8SuACYXADHn4lYqkdbIPuhEqDGhLFYEdHwq8h4VLV2wdDIGSNxHpiF3RleBToD+dSr5KEQ0OggNMXTp85LZQ0XqQqH6+fLyhL73WQRKNGY21gHWyBe3DL+R0SCXp+B4bBJrjk/HaN8o0kYdN42AqmwSpPUopmMCuRoL3hCpxxPQuY4vZEYbN+6i/RZTAAAqAMNBkYa5rkp+AcPIJ6UK27RCPyfaKGMRtNBqUVWU9kZrP67xI0KedBBRilpZhpCRLoAU+8Skb1eyKaVgGKib8aDrpPrIE+UKvTtWqBcdCvNxRmJPb4YPLzDqoIGhYJDMoEzEj08hFNMSIQSVrAjEQpOABegUgoFQEzEvEG1SI0T1ZSETC7REUikwnPkxIwenbIRFISSEZCLbLIR7Q3WYFUdkwH40nHbTs7BxiGI5hlhyBd+X18AyrPggC910fDEeaxPQYlGRR45feG43MiwFe4MdDAX1npCvowugYb4I0yfgQYAH3svUEVMwTVAAAAAElFTkSuQmCC"}/>
            ): (
              <img className="w-[25px] h-[25px]" alt={"Check-in diário"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAYAAACiyHcXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRCMEZGODYxNjk5NDExRUU4REJDQTBDMkIzOTg3RkE4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRCMEZGODYyNjk5NDExRUU4REJDQTBDMkIzOTg3RkE4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEIwRkY4NUY2OTk0MTFFRThEQkNBMEMyQjM5ODdGQTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEIwRkY4NjA2OTk0MTFFRThEQkNBMEMyQjM5ODdGQTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6bZ/tCAAACEElEQVR42tyXTyiDYRzH32l2WP4duCJJcdJCastBU8hB2YokpIjEhYMoF1K4cCAHKaUUBzc10RIOsjg4aQcHSnFw0A4z4/trv2W9Pe/7vO9mW/nVZ0897/M872fP/9fy/a7IogUcgSWwoBiPOTADOsGJXsGcKH4kOIEduA2UTcTN9ZyystavbyXroZaoAnXABi5AUFAnD3h02jwEH4L8SuACYXADHn4lYqkdbIPuhEqDGhLFYEdHwq8h4VLV2wdDIGSNxHpiF3RleBToD+dSr5KEQ0OggNMXTp85LZQ0XqQqH6+fLyhL73WQRKNGY21gHWyBe3DL+R0SCXp+B4bBJrjk/HaN8o0kYdN42AqmwSpPUopmMCuRoL3hCpxxPQuY4vZEYbN+6i/RZTAAAqAMNBkYa5rkp+AcPIJ6UK27RCPyfaKGMRtNBqUVWU9kZrP67xI0KedBBRilpZhpCRLoAU+8Skb1eyKaVgGKib8aDrpPrIE+UKvTtWqBcdCvNxRmJPb4YPLzDqoIGhYJDMoEzEj08hFNMSIQSVrAjEQpOABegUgoFQEzEvEG1SI0T1ZSETC7REUikwnPkxIwenbIRFISSEZCLbLIR7Q3WYFUdkwH40nHbTs7BxiGI5hlhyBd+X18AyrPggC910fDEeaxPQYlGRR45feG43MiwFe4MdDAX1npCvowugYb4I0yfgQYAH3svUEVMwTVAAAAAElFTkSuQmCC"}/>
            )}
          </span>
            <span className={cx("text-white", {
              "text-transparent": location.pathname === PageOrModalPathEnum.DailySignInPage,
            })}>Check-in Diário</span>
          </DrawerButton>



          <DrawerButton className={cx({
            "active-drawer-button": location.pathname === PageOrModalPathEnum.TelegramPage
          })} onClick={() => {
            if(!isLogin) {
              dispatch(appSlice.actions.showLoginDrawerOrModal(true))
            } else {
              navigate(PageOrModalPathEnum.TelegramPage)
            }
          }}>
          <span className={"pr-4"}>
            {location.pathname === PageOrModalPathEnum.TelegramPage ? (
              <img className="w-[24px] h-[24px]  mr-2" alt={"telegram"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAYAAADFniADAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVBQjRGNzg4Njk5NDExRUVBOTFGRDEwOTNDMzQ2OUVFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVBQjRGNzg5Njk5NDExRUVBOTFGRDEwOTNDMzQ2OUVFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUFCNEY3ODY2OTk0MTFFRUE5MUZEMTA5M0MzNDY5RUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUFCNEY3ODc2OTk0MTFFRUE5MUZEMTA5M0MzNDY5RUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7cncRZAAADKUlEQVR42syYS2gTURSGZ5KALoRArDvdmEYQm1XRgKCLuMjG4At8FEQUiy5c2IC40Z2rKjFubESqRUERfJuFEemiGzFuhBQEQ0SlGxttDYZiaCbxP/WMnU5vZu5M8/DA19KZO3P/3nvueYza+Kk4NT+IgSgIgxAIAC/QwAwogDwYB1lQdjKBqsmL2gYSYC9Y5WCOKngKkiAnJWp+1nZMEKTAbmXllgFnQdFSVNVa1GlwFaxWWme/wRBINxU1NyO8Tv5xExxX2me3wSD74VJRlR9CQU9AXGm/vQD7zMLU8nJRt9q8QqIVO2G84NMay3yok4IUni9n9DF1urTklE222KmdOH+ffip9hs1MdUmQwvOmdD9Wp6b/Bca3SvctQlvpqcGnQIJ/t4MyuA6i4LHN2AUdPvzwc+potY3zSX7EPkPWD/ZbPEM6/CQq5jCXWdkUGONj/klwP2zzPOmI+Wp/s/1KbB48A6PgFajz9S3gHDgDKgafsbMorVTYpZhJ3p674LvpJF0Ae/g0VQwlzyaJ94ZJVMiBkF/gHq/KO8H9XWAEzHK9VTKVPqrEHCESFZAYOMFCHoI5wf0ecAUcAy/BAcG4rZL/eIBEeW226CD40KzKAEe5gFsL7oCT7GeiGCRjXhKlcWUgVA12con7zXSvF9xQFg/KZXAeNCwqVxnT1NdfFIrp62wG0kRvuKzNcKy5aAglCS4Gm9kG8FVSVIlWqiAhirZpOzNsCgfkR/cl0oesFUhUnidzY5ckBDlxcrI8iaJ0cMqlqM8OEq10eqKInuU2yE2q0Sv89eAIn0JNUF73O2jHsrRSZXbgQy5EUZDcyOklyBF8gHOgbpvBGsn3kY6yXrokXZYlvWACBPnvHeA9iBvGRBy8L6mXLgrXyBkXDeeY4BoF0efgGseuAQeN6kIHrY5+/A9r9NrijSJ3riNdEDVkbOXNLVaa00Gn+760Vd+ncCvd08EOedB8USRK41a6a98SfFqTTM2tdK4bX108dayUBWnQBzI242TJ8PvSVuM8da70LSiCOIiAB6Aq8YyRKj8X4fcU7Z7x1RvSy05bebgT3zz/CDAAb+beo11Iix0AAAAASUVORK5CYII="}/>
            ): (
              <img className="w-[25px] h-[25px]" alt={"telegram"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAYAAADFniADAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVBQjRGNzg4Njk5NDExRUVBOTFGRDEwOTNDMzQ2OUVFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVBQjRGNzg5Njk5NDExRUVBOTFGRDEwOTNDMzQ2OUVFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUFCNEY3ODY2OTk0MTFFRUE5MUZEMTA5M0MzNDY5RUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUFCNEY3ODc2OTk0MTFFRUE5MUZEMTA5M0MzNDY5RUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7cncRZAAADKUlEQVR42syYS2gTURSGZ5KALoRArDvdmEYQm1XRgKCLuMjG4At8FEQUiy5c2IC40Z2rKjFubESqRUERfJuFEemiGzFuhBQEQ0SlGxttDYZiaCbxP/WMnU5vZu5M8/DA19KZO3P/3nvueYza+Kk4NT+IgSgIgxAIAC/QwAwogDwYB1lQdjKBqsmL2gYSYC9Y5WCOKngKkiAnJWp+1nZMEKTAbmXllgFnQdFSVNVa1GlwFaxWWme/wRBINxU1NyO8Tv5xExxX2me3wSD74VJRlR9CQU9AXGm/vQD7zMLU8nJRt9q8QqIVO2G84NMay3yok4IUni9n9DF1urTklE222KmdOH+ffip9hs1MdUmQwvOmdD9Wp6b/Bca3SvctQlvpqcGnQIJ/t4MyuA6i4LHN2AUdPvzwc+potY3zSX7EPkPWD/ZbPEM6/CQq5jCXWdkUGONj/klwP2zzPOmI+Wp/s/1KbB48A6PgFajz9S3gHDgDKgafsbMorVTYpZhJ3p674LvpJF0Ae/g0VQwlzyaJ94ZJVMiBkF/gHq/KO8H9XWAEzHK9VTKVPqrEHCESFZAYOMFCHoI5wf0ecAUcAy/BAcG4rZL/eIBEeW226CD40KzKAEe5gFsL7oCT7GeiGCRjXhKlcWUgVA12con7zXSvF9xQFg/KZXAeNCwqVxnT1NdfFIrp62wG0kRvuKzNcKy5aAglCS4Gm9kG8FVSVIlWqiAhirZpOzNsCgfkR/cl0oesFUhUnidzY5ckBDlxcrI8iaJ0cMqlqM8OEq10eqKInuU2yE2q0Sv89eAIn0JNUF73O2jHsrRSZXbgQy5EUZDcyOklyBF8gHOgbpvBGsn3kY6yXrokXZYlvWACBPnvHeA9iBvGRBy8L6mXLgrXyBkXDeeY4BoF0efgGseuAQeN6kIHrY5+/A9r9NrijSJ3riNdEDVkbOXNLVaa00Gn+760Vd+ncCvd08EOedB8USRK41a6a98SfFqTTM2tdK4bX108dayUBWnQBzI242TJ8PvSVuM8da70LSiCOIiAB6Aq8YyRKj8X4fcU7Z7x1RvSy05bebgT3zz/CDAAb+beo11Iix0AAAAASUVORK5CYII="}/>
            )}
          </span>
            <span className={cx("text-white", {
              "text-transparent": location.pathname === PageOrModalPathEnum.TelegramPage,
            })}>Adicionar Telegrama</span>
          </DrawerButton>


        </section>

        {isMobile && (
          <section className={"flex flex-col items-center justify-end h-full"}>
            <WebsiteButton/>
          </section>
        )}

      </div>
    </div>

  )
}
