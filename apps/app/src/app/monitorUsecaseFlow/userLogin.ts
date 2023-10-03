import {IMonitorUsecaseFlow} from "./IMonitorUsecaseFlow";
import {AppFlag} from "../../environments/flag";
import {getUserPhoneNo} from "../modules/sentry";
import * as Sentry from '@sentry/react';
import posthog from 'posthog-js';

function getUserStatusName(status: number) {
  return ['未認證', '通過認證', '審核中', '審核拒絕'][status];
}

export const userLogin: IMonitorUsecaseFlow["userLogin"] = (userResponse) => {
  // if (AppEnvironment.isLocalhost()) return;

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
