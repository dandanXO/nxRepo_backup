
import {BaseStyledPageTemplate} from "../../base/BaseStyledPageTemplate";
import {IUseSingletonPageTemplateConfig, useSingletonPageTemplateConfig} from "../../hooks/useSingletonPageTemplateConfig";

import React from "react";

import {Footer} from "../../footer";
import {TabBar} from "../../tabBar/env/coco";
import {Toolbox} from "../../../components/Toolbox";
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
  isShowLoginModal: boolean;
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

  const {isMobile} = useBreakpoint();

  return (
    <BaseStyledPageTemplate>
      <Header
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
        isLogin={isLogin}
      />

      <div className={""}>
        {isShowDesktopMenuDrawer && (
          <div className={"w-[248px] fixed top-24 left-0"}>
            <MenuDrawer/>
          </div>
        )}
        <div
          className={cx("mt-24", {
            "ml-[248px]": !isMobile
          })}
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
