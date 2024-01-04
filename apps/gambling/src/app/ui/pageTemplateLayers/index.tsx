import React from "react";
import {useNavigate} from "react-router";
import { useDispatch, useSelector } from "react-redux";
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
import {IQueryStringProps, usePageNavigate} from "../router/hooks/usePageNavigate";
import {UserLoginStatusModal} from "../modals/UserLoginStatusModal";
import {IOpenNotificationWithIcon} from "../pageTemplate";
import { RootState } from "../../reduxStore";
import { uiSlice } from "../../reduxStore/uiSlice";
import {GameSearchModal} from "../modals/GameSearchModal";
import {useClickFavoriteGameItem} from "../hooks/useClickFavoriteGameItem";
import {TelegramDetailContactModal} from "../modals/TelegramDetailContactModal";
import { renderByPlatform } from "../utils/renderByPlatform";
import {twMerge} from "tailwind-merge";
import {IOSDownloadModal} from "../modals/IOSDownloadModal";

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

  const { openUserInfoStatusPopover } = useSelector((state: RootState) => state.ui);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isShowGameSearchModal } = useSelector((state: RootState) => state.app);
  const { userFavorite, onClickFavoriteGameItem } = useClickFavoriteGameItem()
  const {isShowTelegramDetailContactModal} = useSelector((state: RootState) => state.app);

  const {
    onClickToOpenTelegramManager,
  } = usePageNavigate();

  // NOTE: iOSDownloadPopover
  const isShowiOSDownloadPopover = useSelector((state: RootState) => state.app.isShowiOSDownloadPopover);
  const isShowIOSDOwnloadModal = isShowiOSDownloadPopover && isMobile;

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
      {
        isShowMobileLogoutModal && (
          renderByPlatform({
            "riojungle777bet": <LogoutModal />
          }, isMobile ? <LogoutModal />: <LogoutPopover />)
        )
      }

      {/*UserInfoStatusPopover*/}
      {openUserInfoStatusPopover && (
        <UserInfoStatusPopover
          close={() => dispatch(uiSlice.actions.closeUserInfoStatusPopover())}
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

      {/*NOTE: IOSDownloadModal*/}
      {isShowIOSDOwnloadModal && (
        <div className={twMerge("z-[1006]", "fixed left-0 top-0 right-0 bottom-0")}>
          {<IOSDownloadModal/>}
        </div>
      )}

      {/*MaintenanceModal*/}
      {isShowMaintenanceModal && (
          <MaintenanceModal
            onClickToOpenTelegramService={onClickToOpenTelegramService}
          />
      )}

      {/*NOTICE: GameSearchModal*/}
      {isShowGameSearchModal && <GameSearchModal
        userFavorite={userFavorite}
        onClickFavoriteGameItem={onClickFavoriteGameItem}
        onClose={() => dispatch(appSlice.actions.setShowGameSearchModal(false))}
      />}

      {isShowTelegramDetailContactModal && (
        <TelegramDetailContactModal
          onClickToOpenTelegramService={onClickToOpenTelegramService}
          onClickToOpenTelegramManager={onClickToOpenTelegramManager}
          onClose={() => {
            dispatch(appSlice.actions.setShowTelegramDetailContactModal(false))
          }}
        />
      )}



    </>
  )
}
