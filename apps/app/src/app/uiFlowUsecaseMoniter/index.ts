import { GetUserInfoServiceResponse } from '../externel/backend/userService/GetUserInfoServiceResponse';
import { IUseFinishedBindBankAccountPage } from '../ui/pages/BindBankCardPage/hooks/common/useFinishedBindBankAccountForm';
import { appLoadAndroidAppInfo } from './appLoadAndroidAppInfo';
import { debugAPIConnection } from './debugAPIConnection';
import { userBindBankAccount } from './userBindBankAccount';
import { userLogin } from './userLogin';

export class MonitorUsecaseFlow {
  public static appLoadAndroidAppInfo() {
    appLoadAndroidAppInfo();
  }

  // TODO: 目前只有 PureH5 有 setContext and setUser
  static userLogin(userResponse: GetUserInfoServiceResponse) {
    userLogin(userResponse);
  }

  public static userBindBankAccount(props: IUseFinishedBindBankAccountPage) {
    userBindBankAccount(props);
  }
  public static userBindBankAccountBadly(requestBody: any) {
    userBindBankAccount(requestBody);
  }

  public static debugAPIConnection(props: {
    method?: string;
    url: string;
    params: any;
    data: any;
    result: any;
  }) {
    debugAPIConnection(props);
  }
}
