import {IOpenNotificationWithIcon} from "../../../../pageTemplate";

export type IUserRegisterForm = {
  confirmToRegister: () => void;
  openNotificationWithIcon: (props: IOpenNotificationWithIcon) => void;
}
