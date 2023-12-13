import React from "react";
import styled from "styled-components";
import {ErrorBoundary} from "react-error-boundary";

import {Header} from "../../header/env/wild/Header";
import {HeaderMobile} from "../../header/env/wild/HeaderMobile";
import {Footer} from "../../footer/env/wild/Footer";

import {MenuDrawerContainer} from "../../../drawers/MenuDrawer/MenuDrawerContainer";
import {MenuDrawerContent} from "../../../drawers/MenuDrawer/env/wild/MenuDrawerContent";
import {Toolbox} from "../../../components/Toolbox";

import {TabBar} from "../../tabBar/env/coco";

import {ThreeDots} from "react-loading-icons";
import {UserLoginStatusModal} from "../../../modals/UserLoginStatusModal";

import {environment} from "../../../../../environments/environment";


import {TShowToolboxConfig} from "../../base/types";


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

  // &:after {
  //   content: "";
  //   width: 100%;
  //   height: 100%;
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   z-index: -2;
  //   background: url("assets/${environment.assetPrefix}/bg_web.png") center bottom no-repeat;
  //   @media (max-width: 768px) {
  //     background: url("assets/${environment.assetPrefix}/bg_h5.png") center bottom /130% auto;
  //   }
  // }

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
  return (
      <StyledPage isCurrentPageCompanyProfile={false}>



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
            openDesktopUserInfoStatusDrawer={openDesktopUserInfoStatusDrawer}
          />
        )}

        {isShowDesktopMenuDrawer && (
          <MenuDrawerContainer
            className={""}
            isTabletShow={false}
          >
            <MenuDrawerContent/>
          </MenuDrawerContainer>
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
            onClickToDownload={onClickToDownload}
            onClickToOpenTelegramManager={onClickToOpenTelegramManager}
            onClickToOpenTelegramService={onClickToOpenTelegramService}
          />
        )}


        {isUILoading && (
          <div className={"z-[9999] fixed top-0 left-0 right-0 bottom-0 bg-black flex flex-col justify-center items-center"}>
            <img className={"w-[60px] mb-6"} src={`/assets/${environment.assetPrefix}/logo_h5.png`}/>
            <ThreeDots height={25} className={'inline-block'} />
          </div>
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

      </StyledPage>
  )
}



