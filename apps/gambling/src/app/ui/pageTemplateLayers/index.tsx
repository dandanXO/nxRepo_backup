import React from "react";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {appSlice} from "../../reduxStore/appSlice";

import {NotificationDrawer} from "../drawers/NotificationDrawer";

import {LogoutModal} from "../modals/LogoutModal";
import {DepositAdvertisementModal} from "../modals/DepositAdvertisementModal";
import {TelegramContactModal} from "../modals/TelegramContactModal";
import {InviteBonusModal} from "../modals/InviteBonusModal";
import {DownloadModal} from "../modals/DownloadModal";
import {MaintenanceModal} from "../modals/MaintenanceModal";

import {LogoutPopover} from "../popovers/LogoutPopover";
import {UserInfoStatusPopover} from "../popovers/UserInfoStatusPopover";

import {PageOrModalPathEnum} from "../PageOrModalPathEnum";
import {IQueryStringProps} from "../hooks/usePageNavigate";
import {UserLoginStatusModal} from "../modals/UserLoginStatusModal";
import {IOpenNotificationWithIcon} from "../pageTemplate";

type IModalOpen = {
  isOpen: boolean;
  open: (open: boolean) => void;
}
export type IPageTemplateLayers = {
  isMobile: boolean;
  isShowLoginModal: boolean;
  showLoginModal: IModalOpen["open"];
  setIsLogin: (login: boolean) => void;
  openNotificationWithIcon: (props: IOpenNotificationWithIcon) => void;
  isShowMobileLogoutModal: IModalOpen["isOpen"];
  setOpenLogoutPopover: IModalOpen["open"];

  openDesktopUserInfoStatusDrawer: IModalOpen["isOpen"];
  setOpenDesktopUserInfoStatusDrawer: IModalOpen["open"];

  openDesktopNotificationDrawer: IModalOpen["isOpen"];
  setOpenDesktopNotificationDrawer: IModalOpen["open"];

  isShowDepositModal: boolean;
  isShowInviteBonusModal: boolean;

  onClickToWallet: (queryString?:IQueryStringProps) => void;
  onClickToOpenTelegramGroup: () => void;
  onClickToOpenTelegramService: () => void;

  isShowTelegramModal: IModalOpen["isOpen"];
  setOpenInitailChargeModal: IModalOpen["open"];

  openDownloadModal: IModalOpen["isOpen"];
  setOpenDownloadModal: IModalOpen["open"];

  isShowMaintenanceModal: IModalOpen["isOpen"];
}

export const PageTemplateLayers = ({
                           isMobile,
                           isShowLoginModal,
                           showLoginModal,
                           setIsLogin,
                           openNotificationWithIcon,
                           isShowMobileLogoutModal,
                           setOpenLogoutPopover,
                           openDesktopUserInfoStatusDrawer,
                           setOpenDesktopUserInfoStatusDrawer,
                           openDesktopNotificationDrawer,
                           setOpenDesktopNotificationDrawer,
                           isShowDepositModal,
                           isShowInviteBonusModal,
                           onClickToWallet,
                           isShowTelegramModal,
                           onClickToOpenTelegramGroup,
                           setOpenInitailChargeModal,
                           openDownloadModal,
                           setOpenDownloadModal,
                           isShowMaintenanceModal,
                           onClickToOpenTelegramService,
                         }: IPageTemplateLayers) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>

      {/*Login*/}
      {isShowLoginModal && (
        <UserLoginStatusModal
          showCloseButton={true}
          openNotificationWithIcon={openNotificationWithIcon}
          close={() => {
            showLoginModal(false)
          }}
          setIsLogin={(login: boolean) => setIsLogin(login)}
        />
      )}

      {/*Logout*/}
      {isMobile && isShowMobileLogoutModal && (
        <LogoutModal/>
      )}

      {/*LogoutPopover*/}
      {!isMobile && isShowMobileLogoutModal && (
        <LogoutPopover close={() => {
          setOpenLogoutPopover(false);
        }}/>
      )}

      {/*UserInfoStatusPopover*/}
      {openDesktopUserInfoStatusDrawer && (
        <UserInfoStatusPopover
          close={() => setOpenDesktopUserInfoStatusDrawer(false)}
        />
      )}

      {/*NotificationDrawer*/}
      {openDesktopNotificationDrawer && (
        <NotificationDrawer closeDrawer={() => {
          setOpenDesktopNotificationDrawer(false)
        }}/>
      )}

      {/*DepositAdvertisementModal*/}
      {isShowDepositModal && !isShowInviteBonusModal && (
          <DepositAdvertisementModal
            close={()=>dispatch(appSlice.actions.setShowDepositModal(false))}
            onConfirm={()=>{
              dispatch(appSlice.actions.setShowDepositModal(false));
              onClickToWallet({'panelType':'deposit'})
            }}
          />
      )}

      {/*TelegramContactModal*/}
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
      {/*InviteBonusModal*/}
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

      {/*DownloadModal*/}
      {openDownloadModal && (
        <DownloadModal close={() => {
          setOpenDownloadModal(false)
        }}/>
      )}

      {/*MaintenanceModal*/}
      {isShowMaintenanceModal && (
          <MaintenanceModal
            onClickToOpenTelegramService={onClickToOpenTelegramService}
          />
      )}

    </>
  )
}
