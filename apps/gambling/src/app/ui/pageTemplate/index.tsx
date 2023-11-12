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

import {AppLocalStorage} from "../../persistant/localstorage";
import {PageOrModalPathEnum} from "../PageOrModalPathEnum";
import {environment} from "../../../environments/environment";

import {CocoPageTemplate} from "./env/CocoPageTemplate";
import {PernambucanaPageTemplate} from "./env/PernambucanaPageTemplate";


console.log("environment", environment);
type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type IOpenNotificationWithIcon = {
  type?: NotificationType;
  message?: string;
  description: string
}

// export const AppContext = createContext({
//   isUserLogin: !!AppLocalStorage.getItem("token"),
// });


export type IPage = {
  children: React.ReactNode;
  showMobileHeader?: boolean;
  showTabbar?: boolean;
  showDesktopHeader?: boolean;
  showDesktopMenuDrawer?: boolean;
  showFooter?: boolean;
  showToolbox?: boolean;

}
export const PageTemplate = (props: IPage) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [openMenuDrawer, setOpenMenuDrawer] = useState(false);
  const {openMenuDrawer} = useSelector((state: RootState) => state.ui);
  const setOpenMenuDrawer = (show: boolean) => {
    dispatch(uiSlice.actions.setOpenMenuDrawer(show));
  }
  const {isMobile} = useBreakpoint();

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

  const {updateBalance} = useAutoUpdateBalance();

  // NOTE: UserInfoStatusDrawer
  const [openDesktopUserInfoStatusDrawer, setOpenDesktopUserInfoStatusDrawer] = useState(false);

  useEffect(() => {
    if(isMobile && openDesktopUserInfoStatusDrawer) {
      setOpenDesktopUserInfoStatusDrawer(false)
    }
  }, [isMobile]);

  useEffect(() => {
    if(openDesktopUserInfoStatusDrawer) updateBalance();
  }, [openDesktopUserInfoStatusDrawer])

  const isUILoading = useSelector((state: RootState) => state.app.isUILoading);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false)
  //   }, 2000)
  //   return () => {
  //     clearTimeout(timer);
  //   }
  // },[])

  const { isShowMobileLogoutModal , isShowTelegramModal, isShowInviteBonusModal } = useSelector((state: RootState) => state.app)

  // NOTE: NotificationDrawer
  const [openDesktopNotificationDrawer, setOpenDesktopNotificationDrawer] = useState(false);

  // NOTE: InitialChargeModal
  // const [openInitailChargeModal, setOpenInitailChargeModal] = useState(isLogin);

  const setOpenInitailChargeModal = (show: boolean) => {
    dispatch(appSlice.actions.setIsShowInviteBonusModal(show))
  }

  const isShowMobileHeader = props.showMobileHeader === undefined ? true : props.showMobileHeader;
  const isShowTabbar = props.showTabbar === undefined ? true : props.showTabbar;


  const isShowDesktopHeader = props.showDesktopHeader === undefined ? true : props.showDesktopHeader;
  const isShowDesktopMenuDrawer = props.showDesktopMenuDrawer === undefined ? true : props.showDesktopMenuDrawer;

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

  const onClickToOpenTelegramManager = () => {
    window.open(telegramManagerUrl,'_blank')
  }

  const openNotificationWithIcon = (props: IOpenNotificationWithIcon) => {
    const type = props.type || "error";
    const msg = props.message || "Message"
    api[type]({
      message: msg,
      description: props.description,
    });
  };

  // openNotificationWithIcon('error')
  const telegramServiceId = AppLocalStorage.getItem('telegramService');
  const telegramManagerId = AppLocalStorage.getItem('telegramManager');
  const userInfoString = AppLocalStorage.getItem("userInfo");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  const user_id = userInfo?.user_id || '';
  const telegramServiceUrl=`https://t.me/${telegramServiceId}?start=${user_id}`
  const telegramManagerUrl=`https://t.me/${telegramManagerId}?start=${user_id}`

  const location = useLocation();
  // console.log("location", location);
  const isCurrentPageCompanyProfile = location.pathname === PageOrModalPathEnum.CompanyProfilePage


  const onClickToOpenTelegramService = () => {
    window.open(telegramServiceUrl,'_blank')
  }

  if(environment.assetPrefix === "coco777bet") {
    return (
      <CocoPageTemplate
        isCurrentPageCompanyProfile={isCurrentPageCompanyProfile}
        contextHolder={contextHolder}
        isMobile={isMobile}
        isShowDesktopHeader={isShowDesktopHeader}
        isShowDesktopMenuDrawer={isShowDesktopMenuDrawer}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        showLoginModal={showLoginModal}
        setOpenDesktopUserInfoStatusDrawer={setOpenDesktopUserInfoStatusDrawer}
        openDesktopUserInfoStatusDrawer={openDesktopUserInfoStatusDrawer}
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
        showToolbox={props.showToolbox}
        onClickToDownload={onClickToDownload}
        onClickToOpenTelegramManager={onClickToOpenTelegramManager}
        isUILoading={isUILoading}
      >
        {props.children}
      </CocoPageTemplate>
    )
  } else {
    return (
      <PernambucanaPageTemplate
        isCurrentPageCompanyProfile={isCurrentPageCompanyProfile}
        contextHolder={contextHolder}
        isMobile={isMobile}
        isShowDesktopHeader={isShowDesktopHeader}
        isShowDesktopMenuDrawer={isShowDesktopMenuDrawer}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        showLoginModal={showLoginModal}
        setOpenDesktopUserInfoStatusDrawer={setOpenDesktopUserInfoStatusDrawer}
        openDesktopUserInfoStatusDrawer={openDesktopUserInfoStatusDrawer}
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
        showToolbox={props.showToolbox}
        onClickToDownload={onClickToDownload}
        onClickToOpenTelegramManager={onClickToOpenTelegramManager}
        isUILoading={isUILoading}
      >
        {props.children}
      </PernambucanaPageTemplate>
    )
  }

}
