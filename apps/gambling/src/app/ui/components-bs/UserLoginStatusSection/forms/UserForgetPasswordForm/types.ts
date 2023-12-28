import {IOpenNotificationWithIcon} from "../../../../pageTemplate";

export type IUserForgetPasswordForm = {
  confirmToRegister: () => void;
  openNotificationWithIcon: (props: IOpenNotificationWithIcon) => void;
}
