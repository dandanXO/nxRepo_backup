
import {BaseStyledPageTemplate} from "../../base/BaseStyledPageTemplate";
import {IUseSingletonPageTemplateConfig} from "../../hooks/useSingletonPageTemplateConfig";

import React from "react";

import {Footer} from "../../footer";

import {BaseLoadingOverlay} from "../../base/BaseLoadingOverlay";
import {useSelector} from "react-redux";
import {RootState} from "../../../../reduxStore";
import {BaseErrorBoundary} from "../../base/BaseErrorBoundary";
import {TShowToolboxConfig} from "../../base/types";
import useBreakpoint from "../../hooks/useBreakpoint";
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
import {PageOrModalPathEnum} from "../../../PageOrModalPathEnum";
import {useLocation} from "react-router";


type IPageTemplate = {
  children: React.ReactNode;
  showToolboxConfig?: TShowToolboxConfig;
  onClickToDownload: () => void;
  onClickToOpenTelegramManager: () => void;
  onClickToOpenTelegramService: () => void;
} & {
  isCurrentPageCompanyProfile: boolean;
  contextHolder: any;
  isLogin: boolean;
  setIsLogin: (value: any) => void;
  showLoginModal: (value: any) => void;
  openDesktopNotificationDrawer: boolean;
  setOpenDesktopNotificationDrawer: (value: any) => void;
  setOpenLogoutPopover: (value: any) => void;
  isShowMobileLogoutModal: boolean;

  openNotificationWithIcon: (value: any) => void;
  openDownloadModal: boolean;
  setOpenDownloadModal: (value: any) => void;
  isShowTelegramModal: boolean;
  isShowInviteBonusModal: boolean;
  setOpenInitailChargeModal: (value: any) => void;

  isUILoading: boolean;
} & IUseSingletonPageTemplateConfig

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


                                // NOTICE:
                               header,
                               footer,
                               tabBar,
                               menuDrawer,
                               showMenuDrawer,
                             }:IPageTemplate) => {


  const isUILoading = useSelector((state: RootState) => state.app.isUILoading);
  const {isLogin} = useSelector((state: RootState) => state.app)

  const {isMobile, isDesktop, isTablet} = useBreakpoint();

  // NOTE: show
  const isShowHeader = header.mobile || header.tablet || header.desktop;
  const isShowFooter = footer.mobile || footer.tablet || footer.desktop;
  const isShowMenuDrawer = menuDrawer.mobile || menuDrawer.tablet || menuDrawer.desktop;
  // console.log("menuDrawer", menuDrawer);

  const isShowTabBar = tabBar.mobile || tabBar.tablet || tabBar.desktop;

  // NOTICE: refactor me
  // NOTE: Style - Header
  const HeaderHeight =  !isShowHeader ? 0 : isDesktop ? 72 :  isTablet ? 72 : 56;
  const HeaderZIndex = isDesktop ? "z-[1004]" : "z-[1002]";

  // NOTE: Style - MenuDrawer
  const DrawerWidth = 248;
  const MenuDrawerTop = isDesktop ? 72 : 0;
  const MenudrawerZIndex = "z-[1003]";

  // NOTE: Style - AddShortCut (fixed)
  const AddShortCutZIndex = "z-[1005]"

  // NOTE: Style - TabBar
  const TabHeight = (tabBar.mobile || tabBar.tablet || tabBar.desktop) ? 72 : 0;
  const TabZIndex = "z-[1004]";

  // NOTE: Style - Toolbox (fixed)
  const ToolboxZIndex = "z-10"


  // NOTE: AddToMobileShortCut
  const inNativeApp = useSelector((rootState: RootState) => rootState.app.inNativeApp);
  const [hideAddToMobileShortcut] = useLocalStorage(AppLocalStorageKey.hideAddToMobileShortcut, false)
  const isShowAddToMobileShortCut = isMobile && !inNativeApp && !hideAddToMobileShortcut

  const location = useLocation();

  const childrenMarginLeft = (isMobile && menuDrawer.mobile && menuDrawer.mobileOverChildren ||
    isTablet && menuDrawer.tablet && menuDrawer.tabletOverChildren ||
    isDesktop && menuDrawer.desktop && menuDrawer.desktopOverChildren) ? 0 : DrawerWidth;

  return (
    <BaseStyledPageTemplate
      bgType={"color"}
      isCurrentPageCompanyProfile={location.pathname === PageOrModalPathEnum.CompanyProfilePage}
    >

      {isUILoading && (
        <BaseLoadingOverlay className={"z-[9999] fixed top-0 left-0 right-0 bottom-0"}/>
      )}

      {isShowHeader && (
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
      )}

      {isShowMenuDrawer && (
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
            marginLeft: isShowMenuDrawer ? childrenMarginLeft : 0,
          }}
        >
          <BaseErrorBoundary>
            {children}
          </BaseErrorBoundary>

          {isShowFooter && (
            <Footer/>
          )}
        </div>

      </div>

      {/*NOTE: AddToMobileShortcut*/}
      {isShowAddToMobileShortCut && (
        <div
          className={twMerge("fixed w-full flex justify-center",
            AddShortCutZIndex,
          )}
          style={{
            bottom: 20,
          }}
        >
          <AddToMobileShortcut isShowTabbar={isShowTabBar}/>
        </div>
      )}

      {isShowTabBar && (
        <TabBar className={TabZIndex} isShowSlot={false} size={"big"} isShowMenuDrawer={showMenuDrawer}/>
      )}

      {showToolboxConfig !== false && (
        <div className={cx(ToolboxZIndex, "fixed right-[16px] bottom-[400px]")}>
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
