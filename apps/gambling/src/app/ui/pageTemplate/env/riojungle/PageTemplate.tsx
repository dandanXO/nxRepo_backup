
import {BaseStyledPageTemplate} from "../../base/BaseStyledPageTemplate";
import {IUseSingletonPageTemplateConfig, useSingletonPageTemplateConfig} from "../../hooks/useSingletonPageTemplateConfig";

import React from "react";

import {Footer} from "../../footer";

import {BaseLoadingOverlay} from "../../base/BaseLoadingOverlay";
import {useSelector} from "react-redux";
import {RootState} from "../../../../reduxStore";
import {BaseErrorBoundary} from "../../base/BaseErrorBoundary";
import {TShowToolboxConfig} from "../../base/types";
import useBreakpoint from "../../../hooks/useBreakpoint";
import {MenuDrawer} from "../../../drawers/MenuDrawer";

import {Header} from "../../header";
import {twMerge} from "tailwind-merge";

import {TabBar} from "../../tabBar";
import {Toolbox} from "../../Toolbox/env/riojungle/index";
import {AddToMobileShortcut} from "../../../popovers/AddToMobileShortcut";
import {IOSDownloadModal} from "../../../modals/IOSDownloadModal";
import {useLocalStorage} from "usehooks-ts";
import {AppLocalStorageKey} from "../../../../persistant/AppLocalStorageKey";
import cx from "classnames";


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
  // NOTE: Header
  const HeaderHeight = isDesktop ? 72 : isTablet ? 72 : 56;
  const HeaderZIndex = isDesktop ? "z-[1004]" : "z-[1002]";

  // NOTE: MenuDrawer
  const DrawerWidth = 248;
  const MenuDrawerTop = isDesktop ? 72 : 0;
  const MenudrawerZIndex = "z-[1003]";

  // NOTE: AddShortCut
  const AddShortCutZIndex = "z-[1005]"

  // NOTE: TabBar
  const TabHeight = isShowTabbar ? 72 : 0;
  const TabZIndex = "z-[1004]";


  // NOTE: hideAddToMobileShortcut, isShowiOSDownloadPopover
  const [hideAddToMobileShortcut] = useLocalStorage(AppLocalStorageKey.hideAddToMobileShortcut, false)
  const isShowiOSDownloadPopover = useSelector((state: RootState) => state.app.isShowiOSDownloadPopover);
  const inNativeApp = useSelector((rootState: RootState) => rootState.app.inNativeApp);


  return (
    <BaseStyledPageTemplate>

      {isUILoading && (
        <BaseLoadingOverlay className={"z-[9999] fixed top-0 left-0 right-0 bottom-0"}/>
      )}

      <div
        className={twMerge(HeaderZIndex, "fixed top-0 left-0 right-0 w-full")}
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

      {isShowDesktopMenuDrawer && (
        <div
          className={twMerge(MenudrawerZIndex, "fixed left-0")}
          style={{
            top: MenuDrawerTop,
          }}
        >
          <MenuDrawer
            onClickToDownload={onClickToDownload}
          />
        </div>
      )}

      <div
        style={{
          position: 'fixed',
          top: HeaderHeight,
          width: '100%',
          height: `calc(100% - ${HeaderHeight}px - ${TabHeight}px)`,
        }}
      >
        <div
          id={"page-container"}
          className={twMerge("h-full overflow-auto")}
          style={{
            // marginTop: HeaderHeight,
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

      {!inNativeApp && (
        <div
          className={twMerge("fixed w-full flex justify-center",
            AddShortCutZIndex,
          )}
          style={{
            bottom: 20,
          }}
        >
          {!hideAddToMobileShortcut && isMobile && <AddToMobileShortcut isShowTabbar={isShowTabbar}/>}
        </div>
      )}

      {/*NOTICE: Refactor me*/}
      {isShowiOSDownloadPopover && isMobile && (
        <div className={twMerge("z-[1006]", "fixed bottom-0")}>
          {<IOSDownloadModal/>}
        </div>
      )}

      {isShowTabbar && (
        <TabBar className={TabZIndex} isShowSlot={false} size={"big"} isShowMenuDrawer={isShowDesktopMenuDrawer}/>
      )}

      {showToolboxConfig !== false && (
        <div className={"z-10 fixed right-[16px] bottom-[400px]"}>
          <Toolbox
            className={""}
            showToolboxConfig={showToolboxConfig}
            onClickToDownload={onClickToDownload}
            onClickToOpenTelegramManager={onClickToOpenTelegramManager}
            onClickToOpenTelegramService={onClickToOpenTelegramService}
          />
        </div>
      )}

    </BaseStyledPageTemplate>
  )
}
