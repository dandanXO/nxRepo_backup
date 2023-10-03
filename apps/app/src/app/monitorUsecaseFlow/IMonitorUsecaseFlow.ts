import {GetUserInfoServiceResponse} from "../api/userService/GetUserInfoServiceResponse";
import {
  IUseFinishedBindBankAccountPage
} from "../presentation/pages/BindBankCardPage/hooks/common/useFinishedBindBankAccountForm";

export interface IMonitorUsecaseFlow {
  appLoadAndroidAppInfo: () => void;
  userLogin: (userResponse: GetUserInfoServiceResponse) => void;
  userBindBankAccount: (props: IUseFinishedBindBankAccountPage) => void;
  userBindBankAccountBadly: (requestBody: any) => void;
  debugAPIConnection: (props: {
    method?: string;
    url: string;
    params: any;
    data: any;
    result: any;
  }) => void;
}
