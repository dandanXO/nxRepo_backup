import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import {ErrorBoundary} from "react-error-boundary";
import {ThreeDots} from "react-loading-icons";

import {Footer} from "../../footer/env/u1/Footer";

import {TabBar} from "../../tabBar/env/u1";
import {Toolbox} from "../../Toolbox/env/u1";

import {environment} from "../../../../../environments/environment";
import {Header} from "../../header/env/u1/Header";
import {MobileHeader} from "../../header/env/u1/MobileHeader";
import {LoadingLogo} from "../../../components-bs/Logos/LoadingLogo";
import {LoadingBar} from "../../../components/LoadingBar";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../reduxStore";
import {appSlice} from "../../../../reduxStore/appSlice";
import {usePageSnowEffect} from "../../hooks/usePageSnowEffect/usePageSnowEffect";
import {PageOrModalPathEnum} from "../../../PageOrModalPathEnum";
import {useLocation} from "react-router";
import {TShowToolboxConfig} from "../../base/types";
import {MenuDrawer} from "../../../drawers/MenuDrawer";
import {AddToMobileShortcut} from "../../../popovers/AddToMobileShortcut";
import {useLocalStorage} from "usehooks-ts";
import {AppLocalStorageKey} from "../../../../persistant/AppLocalStorageKey";
import {twMerge} from "tailwind-merge";
import useBreakpoint from "../../hooks/useBreakpoint";
import {IUseSingletonPageTemplateConfig} from "../../hooks/useSingletonPageTemplateConfig";

type IStyledPage = {
  isCurrentPageCompanyProfile: boolean;
}
export const StyledPage = styled.div.attrs((props) => ({
  className: "h-full"
}))<IStyledPage>`

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    //box-shadow: 0 0 3rem 0.5rem #306347 inset;
    //background-color:#306347;
  }

  &:after {
    content: "";
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -2;
    background-image: url("assets/${environment.uVersion}/${environment.mvVersion}/bg_web.png");
    @media (max-width: 768px) {
      background-image: url("assets/${environment.uVersion}/${environment.mvVersion}/bg_h5.png");
    }
    background-size: cover;
    background-repeat: no-repeat;
  }

  // ${(props) => props.isCurrentPageCompanyProfile && `
  //   background: url("assets/${environment.uVersion}/bg.888bcf29.png") no-repeat center center/100% auto;
  //   background-color:#090b0f;
  // `};
  // @media (min-width: 640px) {
  //   &:after {
  //     background: url("assets/bgImg.3a85b39c.jpg") no-repeat center center/100% auto;
  //   }
  // }
`;

type ICoco777betIndexPageTemplate = {
  children?: React.ReactNode;
  isCurrentPageCompanyProfile: boolean;
  contextHolder: any;
  isMobile: boolean;
  isShowMobileFooter: boolean;
  isShowDesktopFooter: boolean;
  isShowDesktopHeader: boolean;
  isShowDesktopMenuDrawer: boolean;
  isLogin: boolean;
  setIsLogin: (value: any) => void;
  showLoginModal: (value: any) => void;
  openDesktopNotificationDrawer: boolean;
  setOpenDesktopNotificationDrawer: (value: any) => void;
  setOpenLogoutPopover: (value: any) => void;
  isShowMobileLogoutModal: boolean;

  openMenuDrawer: boolean;
  setOpenMenuDrawer: (value: any) => void;
  isShowLoginModal: boolean;
  openNotificationWithIcon: (value: any) => void;
  openDownloadModal: boolean;
  setOpenDownloadModal: (value: any) => void;
  isShowTelegramModal: boolean;
  onClickToOpenTelegramService: () => void;
  isShowInviteBonusModal: boolean;
  setOpenInitailChargeModal: (value: any) => void;
  isShowMobileHeader: boolean;
  isShowTabbar: boolean;
  onClickToDownload: () => void;
  onClickToOpenTelegramManager: () => void;
  isUILoading: boolean;
  showToolboxConfig?: TShowToolboxConfig
} & IUseSingletonPageTemplateConfig;

export const PageTemplate = ({
                                         children,
                                         isCurrentPageCompanyProfile,
                                         contextHolder,
                                         isMobile,
                                          isShowMobileFooter,
                                        isShowDesktopFooter,
                                         isShowDesktopHeader,
                                         isLogin,
                                         setIsLogin,
                                         showLoginModal,
                                         openDesktopNotificationDrawer,
                                         setOpenDesktopNotificationDrawer,
                                         setOpenLogoutPopover,
                                         isShowMobileLogoutModal,
                                         isShowDesktopMenuDrawer,
                                         openMenuDrawer,
                                         setOpenMenuDrawer,
                                         isShowLoginModal,
                                         openNotificationWithIcon,
                                         openDownloadModal,
                                         setOpenDownloadModal,

                                         isShowTelegramModal,
                                         onClickToOpenTelegramService,
                                         isShowInviteBonusModal,
                                         setOpenInitailChargeModal,
                                         isShowMobileHeader,
                                         onClickToDownload,
                                         onClickToOpenTelegramManager,
                                         isShowTabbar,
                                         isUILoading,
                                         showToolboxConfig,
                                         header,
                                         footer,
                                         menuDrawer,
                                         tabBar,
                                       }: ICoco777betIndexPageTemplate) => {

  // NOTE: show
  const isShowHeader = header.mobile || header.tablet || header.desktop;
  const isShowFooter = footer.mobile || footer.tablet || footer.desktop;
  const isShowMenuDrawer = menuDrawer.mobile || menuDrawer.tablet || menuDrawer.desktop;
  // console.log("menuDrawer", menuDrawer);

  const isShowTabBar = tabBar.mobile || tabBar.tablet || tabBar.desktop;

  const dispatch = useDispatch();


  const {affect, stop, isPlay} = usePageSnowEffect();

  const canvasRef = useRef();
  useEffect(() => {
    // NOTE: Natal777bet
    if(environment.snowEffects !== "none") {
      affect(canvasRef.current as any)
    }
  }, [canvasRef.current])

  const location = useLocation();

  // useEffect(() => {
  //   if(location.pathname === PageOrModalPathEnum.GamePage) {
  //     stop();
  //   } else {
  //     // if(!isPlay) {
  //       if(environment.assetVersionPrefix === "v6") {
  //         affect(canvasRef.current as any)
  //       }
  //     // }
  //   }
  // }, [location.pathname, canvasRef.current, isPlay]);

  // NOTE: hideAddToMobileShortcut, isShowiOSDownloadPopover
  const [hideAddToMobileShortcut] = useLocalStorage(AppLocalStorageKey.hideAddToMobileShortcut, false)
  const inNativeApp = useSelector((rootState: RootState) => rootState.app.inNativeApp);



  return (
    <>
      <canvas className="fixed z-[-1]" ref={canvasRef as any}/>

      <StyledPage
        isCurrentPageCompanyProfile={false}
        onClick={() => {
          // NOTE: 關閉 Coco Desktop Logout Popover
          if(isShowMobileLogoutModal) {
            dispatch(appSlice.actions.showMobileLogoutModal(false));
          }
        }}
      >

        {isMobile && isShowHeader && (
          <MobileHeader
            className={"!h-[52.5px]"}
            clickToOpenMenuDrawer={() => {
              setOpenMenuDrawer(!openMenuDrawer)
            }}
            clickToOpenUserLoginStatusModal={() => {
              // setShowUserLoginStatusMobileModal(true);
              showLoginModal(true)
            }}
          />
        )}

        {!isMobile && isShowHeader && (
          <Header
            isLogin={isLogin}
            onClickUserLoginStatusDrawer={() => {
              // setOpenNonMobileUserLoginStatusDrawer(true);
              showLoginModal(true)
            }}
            className={"fixed top-0 left-0 right-0 w-full h-[100px] z-10"}
            onClickToOpenNotificationDrawer={() => {
              setOpenDesktopNotificationDrawer(true)
            }}
            onClickToChangeLogoutPopover={(display: boolean) => {
              setOpenLogoutPopover(display);
            }}
            onClickToDownload={onClickToDownload}
            openLogoutPopover={isShowMobileLogoutModal}

          />
        )}

        {(isShowMenuDrawer) && (
          <MenuDrawer/>
        )}

        {/*NOTE: 佔據有 Header 時的高度*/}
        {isMobile && isShowMobileHeader && <div className={"w-full h-[52.5px]"}/>}

        <ErrorBoundary
          fallback={
            <div className={"text-white"}>Children</div>
          }
        >
          {children}
        </ErrorBoundary>

        {isShowFooter && (
          <Footer showMobileFooter={isShowFooter}
                  showDesktopFooter={isShowFooter}
          />
        )}

        {isShowTabBar && (
          <TabBar isShowSlot={false} size={"big"}/>
        )}

        {showToolboxConfig !== false && (
          <Toolbox
            showToolboxConfig={showToolboxConfig}
            onClickToDownload={onClickToDownload}
            onClickToOpenTelegramManager={onClickToOpenTelegramManager}
            onClickToOpenTelegramService={onClickToOpenTelegramService}
          />
        )}

        {isUILoading && (
          <div className={"z-[9999] fixed top-0 left-0 right-0 bottom-0 bg-[var(--page-background)] flex flex-col justify-center items-center"}>
            <div className={"mb-4"}>
              <LoadingLogo/>
            </div>
            {/*<ThreeDots height={25} className={'inline-block'} />*/}
            <LoadingBar/>
          </div>
        )}

        {isMobile && !inNativeApp && (
          <div
            className={twMerge("fixed z-10 w-full h-[40px] md:h-[56px]",
              isShowTabbar && "bottom-[60px]",
              !isShowTabbar && "bottom-0",
            )}
          >
            {!hideAddToMobileShortcut && isMobile && <AddToMobileShortcut isShowTabbar={isShowTabbar}/>}
          </div>
        )}
      </StyledPage>

    </>

  )
}



