import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { CaptureContext, Extras } from '@sentry/types';
import { Primitive } from '@sentry/types/types/misc';
import posthog from 'posthog-js'
import { AppFlag } from '../../../environments/flag';
import { AppEnvironment } from '../appEnvironment';

import { GetUserInfoServiceResponse } from '../../api/userService/GetUserInfoServiceResponse';
import { NativeAppInfo } from '../../persistant/nativeAppInfo';
import {appStore, RootState} from "../../reduxStore";
import WebpackSentryConfig from "./WebpackSentryConfig.json";

// NOTICE: refactor me
const DSN = 'https://4a49d8eb6e164c86a8284b81294ed8d1@monitor.sijneokd.com/3';

let load = false;

if (AppFlag.enableSentry && load === false) {
  load = true;
  const environmentName = AppEnvironment.getEnvironmentName();
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
      new posthog.SentryIntegration(posthog, WebpackSentryConfig.org, WebpackSentryConfig.projectId, WebpackSentryConfig.url + "organizations/"),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  };
  if (!AppEnvironment.isLocalhost()) {
    sentryConfig.release = AppInfo.COMMITHASH;
  }
  Sentry.init(sentryConfig);
}

function getUserStatusName(status: number) {
  return ['未認證', '通過認證', '審核中', '審核拒絕'][status];
}


const getUserPhoneNo = () => {
  return NativeAppInfo.phoneNo ? NativeAppInfo.phoneNo : "unknown";
}

function getCommonTags() {
  const appState: RootState = appStore.getState()
  const user = appState?.indexPage?.user

  return {
    packageId: NativeAppInfo.packageId,
    uiVersion: NativeAppInfo.uiVersion,
    mode: NativeAppInfo.mode,
    appName: NativeAppInfo.appName,
    domain: NativeAppInfo.domain,
    "user.userName": user.userName !== "" ? user.userName : "unknown",
    "user.phoneNo": getUserPhoneNo(),
  }
}

export class SentryModule {
  static captureException(exception: any, captureContext?: CaptureContext, tags?: { [key: string]: Primitive },) {
    if (AppEnvironment.isLocalhost()) return;
    if (!AppFlag.enableSentry) return;

    const commonTags = getCommonTags();

    Sentry.captureException(exception, {
      tags: {
        ...commonTags,
        ...tags,
      },
      extra: {
        environment: NativeAppInfo.environment,
      },
      ...captureContext,
    });

  }

  static captureMessage(
    message: string,
    tags?: { [key: string]: Primitive },
    extra?: Extras
  ) {
    if (AppEnvironment.isLocalhost()) return;
    if (!AppFlag.enableSentry) return;

    console.log('appInfo', NativeAppInfo);

    const appState: RootState = appStore.getState()
    const user = appState?.indexPage?.user
    // console.log("user", user);

    const commonTags = getCommonTags();

    Sentry.captureMessage(message, {
      level: 'info',
      tags: {
        ...commonTags,
        ...tags,
      },
      extra: {
        environment: NativeAppInfo.environment,
        ...extra,
      },
    });
  }

  static userLogin(userResponse: GetUserInfoServiceResponse) {
    if (AppEnvironment.isLocalhost()) return;

    if (AppFlag.enableSentry) {
      const userInfo = {
        "user.phoneNo": getUserPhoneNo(),
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

    if(AppFlag.enablePosthog) {
      posthog.identify(getUserPhoneNo(), {
        "user.phoneNo": getUserPhoneNo(),
        'user.demoAccount': userResponse.demoAccount,
      })
      // posthog.reset(true)

    }
  }


}

// export const SentryModuleInstance = new SentryModule();
