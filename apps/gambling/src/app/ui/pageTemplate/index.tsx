// import { space, layout, typography, color } from 'styled-system'
import React, {useEffect, useState} from "react";
import {notification} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router";

import useBreakpoint from "../hooks/useBreakpoint";
import {useAutoUpdateBalance} from "../hooks/useAutoUpdateBalance";

import {RootState} from "../../reduxStore";
import {appSlice} from "../../reduxStore/appSlice";
import {uiSlice} from "../../reduxStore/uiSlice";

import {PageOrModalPathEnum} from "../PageOrModalPathEnum";
import {environment} from "../../../environments/environment";

import {usePageNavigate} from "../hooks/usePageNavigate";

import {renderByPlatform} from "../utils/renderByPlatform";
import {PageTemplate as PPageTemplate} from "./env/pernambucana/PageTemplate";
import {PageTemplate as WPageTemplate} from "./env/wild/PageTemplate";
import {PageTemplate as CPageTemplate} from "./env/coco/PageTemplate";
import {PageTemplate as RiojunglePageTemplate} from "./env/riojungle/PageTemplate";
import {useSingletonPageTemplateConfig} from "./hooks/useSingletonPageTemplateConfig";
import {PageTemplateLayers} from "../pageTemplateLayers";
import {IPage} from "./types/IPage";
import {AddToMobileShortcut} from "../popovers/AddToMobileShortcut";
import {useLocalStorage} from "usehooks-ts";
import {IOSDownloadModal} from "../modals/IOSDownloadModal";
import {AppLocalStorageKey} from "../../persistant/AppLocalStorageKey";

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

  // const [openMenuDrawer, setOpenMenuDrawer] = useState(false);
  const {openMenuDrawer, openUserInfoStatusPopover} = useSelector((state: RootState) => state.ui);
  const setOpenMenuDrawer = (show: boolean) => {
    dispatch(uiSlice.actions.setOpenMenuDrawer(show));
  }
  const {isMobile, isDesktop} = useBreakpoint();

  useEffect(() => {
    if(!isMobile) {
      setOpenMenuDrawer(true)
    } else {
      setOpenMenuDrawer(false);
    }
  }, [isMobile]);

  // NOTE: UserLoginStatusModal
  const [showUserLoginStatusMobileModal, setShowUserLoginStatusMobileModal] = useState(false);

  // useEffect(() => {
  //   if(!isMobile) {
  //     setShowUserLoginStatusMobileModal(false)
  //   } else {
  //     setShowUserLoginStatusMobileModal(true);
  //   }
  // }, [isMobile]);

  // NOTE: LoginStatus
  const [openNonMobileUserLoginStatusDrawer, setOpenNonMobileUserLoginStatusDrawer] = useState(false);
  // useEffect(() => {
  //   if(!isMobile) {
  //     setOpenNonMobileUserLoginStatusDrawer(false)
  //   } else {
  //     setOpenNonMobileUserLoginStatusDrawer(true);
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
  // const {user: { isUserLogin }} = usePageTemplatePresenter();
  // const { isUserLogin} = useContext(AppContext);
  // const [isLogin, setIsLogin] = useState(isUserLogin);

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
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false)
  //   }, 2000)
  //   return () => {
  //     clearTimeout(timer);
  //   }
  // },[])

  const { isShowMobileLogoutModal , isShowTelegramModal, isShowDepositModal, isShowInviteBonusModal ,isShowMaintenanceModal , } = useSelector((state: RootState) => state.app)

  // NOTE: NotificationDrawer
  const [openDesktopNotificationDrawer, setOpenDesktopNotificationDrawer] = useState(false);

  // NOTE: InitialChargeModal
  // const [openInitailChargeModal, setOpenInitailChargeModal] = useState(isLogin);

  const setOpenInitailChargeModal = (show: boolean) => {
    dispatch(appSlice.actions.setIsShowInviteBonusModal(show))
  }

  const {
    isShowMobileHeader,
    isShowDesktopHeader,
    isShowDesktopMenuDrawer,
    isShowMobileFooter,
    isShowDesktopFooter,
    isShowTabbar,
  } = useSingletonPageTemplateConfig({
    ...props,
    showDesktopMenuDrawer: props. showDesktopMenuDrawer && openMenuDrawer,
  });

  // const isShowMobileHeader = props.showMobileHeader === undefined ? true : props.showMobileHeader;
  // const isShowDesktopHeader = props.showDesktopHeader === undefined ? true : props.showDesktopHeader;
  //
  // const isShowDesktopMenuDrawer = props.showDesktopMenuDrawer === undefined ? true : props.showDesktopMenuDrawer;
  //
  // const isShowMobileFooter = props.showMobileFooter === undefined ? true : props.showMobileFooter;
  // const isShowDesktopFooter = props.showDesktopFooter === undefined ? true : props.showDesktopFooter;
  //
  // const isShowTabbar = props.showTabbar === undefined ? true : props.showTabbar;


  // NOTE: LogoutPopover
  // const [openLogoutPopover, setOpenLogoutPopover] = useState(false);

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

  const location = useLocation();
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

  return (
    <>
      {renderByPlatform({
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
        "coco777bet": (
          <CPageTemplate
            isCurrentPageCompanyProfile={isCurrentPageCompanyProfile}
            contextHolder={contextHolder}
            isMobile={isMobile}
            isShowMobileFooter={isShowMobileFooter}
            isShowDesktopFooter={isShowDesktopFooter}
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
          </CPageTemplate>
        ),
        "riojungle777bet": (
          <RiojunglePageTemplate
            showToolboxConfig={props.showToolboxConfig}
            onClickToDownload={onClickToDownload}
            onClickToOpenTelegramManager={onClickToOpenTelegramManager}
            onClickToOpenTelegramService={onClickToOpenTelegramService}


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
            openNotificationWithIcon={openNotificationWithIcon}
            openDownloadModal={openDownloadModal}
            setOpenDownloadModal={setOpenDownloadModal}
            isShowTelegramModal={isShowTelegramModal}
            isShowInviteBonusModal={isShowInviteBonusModal}
            setOpenInitailChargeModal={setOpenInitailChargeModal}

            isShowMobileHeader={isShowMobileHeader}
            isShowTabbar={isShowTabbar}
            isUILoading={isUILoading}

            showMobileHeader={isShowMobileHeader}
            showDesktopHeader={isShowDesktopHeader}
            showDesktopMenuDrawer={isShowDesktopMenuDrawer}
            showMobileFooter={isShowMobileHeader}
            showDesktopFooter={isShowDesktopFooter}
            showTabbar={isShowTabbar}
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
