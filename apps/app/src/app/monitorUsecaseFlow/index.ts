import {getUserPhoneNo, SentryModule} from "../modules/sentry";
import {GetUserInfoServiceResponse} from "../api/userService/GetUserInfoServiceResponse";
import {AppEnvironment} from "../modules/appEnvironment";
import {AppFlag} from "../../environments/flag";
import * as Sentry from '@sentry/react';
import posthog from 'posthog-js';

function getUserStatusName(status: number) {
  return ['未認證', '通過認證', '審核中', '審核拒絕'][status];
}

export class MonitorUsecaseFlow {
  public static appLoadAndroidAppInfo() {
    // NOTICE: 印度 v58 開始才有, 巴基斯坦 v15 就有了
    if (window['AppInfoTask'] && window['AppInfoTask']['getAppInfo']) {
      const appInfoStr = window['AppInfoTask']['getAppInfo']();
      const originalAppInfo = JSON.parse(appInfoStr);

      SentryModule.captureMessage(
        'App load Original AndroidAppInfo',
        {
          packageId: originalAppInfo.packageId,
          uiVersion: originalAppInfo.uiVersion,
          mode: originalAppInfo.mode,
          appName: originalAppInfo.appName,
          environment: originalAppInfo.environment,
        },
        {
          domain: originalAppInfo.domain,
        }
      );
    } else {
      SentryModule.captureMessage('App cannot load AndroidAppInfo');
    }
  }

  // TODO: 目前只有 PureH5 有 setContext and setUser
  static userLogin(userResponse: GetUserInfoServiceResponse) {
    if (AppEnvironment.isLocalhost()) return;

    if (AppFlag.enableSentry) {
      const userInfo = {
        'user.phoneNo': getUserPhoneNo(),
        'user.userName': userResponse.userName,
        'user.demoAccount': userResponse.demoAccount,
        'user.organic': userResponse.organic,
        'user.oldUser': userResponse.oldUser,
        'user.status': getUserStatusName(userResponse.status),
        'user.needUpdateKyc': userResponse.needUpdateKyc,
      };

      // console.log('userInfo', userInfo);
      Sentry.setContext('Custom - User Info', userInfo);

      const accountInfo = {
        // NOTE: 帳號個人資訊
        username: userResponse.userName,
      };
      // console.log("[sentry] accountInfo", accountInfo);
      Sentry.setUser(accountInfo);
    }

    try {
      if (AppFlag.enablePosthog) {
        posthog.identify(getUserPhoneNo(), {
          "user.phoneNo": getUserPhoneNo(),
          'user.demoAccount': userResponse.demoAccount,
        })
        // posthog.reset(true)
      }
    } catch (e){
      console.log(e)
    }

  }

  public static debugAPIConnection({
    method,
    url,
    params,
    data,
    result
  }: {
    method?: string;
    url: string;
    params: any;
    data: any;
    result: any;
  }) {
    SentryModule.captureMessage(
      `API: ${method} ${url}`,
      {},
      {
        request: {
          params,
          data,
        },
        response: {
          ...result,
          data: JSON.parse(JSON.stringify(result.data)),
        },
      }
    );
  }
}
