import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import {ErrorBoundary} from "react-error-boundary";
import {ThreeDots} from "react-loading-icons";

import {Footer} from "../../footer/coco/Footer";
import {MenuDrawer} from "../../../drawers/MenuDrawer";
import {TabBar} from "../../tabBar";
import {Toolbox} from "../../../components/Toolbox";
import {UserLoginStatusModal} from "../../../modals/UserLoginStatusModal";

import {environment} from "../../../../../environments/environment";
import {Header} from "../../header/env/coco/Header";
import {HeaderMobile} from "../../header/env/coco/HeaderMobile";
import {MenuDrawerContent} from "../../../drawers/MenuDrawer/env/coco/MenuDrawerContent";
import { TShowToolboxConfig } from "../../index";
import {LoadingLogo} from "../../../components/Logos/LoadingLogo";
import {LoadingBar} from "../../../components/LoadingBar";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../reduxStore";
import {appSlice} from "../../../../reduxStore/appSlice";
import {usePageSnowEffect} from "../../hooks/usePageSnowEffect/usePageSnowEffect";
import {PageOrModalPathEnum} from "../../../PageOrModalPathEnum";
import {useLocation} from "react-router";

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
    background-image: url("assets/${environment.assetPrefix}/bg_web.png");
    @media (max-width: 768px) {
      background-image: url("assets/${environment.assetPrefix}/bg_h5.png");
    }
    background-size: cover;
    background-repeat: no-repeat;
  }

  // ${(props) => props.isCurrentPageCompanyProfile && `
  //   background: url("assets/${environment.assetPrefix}/bg.888bcf29.png") no-repeat center center/100% auto;
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
  setOpenDesktopUserInfoStatusDrawer: (value: any) => void;
  openDesktopUserInfoStatusDrawer: boolean;
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
}
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
                                         setOpenDesktopUserInfoStatusDrawer,
                                         openDesktopUserInfoStatusDrawer,
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
                                         showToolboxConfig
                                       }: ICoco777betIndexPageTemplate) => {


  const dispatch = useDispatch();


  const {affect, stop, isPlay} = usePageSnowEffect();

  const canvasRef = useRef();
  useEffect(() => {
    // NOTE: Natal777bet
    if(environment.assetVersionPrefix === "v6") {
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

        {isMobile && isShowMobileHeader && (
          <HeaderMobile
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

        {!isMobile && isShowDesktopHeader && (
          <Header
            isLogin={isLogin}
            onClickUserLoginStatusDrawer={() => {
              // setOpenNonMobileUserLoginStatusDrawer(true);
              showLoginModal(true)
            }}
            className={"fixed top-0 left-0 right-0 w-full h-[100px] z-10"}
            openDesktopUserInfoStatusDrawer={openDesktopUserInfoStatusDrawer}
            onClickToPopupUserInfoStatusPopover={() => {
              setOpenDesktopUserInfoStatusDrawer(!openDesktopUserInfoStatusDrawer)
            }}
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

        {isShowDesktopMenuDrawer && (
          <MenuDrawer
            className={""}
            isTabletShow={false}
            isShowCloseButton={false}
          >
            <MenuDrawerContent/>
          </MenuDrawer>
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

        {<Footer showMobileFooter={isShowMobileFooter}
                 showDesktopFooter={isShowDesktopFooter}
        />}


        {isMobile && isShowTabbar && (
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

        {/*Login*/}
        {isShowLoginModal && (
          <UserLoginStatusModal
            showCloseButton={true}
            openNotificationWithIcon={openNotificationWithIcon}
            close={() => {
              showLoginModal(false)
            }}
            setIsLogin={(login: boolean) => setIsLogin(login)}
          />
        )}

        {isUILoading && (
          <div className={"z-[9999] fixed top-0 left-0 right-0 bottom-0 bg-[var(--unknown)] flex flex-col justify-center items-center"}>
            <div className={"mb-4"}>
              <LoadingLogo/>
            </div>
            {/*<ThreeDots height={25} className={'inline-block'} />*/}
            <LoadingBar/>
          </div>
        )}

      </StyledPage>
    </>

  )
}



