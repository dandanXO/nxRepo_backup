
import {BaseStyledPageTemplate} from "../../base/BaseStyledPageTemplate";
import {IUseSingletonPageTemplateConfig, useSingletonPageTemplateConfig} from "../../hooks/useSingletonPageTemplateConfig";

import React from "react";

import {Footer} from "../../footer";
import {TabBar} from "../../tabBar/env/coco";
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
  setOpenDesktopUserInfoStatusDrawer: (value: any) => void;
  openDesktopUserInfoStatusDrawer: boolean;
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
                              setOpenDesktopUserInfoStatusDrawer,
                              openDesktopUserInfoStatusDrawer,
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
    isShowMobileTabbar,
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

  const {isMobile, isDesktop} = useBreakpoint();

  const HeaderHeight = isDesktop ? 72 : 52.5;
  const DrawerWidth = 248;
  const HeaderZIndex = "z-[1002]";
  const MenudrawerZIndex = "z-[1001]";

  return (
    <BaseStyledPageTemplate>

      <div className={twMerge("fixed top-0 left-0 right-0 w-full", HeaderZIndex)}>
        <Header
          className={""}
          // NOTE: Login
          isLogin={isLogin}
          onClickUserLoginStatusDrawer={() => {
            // setOpenNonMobileUserLoginStatusDrawer(true);
            showLoginModal(true)
          }}
          onClickToPopupUserInfoStatusPopover={() => {
            setOpenDesktopUserInfoStatusDrawer(!openDesktopUserInfoStatusDrawer)
          }}
          onClickToChangeLogoutPopover={(display: boolean) => {
            setOpenLogoutPopover(display);
          }}
          openLogoutPopover={isShowMobileLogoutModal}
          // NOTE: User Info
          openDesktopUserInfoStatusDrawer={openDesktopUserInfoStatusDrawer}
          // NOTE: Notification
          onClickToOpenNotificationDrawer={() => {
            setOpenDesktopNotificationDrawer(true)
          }}
          // NOTE: Download
          onClickToDownload={onClickToDownload}
        />
      </div>

      <div className={""}>
        {isShowDesktopMenuDrawer && (
          <div
            className={twMerge("fixed left-0", MenudrawerZIndex)}
            style={{
              top: HeaderHeight,
            }}
          >
            <MenuDrawer/>
          </div>
        )}

        <div
          className={cx("", {

          })}
          style={{
            marginTop: HeaderHeight,
            marginLeft: !isMobile ? DrawerWidth : 0,
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

      {isShowMobileTabbar && (
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
        <BaseLoadingOverlay/>
      )}

    </BaseStyledPageTemplate>
  )
}