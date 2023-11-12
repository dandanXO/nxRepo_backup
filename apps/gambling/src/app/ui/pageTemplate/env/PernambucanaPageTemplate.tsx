import styled from "styled-components";
import {environment} from "../../../../environments/environment";
import {Header} from "../../header/env/pernambucana/Header";
import cx from "classnames";
import {UserLoginStatusModal} from "../../modals/UserLoginStatusModal";
import {UserLoginStatusDrawers} from "../../drawers/UserLoginStatusDrawers";
import {DownloadModal} from "../../modals/DownloadModal";
import {UserInfoStatusPopover} from "../../popover/UserInfoStatusPopover";
import {NotificationDrawer} from "../../drawers/NotificationDrawer";
import {LogoutPopover} from "../../popover/LogoutPopover";
import {TelegramContactModal} from "../../modals/TelegramContactModal";
import {appSlice} from "../../../reduxStore/appSlice";
import {InviteBonusModal} from "../../modals/InviteBonusModal";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {HeaderMobile} from "../../header/env/pernambucana/HeaderMobile";
import {LogoutModal} from "../../modals/LogoutModal";
import {ErrorBoundary} from "react-error-boundary";
import {Footer} from "../../footers/coco777bet/Footer";
import {TabBar} from "../../tabBar";
import {Toolbox} from "../../components/Toolbox";
import {ThreeDots} from "react-loading-icons";
import React from "react";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {PernambucanaMenuDrawerContent} from "../../drawers/MenuDrawer/env/PernambucanaMenuDrawerContent";
import {MenuDrawer} from "../../drawers/MenuDrawer";

type IProps = {
  children?: React.ReactNode;
  isCurrentPageCompanyProfile: boolean;
  contextHolder: any;
  isMobile: boolean;
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
  onClickToOpenTelegramService: () => void;
  isShowInviteBonusModal: boolean;
  setOpenInitailChargeModal: (value: any) => void;
  isShowMobileHeader: boolean;
  isShowTabbar: boolean;
  showToolbox?: boolean;
  onClickToDownload: () => void;
  onClickToOpenTelegramManager: () => void;
  isUILoading: boolean;
}

export const PernambucanaPageTemplate = ({
                                                 children,
                                                 isCurrentPageCompanyProfile,
                                                 contextHolder,
                                                 isMobile,
                                                 isShowDesktopHeader,
                                                 isLogin,
                                                 setIsLogin,
                                                 showLoginModal,
                                                 setOpenDesktopUserInfoStatusDrawer,
                                                 openDesktopUserInfoStatusDrawer,
                                                 openDesktopNotificationDrawer,
                                                 setOpenDesktopNotificationDrawer,
                                                 setOpenLogoutPopover,
                                                 isShowMobileLogoutModal,
                                                 isShowDesktopMenuDrawer,
                                                 openMenuDrawer,
                                                 setOpenMenuDrawer,
                                                 isShowLoginModal,
                                                 openNotificationWithIcon,
                                                 openDownloadModal,
                                                 setOpenDownloadModal,

                                                 isShowTelegramModal,
                                                 onClickToOpenTelegramService,
                                                 isShowInviteBonusModal,
                                                 setOpenInitailChargeModal,
                                                 isShowMobileHeader,
                                                 showToolbox,
                                                 onClickToDownload,
                                                 onClickToOpenTelegramManager,
                                                 isShowTabbar,
                                                 isUILoading,

}: IProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          <MenuDrawer className={"rounded-r-3xl"}>
            <PernambucanaMenuDrawerContent/>
          </MenuDrawer>
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
            {children}
          </ErrorBoundary>

          {/*Footer*/}
          <Footer/>

          {isMobile && isShowTabbar&& (
            <TabBar/>
          )}

          {/*Toolbox*/}
          <Toolbox showToolbox={showToolbox} onClickToDownload={onClickToDownload} onClickToOpenTelegramManager={onClickToOpenTelegramManager} onClickToOpenTelegramService={onClickToOpenTelegramService}/>
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
type IStyledPage = {
  isCurrentPageCompanyProfile: boolean;
}

export const StyledPage = styled.div.attrs((props) => ({
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