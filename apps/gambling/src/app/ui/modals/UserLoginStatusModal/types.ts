import {IOpenNotificationWithIcon} from "../../pageTemplate";

export type IContainer = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  onMouseDown?: (event: unknown) => void;
}

export type IUserLoginStatusModal = {
  setIsLogin: (login: boolean) => void;
  close: () => void;
  showCloseButton?: boolean;
  openNotificationWithIcon: (props: IOpenNotificationWithIcon) => void;
}
