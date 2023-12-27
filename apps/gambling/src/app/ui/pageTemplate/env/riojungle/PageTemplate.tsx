
import {BaseStyledPageTemplate} from "../../base/BaseStyledPageTemplate";
import {IUseSingletonPageTemplateConfig, useSingletonPageTemplateConfig} from "../../hooks/useSingletonPageTemplateConfig";

import React from "react";

import {Footer} from "../../footer";
import {Toolbox} from "../../Toolbox";
import {UserLoginStatusModal} from "../../../modals/UserLoginStatusModal";
import {BaseLoadingOverlay} from "../../base/BaseLoadingOverlay";
import {useSelector} from "react-redux";
import {RootState} from "../../../../reduxStore";
import {BaseErrorBoundary} from "../../base/BaseErrorBoundary";
import {TShowToolboxConfig} from "../../base/types";
import useBreakpoint from "../../../hooks/useBreakpoint";
import {MenuDrawer} from "../../../drawers/MenuDrawer";
import cx from "classnames";
import {Header} from "../../header";
import {twMerge} from "tailwind-merge";

import {TabBar} from "../../tabBar";

type IPageTemplate = IUseSingletonPageTemplateConfig & {
  children: React.ReactNode;
  showToolboxConfig?: TShowToolboxConfig;
  onClickToDownload: () => void;
  onClickToOpenTelegramManager: () => void;
  onClickToOpenTelegramService: () => void;
} & {
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
  openNotificationWithIcon: (value: any) => void;
  openDownloadModal: boolean;
  setOpenDownloadModal: (value: any) => void;
  isShowTelegramModal: boolean;
  isShowInviteBonusModal: boolean;
  setOpenInitailChargeModal: (value: any) => void;
  isShowMobileHeader: boolean;
  isShowTabbar: boolean;
  isUILoading: boolean;
}

export const PageTemplate = ({
                              children,
                              showLoginModal,
                              setOpenDesktopNotificationDrawer,
                              setOpenLogoutPopover,
                              isShowMobileLogoutModal,
                              onClickToOpenTelegramService,
                              onClickToDownload,
                              onClickToOpenTelegramManager,
                              showToolboxConfig,

                               showMobileHeader,
                               showDesktopHeader,
                               showDesktopMenuDrawer,
                               showMobileFooter,
                               showDesktopFooter,
                               showTabbar,
                             }:IPageTemplate) => {

  const {
    isShowMobileHeader,
    isShowDesktopHeader,
    isShowDesktopMenuDrawer,
    isShowMobileFooter,
    isShowDesktopFooter,
    isShowTabbar,
  } = useSingletonPageTemplateConfig({
    showMobileHeader,
    showDesktopHeader,
    showDesktopMenuDrawer,
    showMobileFooter,
    showDesktopFooter,
    showTabbar,
  });

  const isUILoading = useSelector((state: RootState) => state.app.isUILoading);
  const {isLogin} = useSelector((state: RootState) => state.app)

  const {isMobile, isDesktop, isTablet} = useBreakpoint();
  // console.log("debug.isMobile", isMobile)
  // console.log("debug.isDesktop", isDesktop)
  // console.log("debug.isTablet", isTablet)


  // NOTICE: refactor me
  // const HeaderHeight = isDesktop || isTablet ? 72 : 52.5;
  const HeaderHeight = isDesktop ? 72 : isTablet ? 72 : 56;
  const TabHeight = isShowTabbar ? 72 : 0;

  const MenuTop = isDesktop ? 72 : 0;
  const DrawerWidth = 248;
  const HeaderZIndex = isDesktop ? "z-[1004]" : "z-[1002]";
  const MenudrawerZIndex = "z-[1003]";
  const TabZIndex = "z-[1004]";


  return (
    <BaseStyledPageTemplate
      // style={{
      //   height: isShowTabbar ? `calc(100% - ${TabHeight}px)` : "100%",
      // }}
    >

      <div
        className={twMerge("fixed top-0 left-0 right-0 w-full", HeaderZIndex)}
        // style={{
        //    height: isShowTabbar ? `calc(100% - ${TabHeight}px)` : "100%",
        // }}
      >
        <Header
          className={""}
          // NOTE: Login
          isLogin={isLogin}
          onClickUserLoginStatusDrawer={() => {
            // setOpenNonMobileUserLoginStatusDrawer(true);
            showLoginModal(true)
          }}
          onClickToChangeLogoutPopover={(display: boolean) => {
            setOpenLogoutPopover(display);
          }}
          openLogoutPopover={isShowMobileLogoutModal}
          // NOTE: Notification
          onClickToOpenNotificationDrawer={() => {
            setOpenDesktopNotificationDrawer(true)
          }}
          // NOTE: Download
          onClickToDownload={onClickToDownload}
        />
      </div>

      <div
        className={"page-container"}
        style={{
          height: `calc(100% - ${HeaderHeight}px - ${TabHeight}px)`,
        }}
      >
        {isShowDesktopMenuDrawer && (
          <div
            className={twMerge("fixed left-0", MenudrawerZIndex)}
            style={{
              top: MenuTop,
            }}
          >
            <MenuDrawer/>
          </div>
        )}

        <div
          className={twMerge("h-full overflow-auto")}
          style={{
            marginTop: HeaderHeight,
            marginLeft: isDesktop ? DrawerWidth : 0,
          }}
        >
          <BaseErrorBoundary>
            {children}
          </BaseErrorBoundary>

          <Footer
            showMobileFooter={isShowMobileFooter}
            showDesktopFooter={isShowDesktopFooter}
          />
        </div>
      </div>

      {isShowTabbar && (
        <TabBar className={TabZIndex} isShowSlot={false} size={"big"} isShowMenuDrawer={isShowDesktopMenuDrawer}/>
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
        <BaseLoadingOverlay/>
      )}

    </BaseStyledPageTemplate>
  )
}
