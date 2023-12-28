export type IHeader = {
  className?: string;

  isLogin: boolean;
  openLogoutPopover: boolean;
  onClickUserLoginStatusDrawer: () => void;
  onClickToChangeLogoutPopover: (display: boolean) => void;

  onClickToOpenNotificationDrawer: () => void;

  onClickToDownload: () => void;
}
