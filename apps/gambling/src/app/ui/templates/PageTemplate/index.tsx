import styled from "styled-components";
import cx from "classnames"
// import { space, layout, typography, color } from 'styled-system'
import {Header} from "./Header";

import React, {useEffect, useState} from "react";
import {MenuDrawer} from "../../drawers/MenuDrawer";
import useBreakpoint from "../../hooks/useBreakpoint";
import {UserLoginStatusModal} from "../../modals/UserLoginStatusModal";
import {UserLoginStatusDrawers} from "../../drawers/UserLoginStatusDrawers";
import {UserInfoStatusPopover} from "../../popover/UserInfoStatusPopover";
import {ThreeDots} from 'react-loading-icons';
import {NotificationDrawer} from "../../drawers/NotificationDrawer";
import {InviteBonusModal} from "../../modals/InviteBonusModal";
import {LogoutPopover} from "../../popover/LogoutPopover";
import {DownloadModal} from "../../modals/DownloadModal";

import {notification} from 'antd';
import {RootState} from "../../../reduxStore";
import {useDispatch, useSelector} from "react-redux";
import {appSlice} from "../../../reduxStore/appSlice";
import { AppLocalStorage } from "../../../persistant/localstorage";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useLocation, useNavigate} from "react-router";
import { TabBar } from "./TabBar";
import {LogoutModal} from "../../modals/LogoutModal";
import App from "next/app";
import {TelegramContactModal} from "../../modals/TelegramContactModal";
import {ErrorPage} from "../../pages/ErrorPage";
import { ErrorBoundary } from "react-error-boundary";
import {environment} from "../../../../environments/environment";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import {useAutoUpdateBalance} from "../../hooks/useAutoUpdateBalance";
import {Toolbox} from "./Toolbox";
import {Footer} from "./Footer";
import {HeaderMobile} from "./HeaderMobile";
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

type IStyledPage = {
  isCurrentPageCompanyProfile: boolean;
}
const StyledPage = styled.div.attrs((props) => ({
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
  &:after {
    content: "";
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -2;
    background: url("assets/${environment.assetPrefix}/bg_web.png") center bottom no-repeat;

    @media (max-width: 768px) {
      background: url("assets/${environment.assetPrefix}/bg_h5.png") center bottom /130% auto;
    }
  }

  ${(props) => props.isCurrentPageCompanyProfile && `
    background: url("assets/${environment.assetPrefix}/bg.888bcf29.png") no-repeat center center/100% auto;
    background-color:#090b0f;
  `};
  @media (min-width: 640px) {
    &:after {
      //background: url("assets/bgImg.3a85b39c.jpg") no-repeat center center/100% auto;
    }
  }

`;



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

  const [openMenuDrawer, setOpenMenuDrawer] = useState(false);



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
  const dispatch = useDispatch();
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

  return (
    <StyledPage isCurrentPageCompanyProfile={isCurrentPageCompanyProfile}>

      {contextHolder}

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
          openLogoutPopover={isShowMobileLogoutModal}

        />
      )}

      <div className={"h-full flex flex-row"}>

        {/*{isShowDesktopMenuDrawer && openMenuDrawer && (*/}
        {/*  <MenuDrawer*/}
        {/*    className={cx("fixed left-0 bottom-0 w-[276px] min-w-[276px] h-full z-30", {*/}
        {/*      "w-[0px]": !isShowDesktopMenuDrawer,*/}
        {/*    })}*/}
        {/*    closeMenuDrawer={ () => {*/}
        {/*      setOpenMenuDrawer(false)*/}
        {/*    }}/>*/}
        {/*)}*/}
        {isShowDesktopMenuDrawer && (
          <MenuDrawer
            className={cx("fixed bottom-0 w-[276px] min-w-[276px] h-full z-30",
              "ease-in-out",
              {
                "duration-300": true, //isMobile,
                // "w-[0px]": !isShowDesktopMenuDrawer,
                "left-[-276px]": isMobile && !openMenuDrawer,
                "flex left-0": openMenuDrawer,
              }
            )}
            closeMenuDrawer={ () => {
              setOpenMenuDrawer(false)
            }}
            openMenuDrawer={openMenuDrawer}
          />
        )}

        {/*refactor: openNotificationWithIcon*/}
        {/*{showUserLoginStatusMobileModal && (*/}
        {isMobile && isShowLoginModal && (
          <UserLoginStatusModal
            openNotificationWithIcon={openNotificationWithIcon}
            close={() => {
              // setShowUserLoginStatusMobileModal(false)
              showLoginModal(false)
            }}
            setIsLogin={(login: boolean) => setIsLogin(login)}
          />
        )}
        {/*{openNonMobileUserLoginStatusDrawer && (*/}
        {!isMobile && isShowLoginModal && (
          <UserLoginStatusDrawers
            openNotificationWithIcon={openNotificationWithIcon}
            closeDrawer={() => {
              // setOpenNonMobileUserLoginStatusDrawer(false);
              showLoginModal(false)
            }}
            setIsLogin={() => setIsLogin(true)}
          />
        )}

        {openDownloadModal && (
          <DownloadModal close={() => {
            setOpenDownloadModal(false)
          }}/>
        )}

        {openDesktopUserInfoStatusDrawer && (
          <UserInfoStatusPopover close={() => setOpenDesktopUserInfoStatusDrawer(false)}/>
        )}

        {openDesktopNotificationDrawer && (
          <NotificationDrawer closeDrawer={() => {
            setOpenDesktopNotificationDrawer(false)
          }}/>
        )}

        {!isMobile && isShowMobileLogoutModal && (
          <LogoutPopover close={() => {
            setOpenLogoutPopover(false);
          }}/>
        )}

        {isShowTelegramModal && (
          <TelegramContactModal close={() => {
            dispatch(appSlice.actions.setShowTelegramModal(false))
          }} toTelegram={() => {
            dispatch(appSlice.actions.setShowTelegramModal(false))
            onClickToOpenTelegramService()
          }}/>
        )}

        {isShowInviteBonusModal && (
          <InviteBonusModal
            close={() => {
              setOpenInitailChargeModal(false);
            }}
            onConfirm={() => {
              setOpenInitailChargeModal(false);
              navigate(PageOrModalPathEnum.InvitePage);
            }}/>
        )}

        <div className={cx("w-full h-full", {
          "relative": !isMobile,
          "top-[100px]": isShowDesktopHeader,
          "left-[276px] w-[calc(100vw-276px)]": !isMobile && isShowDesktopMenuDrawer,
          "bg-[]": !isCurrentPageCompanyProfile && !isMobile,//背景色
        })} style={{
        }}>
          {isMobile && isShowMobileHeader && (
            <HeaderMobile
              clickToOpenMenuDrawer={() => {
                setOpenMenuDrawer(!openMenuDrawer)
              }}
              clickToOpenUserLoginStatusModal={() => {
                // setShowUserLoginStatusMobileModal(true);
                showLoginModal(true)
              }}
            />
          )}

          {isMobile && isShowMobileLogoutModal && (
            <LogoutModal/>
          )}

          {/*NOTE: 佔據高度*/}
          {isMobile ? (
            isShowMobileHeader && <div className={"h-[52.5px]"}></div>
          ) : (
            isShowMobileHeader && <div className={"h-[13px]"}></div>
          )}

          <ErrorBoundary fallback={<div className={"text-white"}>Children</div>}>
            {props.children}
          </ErrorBoundary>

          {/*Footer*/}
          <Footer/>

          {isMobile && isShowTabbar&& (
            <TabBar/>
          )}

          {/*Toolbox*/}
          <Toolbox showToolbox={props.showToolbox} onClickToDownload={onClickToDownload} onClickToOpenTelegramManager={onClickToOpenTelegramManager} onClickToOpenTelegramService={onClickToOpenTelegramService}/>
        </div>
      </div>

      {isUILoading && (
        <div className={"z-[9999] fixed top-0 left-0 right-0 bottom-0 bg-black flex flex-col justify-center items-center"}>
          <img className={"w-[60px] mb-6"} src={`/assets/${environment.assetPrefix}/logo_h5.png`}/>
          <ThreeDots height={25} className={'inline-block'} />
        </div>
      )}

    </StyledPage>

  )
}
