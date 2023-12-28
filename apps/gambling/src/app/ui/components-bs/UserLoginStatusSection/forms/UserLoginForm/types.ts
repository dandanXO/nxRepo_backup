import {IOpenNotificationWithIcon} from "../../../../pageTemplate";

export type IUserLoginForm = {
  confirmToLogin: () => void;
  openNotificationWithIcon: (props: IOpenNotificationWithIcon) => void;
  onSwitchToForgetPassword: () => void;
}
