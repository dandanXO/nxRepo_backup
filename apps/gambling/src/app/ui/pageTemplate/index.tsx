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

import {NotificationDrawer} from "../drawers/NotificationDrawer";

import {UserInfoStatusPopover} from "../popovers/UserInfoStatusPopover";
import {LogoutPopover} from "../popovers/LogoutPopover";

import {DownloadModal} from "../modals/DownloadModal";
import {TelegramContactModal} from "../modals/TelegramContactModal";
import {InviteBonusModal} from "../modals/InviteBonusModal";
import {LogoutModal} from "../modals/LogoutModal";

import {renderByPlatform} from "../utils/renderByPlatform";
import {PageTemplate as PPageTemplate} from "./env/pernambucana/PageTemplate";
import {PageTemplate as WPageTemplate} from "./env/wild/PageTemplate";
import {PageTemplate as CPageTemplate} from "./env/coco/PageTemplate";
import {AppLocalStorageKey} from "../../persistant/AppLocalStorageKey";
import {DepositAdvertisementModal} from "../modals/DepositAdvertisementModal";
import {MaintenanceModal} from "../modals/MaintenanceModal";
import {usePageNavigate} from "../hooks/usePageNavigate";
import {AddToMobileShortcut} from "../popovers/AddToMobileShortcut";
import {useLocalStorage} from "usehooks-ts";
import {IOSDownloadModal} from "../modals/IOSDownloadModal";


console.log("[APP] environment", environment);
type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type IOpenNotificationWithIcon = {
  type?: NotificationType;
  message?: string;
  description: string
}

// export const AppContext = createContext({
//   isUserLogin: !!AppLocalStorage.getItem("token"),
// });

export type TShowToolboxConfig = {
  mobile?: {
    download?: boolean;
    customerService?: boolean;
  } | boolean;
  desktop?: {
    download?: boolean;
    customerService?: boolean;
    manager?: boolean
  } | boolean;
} | boolean;

export type IPage = {
  children: React.ReactNode;
  showMobileHeader?: boolean;
  showTabbar?: boolean;
  showDesktopHeader?: boolean;
  showDesktopMenuDrawer?: boolean;
  showMobileFooter?: boolean;
  showDesktopFooter?: boolean;
  showToolboxConfig?: TShowToolboxConfig
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

  const {update} = useAutoUpdateBalance({
    autoWindowFocusRefresh: false,
  });

  // NOTE: UserInfoStatusDrawer
  const [openDesktopUserInfoStatusDrawer, setOpenDesktopUserInfoStatusDrawer] = useState(false);

  useEffect(() => {
    if(isMobile && openDesktopUserInfoStatusDrawer) {
      setOpenDesktopUserInfoStatusDrawer(false)
    }
  }, [isMobile]);

  useEffect(() => {
    if(openDesktopUserInfoStatusDrawer) update();
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

  const { isShowMobileLogoutModal , isShowTelegramModal, isShowDepositModal, isShowInviteBonusModal ,isShowMaintenanceModal , } = useSelector((state: RootState) => state.app)

  // NOTE: NotificationDrawer
  const [openDesktopNotificationDrawer, setOpenDesktopNotificationDrawer] = useState(false);

  // NOTE: InitialChargeModal
  // const [openInitailChargeModal, setOpenInitailChargeModal] = useState(isLogin);

  const setOpenInitailChargeModal = (show: boolean) => {
    dispatch(appSlice.actions.setIsShowInviteBonusModal(show))
  }

  const isShowMobileHeader = props.showMobileHeader === undefined ? true : props.showMobileHeader;
  const isShowTabbar = props.showTabbar === undefined ? true : props.showTabbar;
  const isShowMobileFooter = props.showMobileFooter === undefined ? true : props.showMobileFooter;
  const isShowDesktopFooter = props.showDesktopFooter === undefined ? true : props.showDesktopFooter;

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


  const openNotificationWithIcon = (props: IOpenNotificationWithIcon) => {
    const type = props.type || "error";
    const msg = props.message || "Message"
    api[type]({
      message: msg,
      description: props.description,
    });
  };

  // openNotificationWithIcon('error')
  const telegramServiceId = AppLocalStorage.getItem(AppLocalStorageKey.telegramService);
  const telegramManagerId = AppLocalStorage.getItem(AppLocalStorageKey.telegramManager);
  const telegramGroupId = AppLocalStorage.getItem(AppLocalStorageKey.telegramGroup);

  const userInfoString = AppLocalStorage.getItem(AppLocalStorageKey.userInfo);
  const userInfo = userInfoString && userInfoString !== "undefined"  ? JSON.parse(userInfoString) : null;
  const user_id = userInfo?.user_id || '';

  const telegramServiceUrl=`https://t.me/${telegramServiceId}`
  const telegramManagerUrl=`https://t.me/${telegramManagerId}`
  const telegramGroupUrl=`https://t.me/${telegramGroupId}?start=${user_id}`


  const location = useLocation();
  const {onClickToWallet} = usePageNavigate();

  // console.log("location", location);
  const isCurrentPageCompanyProfile = location.pathname === PageOrModalPathEnum.CompanyProfilePage

  const onClickToOpenTelegramService = () => {
    window.open(telegramServiceUrl,'_blank')
  }

  const onClickToOpenTelegramManager = () => {
    window.open(telegramManagerUrl,'_blank')
  }

  const onClickToOpenTelegramGroup = () => {
    window.open(telegramGroupUrl,'_blank')
  }

  const [hideAddToMobileShortcut] = useLocalStorage(AppLocalStorageKey.hideAddToMobileShortcut, false)

  // useEffect(() => {
  //   window.addEventListener('storage', function(event){
  //     // if (event.storageArea === localStorage) {
  //     //   It's local storage
  //       console.log("debug.event", event)
  //     // }
  //   }, false);
  // }, [])

  const isShowiOSDownloadPopover = useSelector((state: RootState) => state.app.isShowiOSDownloadPopover);

  useEffect(() => {
    const handleStorage = () => {
      // Place for a function responsible for
      // pulling and displaying local storage data
      console.log("debug")
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])


  const inNativeApp = useSelector((rootState: RootState) => rootState.app.inNativeApp);

  return (
    <>
      {renderByPlatform({
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
            onClickToDownload={onClickToDownload}
            onClickToOpenTelegramManager={onClickToOpenTelegramManager}
            isUILoading={isUILoading}
            showToolboxConfig={props.showToolboxConfig}
          >
            {props.children}
          </CPageTemplate>
        ),
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
            onClickToDownload={onClickToDownload}
            onClickToOpenTelegramManager={onClickToOpenTelegramManager}
            isUILoading={isUILoading}
            showToolboxConfig={props.showToolboxConfig}
          >
            {props.children}
          </WPageTemplate>
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
          onClickToDownload={onClickToDownload}
          onClickToOpenTelegramManager={onClickToOpenTelegramManager}
          isUILoading={isUILoading}
          showToolboxConfig={props.showToolboxConfig}
        >
          {props.children}
        </PPageTemplate>
      ))}


      {/*Logout*/}
      {isMobile && isShowMobileLogoutModal && (
        <LogoutModal/>
      )}
      {!isMobile && isShowMobileLogoutModal && (
        <LogoutPopover close={() => {
          setOpenLogoutPopover(false);
        }}/>
      )}

      {openDesktopUserInfoStatusDrawer && (
        <UserInfoStatusPopover
          close={() => setOpenDesktopUserInfoStatusDrawer(false)}
        />
      )}

      {openDesktopNotificationDrawer && (
        <NotificationDrawer closeDrawer={() => {
          setOpenDesktopNotificationDrawer(false)
        }}/>
      )}

      {
        isShowDepositModal && !isShowInviteBonusModal && (
          <DepositAdvertisementModal
            close={()=>dispatch(appSlice.actions.setShowDepositModal(false))}
            onConfirm={()=>{
              dispatch(appSlice.actions.setShowDepositModal(false));
              onClickToWallet({'panelType':'deposit'})
            }}
          />
        )
      }

      {isShowTelegramModal && (
        <TelegramContactModal
          close={() => {
            dispatch(appSlice.actions.setShowTelegramModal(false))
          }}
          toTelegramGroup={() => {
            dispatch(appSlice.actions.setShowTelegramModal(false))
            onClickToOpenTelegramGroup();
          }}
        />
      )}

      {/*比 TelegramContactModal 還上層*/}
      {isShowInviteBonusModal && (
        <InviteBonusModal
          close={() => {
            setOpenInitailChargeModal(false);
          }}
          onConfirm={() => {
            setOpenInitailChargeModal(false);
            dispatch(appSlice.actions.setShowTelegramModal(false))
            dispatch(appSlice.actions.setShowDepositModal(false));
            navigate(PageOrModalPathEnum.InvitePage);
          }}/>
      )}


      {/*Download*/}
      {openDownloadModal && (
        <DownloadModal close={() => {
          setOpenDownloadModal(false)
        }}/>
      )}
      {
        isShowMaintenanceModal && (
          <MaintenanceModal
             onClickToOpenTelegramService={onClickToOpenTelegramService}
          />
        )
      }

      {!inNativeApp && (
        <>
          {!hideAddToMobileShortcut && isMobile && <AddToMobileShortcut isShowTabbar={isShowTabbar}/>}
          {isShowiOSDownloadPopover && isMobile && <IOSDownloadModal/>}
        </>
      )}
      {contextHolder}

    </>
  )

}
