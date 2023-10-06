import { GetUserInfoServiceResponse } from '../externel/backend/userService/GetUserInfoServiceResponse';
import { IUseFinishedBindBankAccountPage } from '../ui/pages/BindBankCardPage/hooks/common/useFinishedBindBankAccountForm';

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
