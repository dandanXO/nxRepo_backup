import {IOpenNotificationWithIcon} from "../../pageTemplate";

export type IUserLoginStatusSection = {
  // onClickToLogin: () => void;
  // onClickToRegister: () => void;
  confirmToLogin: () => void;
  confirmToRegister: () => void;
  openNotificationWithIcon: (props: IOpenNotificationWithIcon) => void;
  showPlatformLogo?: boolean;
}
