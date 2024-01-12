// import { space, layout, typography, color } from 'styled-system'
import React, {useEffect, useState} from "react";
import {notification} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router";

import useBreakpoint from "./hooks/useBreakpoint";
import {useAutoUpdateBalance} from "../hooks/useAutoUpdateBalance";

import {RootState} from "../../reduxStore";
import {appSlice} from "../../reduxStore/appSlice";
import {uiSlice} from "../../reduxStore/uiSlice";

import {PageOrModalPathEnum} from "../PageOrModalPathEnum";
import {environment} from "../../../environments/environment";

import {usePageNavigate} from "../router/hooks/usePageNavigate";

import {renderByUVersion} from "../utils/renderByUVersion";
import {PageTemplate as PPageTemplate} from "./env/pernambucana/PageTemplate";
import {PageTemplate as WPageTemplate} from "./env/wild/PageTemplate";
import {PageTemplate as CPageTemplate} from "./env/u1/PageTemplate";
import {PageTemplate as RiojunglePageTemplate} from "./env/u2/PageTemplate";
import {useSingletonPageTemplateConfig} from "./hooks/useSingletonPageTemplateConfig";
import {PageTemplateLayers} from "../pageTemplateLayers";
import {IPage} from "./types/IPage";
import {useScrollToPartPageTemplate} from "./hooks/useScrollToPartPageTemplate";

console.log("[APP] environment", environment);

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type IOpenNotificationWithIcon = {
  type?: NotificationType;
  message?: string;
  description: string
}

export const PageTemplate = (props: IPage) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {openMenuDrawer, openUserInfoStatusPopover} = useSelector((state: RootState) => state.ui);
  const setOpenMenuDrawer = (show: boolean) => {
    dispatch(uiSlice.actions.setOpenMenuDrawer(show));
  }
  const {isMobile, isDesktop} = useBreakpoint();

  // useEffect(() => {
  //   if(!isMobile) {
  //     setOpenMenuDrawer(true)
  //   } else {
  //     setOpenMenuDrawer(false);
  //   }
  // }, [isMobile]);

  const isShowLoginModal = useSelector((state: RootState) => state.app.isShowLoginModal)

  const showLoginModal = (show: boolean) => {
    if(isMobile) {
      // setShowUserLoginStatusMobileModal(show);
      dispatch(appSlice.actions.showLoginDrawerOrModal(show))
    } else {
      // setOpenNonMobileUserLoginStatusDrawer(show);
      dispatch(appSlice.actions.showLoginDrawerOrModal(show))
    }
  }

  // NOTE: isLogin
  const isLogin = useSelector((state: RootState) => state.app.isLogin);
  const setIsLogin = (login: boolean) => {
    dispatch(appSlice.actions.setIsLogin(login))
  }

  const {update} = useAutoUpdateBalance({
    autoWindowFocusRefresh: false,
  });

  useEffect(() => {
    if(!isDesktop && openUserInfoStatusPopover) {
      dispatch(uiSlice.actions.closeUserInfoStatusPopover());
    }
  }, [isDesktop]);

  useEffect(() => {
    if(openUserInfoStatusPopover) update();
  }, [openUserInfoStatusPopover])

  const isUILoading = useSelector((state: RootState) => state.app.isUILoading);

  const { isShowMobileLogoutModal , isShowTelegramModal, isShowDepositModal, isShowInviteBonusModal ,isShowMaintenanceModal , } = useSelector((state: RootState) => state.app)

  // NOTE: NotificationDrawer
  const [openDesktopNotificationDrawer, setOpenDesktopNotificationDrawer] = useState(false);

  // NOTE: InitialChargeModal
  const setOpenInitailChargeModal = (show: boolean) => {
    dispatch(appSlice.actions.setIsShowInviteBonusModal(show))
  }
  const location = useLocation();

  const {
    isShowMobileHeader,
    isShowTabletHeader,
    isShowDesktopHeader,

    // NOTE: Footer
    isShowMobileFooter,
    isShowTabletFooter,
    isShowDesktopFooter,

    // NOTE: MenuDrawer
    isShowMobileMenuDrawer,
    isShowTabletMenuDrawer,
    // NOTE: deprecated
    isShowDesktopMenuDrawer,

    // NOTE: TabBar
    isShowMobileTabBar,
    isShowTabletTabBar,
    isShowDesktopTabBar,
    // NOTE: deprecated
    isShowTabbar,
    mobileOverChildren,
    tabletOverChildren,
    desktopOverChildren,
  } = useSingletonPageTemplateConfig({
    header: props.header,
    footer: props.footer,
    tabBar: props.tabBar,
    menuDrawer: props.menuDrawer,
    // NOTE: deprecated
    showTabbar: props.showTabbar,
    showMenuDrawer: props. showMenuDrawer && openMenuDrawer,
  });


  // NOTE: LogoutPopover
  const setOpenLogoutPopover = (show: boolean) => {
    dispatch(appSlice.actions.showMobileLogoutModal(show))
  }
  const [openDownloadModal, setOpenDownloadModal] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const onClickToDownload = () => {
    setOpenDownloadModal(!openDownloadModal);
  }

  const openNotificationWithIcon = (props: IOpenNotificationWithIcon) => {
    const type = props.type || "error";
    const msg = props.message || "Message"
    api[type]({
      message: msg,
      description: props.description,
    });
  };

  const {
    onClickToWallet,
    onClickToOpenTelegramService,
    onClickToOpenTelegramManager,
    onClickToOpenTelegramGroup,
  } = usePageNavigate();

  const isCurrentPageCompanyProfile = location.pathname === PageOrModalPathEnum.CompanyProfilePage


  useEffect(() => {
    const handleStorage = () => {
      // Place for a function responsible for
      // pulling and displaying local storage data
      console.log("debug")
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const {scrollToWindowTop} = useScrollToPartPageTemplate();

  useEffect(() => {
    scrollToWindowTop();
  }, [location.pathname]);

  return (
    <>
      {renderByUVersion({
        "wild777bet": (
          <WPageTemplate
            isCurrentPageCompanyProfile={isCurrentPageCompanyProfile}
            contextHolder={contextHolder}
            isMobile={isMobile}
            isShowMobileFooter={isShowMobileFooter}
            isShowDesktopFooter={isShowMobileFooter}
            isShowDesktopHeader={isShowDesktopHeader}
            isShowDesktopMenuDrawer={isShowDesktopMenuDrawer}
            isLogin={isLogin}

            setIsLogin={setIsLogin}
            showLoginModal={showLoginModal}
            openDesktopNotificationDrawer={openDesktopNotificationDrawer}
            setOpenDesktopNotificationDrawer={setOpenDesktopNotificationDrawer}
            setOpenLogoutPopover={setOpenLogoutPopover}
            isShowMobileLogoutModal={isShowMobileLogoutModal}

            openMenuDrawer={openMenuDrawer}
            setOpenMenuDrawer={setOpenMenuDrawer}
            isShowLoginModal={isShowLoginModal}
            openNotificationWithIcon={openNotificationWithIcon}
            openDownloadModal={openDownloadModal}
            setOpenDownloadModal={setOpenDownloadModal}
            isShowTelegramModal={isShowTelegramModal}
            onClickToOpenTelegramService={onClickToOpenTelegramService}
            isShowInviteBonusModal={isShowInviteBonusModal}
            setOpenInitailChargeModal={setOpenInitailChargeModal}
            isShowMobileHeader={isShowMobileHeader}
            isShowTabbar={isShowTabbar}
            onClickToDownload={onClickToDownload}
            onClickToOpenTelegramManager={onClickToOpenTelegramManager}
            isUILoading={isUILoading}
            showToolboxConfig={props.showToolboxConfig}
          >
            {props.children}
          </WPageTemplate>
        ),
        "u1": (
          <CPageTemplate
            isCurrentPageCompanyProfile={isCurrentPageCompanyProfile}
            contextHolder={contextHolder}
            isMobile={isMobile}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            showLoginModal={showLoginModal}
            openDesktopNotificationDrawer={openDesktopNotificationDrawer}
            setOpenDesktopNotificationDrawer={setOpenDesktopNotificationDrawer}
            setOpenLogoutPopover={setOpenLogoutPopover}
            isShowMobileLogoutModal={isShowMobileLogoutModal}

            openMenuDrawer={openMenuDrawer}
            setOpenMenuDrawer={setOpenMenuDrawer}
            isShowLoginModal={isShowLoginModal}
            openNotificationWithIcon={openNotificationWithIcon}
            openDownloadModal={openDownloadModal}
            setOpenDownloadModal={setOpenDownloadModal}
            isShowTelegramModal={isShowTelegramModal}
            onClickToOpenTelegramService={onClickToOpenTelegramService}
            isShowInviteBonusModal={isShowInviteBonusModal}
            setOpenInitailChargeModal={setOpenInitailChargeModal}
            onClickToDownload={onClickToDownload}
            onClickToOpenTelegramManager={onClickToOpenTelegramManager}
            isUILoading={isUILoading}

            // NOTICE: refactor
            isShowMobileFooter={isShowMobileFooter}
            isShowDesktopFooter={isShowDesktopFooter}
            isShowDesktopHeader={isShowDesktopHeader}
            isShowDesktopMenuDrawer={isShowDesktopMenuDrawer}
            isShowMobileHeader={isShowMobileHeader}
            isShowTabbar={isShowTabbar}
            showToolboxConfig={props.showToolboxConfig}

            header={{
              mobile: isShowMobileHeader,
              tablet: isShowTabletHeader,
              desktop: isShowDesktopHeader,
            }}
            footer={{
              mobile: isShowMobileFooter,
              tablet: isShowTabletFooter,
              desktop: isShowDesktopFooter,
            }}
            tabBar={{
              mobile: isShowMobileTabBar,
              tablet: isShowTabletTabBar,
              desktop: isShowDesktopTabBar,
            }}
            menuDrawer={{
              mobile: isShowMobileMenuDrawer,
              tablet: isShowTabletMenuDrawer,
              desktop: isShowDesktopMenuDrawer,
              mobileOverChildren,
              tabletOverChildren,
              desktopOverChildren
            }}
          >
            {props.children}
          </CPageTemplate>
        ),
        "u2": (
          <RiojunglePageTemplate
            showToolboxConfig={props.showToolboxConfig}
            onClickToDownload={onClickToDownload}
            onClickToOpenTelegramManager={onClickToOpenTelegramManager}
            onClickToOpenTelegramService={onClickToOpenTelegramService}
            isCurrentPageCompanyProfile={isCurrentPageCompanyProfile}
            contextHolder={contextHolder}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            showLoginModal={showLoginModal}
            openDesktopNotificationDrawer={openDesktopNotificationDrawer}
            setOpenDesktopNotificationDrawer={setOpenDesktopNotificationDrawer}
            setOpenLogoutPopover={setOpenLogoutPopover}
            isShowMobileLogoutModal={isShowMobileLogoutModal}
            openNotificationWithIcon={openNotificationWithIcon}
            openDownloadModal={openDownloadModal}
            setOpenDownloadModal={setOpenDownloadModal}
            isShowTelegramModal={isShowTelegramModal}
            isShowInviteBonusModal={isShowInviteBonusModal}
            setOpenInitailChargeModal={setOpenInitailChargeModal}
            isUILoading={isUILoading}

            header={{
              mobile: isShowMobileHeader,
              tablet: isShowTabletHeader,
              desktop: isShowDesktopHeader,
            }}
            footer={{
              mobile: isShowMobileFooter,
              tablet: isShowTabletFooter,
              desktop: isShowDesktopFooter,
            }}
            tabBar={{
              mobile: isShowMobileTabBar,
              tablet: isShowTabletTabBar,
              desktop: isShowDesktopTabBar,
            }}
            menuDrawer={{
              mobile: isShowMobileMenuDrawer,
              tablet: isShowTabletMenuDrawer,
              desktop: isShowDesktopMenuDrawer,
              mobileOverChildren,
              tabletOverChildren,
              desktopOverChildren
            }}
          >
          {props.children}
          </RiojunglePageTemplate>
        )
      }, (
        <PPageTemplate
          isCurrentPageCompanyProfile={isCurrentPageCompanyProfile}
          contextHolder={contextHolder}
          isMobile={isMobile}
          isShowMobileFooter={isShowMobileFooter}
          isShowDesktopFooter={isShowMobileFooter}
          isShowDesktopHeader={isShowDesktopHeader}
          isShowDesktopMenuDrawer={isShowDesktopMenuDrawer}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          showLoginModal={showLoginModal}
          openDesktopNotificationDrawer={openDesktopNotificationDrawer}
          setOpenDesktopNotificationDrawer={setOpenDesktopNotificationDrawer}
          setOpenLogoutPopover={setOpenLogoutPopover}
          isShowMobileLogoutModal={isShowMobileLogoutModal}

          openMenuDrawer={openMenuDrawer}
          setOpenMenuDrawer={setOpenMenuDrawer}
          isShowLoginModal={isShowLoginModal}
          openNotificationWithIcon={openNotificationWithIcon}
          openDownloadModal={openDownloadModal}
          setOpenDownloadModal={setOpenDownloadModal}
          isShowTelegramModal={isShowTelegramModal}
          onClickToOpenTelegramService={onClickToOpenTelegramService}
          isShowInviteBonusModal={isShowInviteBonusModal}
          setOpenInitailChargeModal={setOpenInitailChargeModal}
          isShowMobileHeader={isShowMobileHeader}
          // Deprecated
          isShowTabbar={isShowTabbar}
          onClickToDownload={onClickToDownload}
          onClickToOpenTelegramManager={onClickToOpenTelegramManager}
          isUILoading={isUILoading}
          showToolboxConfig={props.showToolboxConfig}
        >
          {props.children}
        </PPageTemplate>
      ))}

      <PageTemplateLayers
        isMobile={isMobile}
        isShowLoginModal={isShowLoginModal}
        showLoginModal={showLoginModal}
        setIsLogin={setIsLogin}
        openNotificationWithIcon={openNotificationWithIcon}
        isShowMobileLogoutModal={isShowMobileLogoutModal}
        setOpenLogoutPopover={setOpenLogoutPopover}
        openDesktopNotificationDrawer={openDesktopNotificationDrawer}
        setOpenDesktopNotificationDrawer={setOpenDesktopNotificationDrawer}
        isShowDepositModal={isShowDepositModal}
        isShowInviteBonusModal={isShowInviteBonusModal}
        onClickToWallet={onClickToWallet}
        isShowTelegramModal={isShowTelegramModal}
        onClickToOpenTelegramGroup={onClickToOpenTelegramGroup}
        setOpenInitailChargeModal={setOpenInitailChargeModal}
        openDownloadModal={openDownloadModal}
        setOpenDownloadModal={setOpenDownloadModal}
        isShowMaintenanceModal={isShowMaintenanceModal}
        onClickToOpenTelegramService={onClickToOpenTelegramService}
      />


      {contextHolder}
    </>
  )

}
