export type IHeader = {
  className?: string;

  isLogin: boolean;
  openLogoutPopover: boolean;
  onClickUserLoginStatusDrawer: () => void;
  onClickToChangeLogoutPopover: (display: boolean) => void;

  openDesktopUserInfoStatusDrawer: boolean;

  onClickToPopupUserInfoStatusPopover: () => void;
  onClickToOpenNotificationDrawer: () => void;

  onClickToDownload: () => void;
}
