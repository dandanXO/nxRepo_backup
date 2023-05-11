import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { AppFlag } from '../../../environments/flag';
import { Application } from '../application';
import { Extras } from '@sentry/types';
import { getAppInfo } from '../nativeAppInfo/getAppInfo';
import { Primitive } from '@sentry/types/types/misc';
import { GetUserInfoServiceResponse } from '../../api/userService/GetUserInfoServiceResponse';
import { AndroidAppInfo } from '../nativeAppInfo/persistent/androidAppInfo';

const DSN = 'https://4a49d8eb6e164c86a8284b81294ed8d1@monitor.sijneokd.com/3';

if (AppFlag.enableSentry) {
  const environmentName = Application.getEnvironmentName();
  const replayConfig = {
    maskAllText: false,
    maskAllInputs: false,
    blockAllMedia: false,
  };
  // const replay = new Sentry.Replay(replayConfig);
  // replay.start();
  const sentryConfig: Sentry.BrowserOptions = {
    // dsn: "https://c7460b88e57746c2804aec8514c3eef6@o4504354754985984.ingest.sentry.io/4505027128852480",
    // NOTE: self-hosting
    dsn: DSN,
    environment: environmentName,
    integrations: [
      new BrowserTracing(),
      // replay
      new Sentry.Replay(replayConfig),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  };
  if (!Application.isLocalhost()) {
    sentryConfig.release = AppInfo.COMMITHASH;
  }
  Sentry.init(sentryConfig);
}

function getUserStatusName(status: number) {
  return ['未認證', '通過認證', '審核中', '審核拒絕'][status];
}

export class SentryModule {
  static appInfo = getAppInfo();

  static captureMessage(
    message: string,
    tags?: { [key: string]: Primitive },
    extra?: Extras
  ) {
    if (!AppFlag.enableSentry) return;

    console.log('appInfo', SentryModule.appInfo);
    Sentry.captureMessage(message, {
      level: 'info',
      tags: {
        packageId: SentryModule.appInfo.packageId,
        uiVersion: SentryModule.appInfo.uiVersion,
        mode: SentryModule.appInfo.mode,
        appName: SentryModule.appInfo.appName,
        domain: AndroidAppInfo.domain,
        ...tags,
      },
      extra: {
        environment: AndroidAppInfo.environment,
        ...extra,
      },
    });
  }
  static userLogin(userResponse: GetUserInfoServiceResponse) {
    if (!AppFlag.enableSentry) return;
    const userInfo = {
      'user.demoAccount': userResponse.demoAccount,
      'user.phoneNo': userResponse.userName,
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
}

// export const SentryModuleInstance = new SentryModule();
