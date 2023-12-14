export type IHeader = {
  className?: string;
  onClickUserLoginStatusDrawer: () => void;
  onClickToPopupUserInfoStatusPopover: () => void;
  isLogin: boolean;
  onClickToOpenNotificationDrawer: () => void;
  openLogoutPopover: boolean;
  openDesktopUserInfoStatusDrawer: boolean;
  onClickToChangeLogoutPopover: (display: boolean) => void;
  onClickToDownload: () => void;
}
