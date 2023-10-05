import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { CaptureContext, Extras } from '@sentry/types';
import { Primitive } from '@sentry/types/types/misc';
import posthog from 'posthog-js';

import { AppEnvironment } from '../../device/appEnvironment';
import { AppFlag } from '../../../environments/flag';
import { NativeAppInfo } from '../../application/nativeAppInfo';
import { RootState, appStore } from '../../reduxStore';
import WebpackSentryConfig from './WebpackSentryConfig.json';


// NOTE: 初始化
let loaded = false;

if (AppFlag.enableSentry && loaded === false) {
  loaded = true;

  const environmentName = AppEnvironment.getEnvironmentName();
  // console.log("environmentName", environmentName);

  const replayConfig = {
    maskAllText: false,
    maskAllInputs: false,
    blockAllMedia: false,
  };

  // const replay = new Sentry.Replay(replayConfig);
  // replay.start();

  const sentryConfig: Sentry.BrowserOptions = {
    // NOTE: self-hosting
    dsn: WebpackSentryConfig.dsn,
    environment: environmentName,
    integrations: [
      new BrowserTracing(),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  };

  // NOTE: AppFlag.enableSentryReplay
  if(AppFlag.enableSentryReplay && Array.isArray(sentryConfig.integrations)) {
    sentryConfig.integrations.push(new Sentry.Replay(replayConfig))
  }

  // NOTE: AppFlag.// NOTE: AppFlag.enableSentryReplay
  if(
    AppFlag.enablePosthog &&
    sentryConfig && sentryConfig.integrations && Array.isArray(sentryConfig.integrations)
  ) {
    sentryConfig.integrations.push(new posthog.SentryIntegration(
      posthog,
      WebpackSentryConfig.org,
      WebpackSentryConfig.projectId,
      WebpackSentryConfig.url + 'organizations/'
    ))
  }
  // NOTE: AppEnvironment.isLocalhost()
  if (!AppEnvironment.isLocalhost()) {
    sentryConfig.release = AppInfo.COMMITHASH;
  }
  console.log("[app] sentryConfig", sentryConfig);

  Sentry.init(sentryConfig);

  // TODO:
  // NOTE: Sentry Replay 會新增 Tags
  // const accountInfo = {
    // phoneNo: login.phoneNo,
  // }
  // console.log("[sentry] accountInfo", accountInfo);
  // Sentry.setUser(accountInfo);
}

export class SentryModule {
  static captureException(exception: any, captureContext?: CaptureContext, tags?: { [key: string]: Primitive }) {
    // if (AppEnvironment.isLocalhost()) return;
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

  static captureMessage(message: string, tags?: { [key: string]: Primitive }, extra?: Extras) {
    // if (AppEnvironment.isLocalhost()) return;
    if (!AppFlag.enableSentry) return;

    // console.log('appInfo', NativeAppInfo);

    const appState: RootState = appStore.getState();
    const user = appState?.indexPage?.user;
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


}


export const getUserPhoneNo = () => {
  return NativeAppInfo.phoneNo ? NativeAppInfo.phoneNo : 'unknown';
};

function getCommonTags() {
  const appState: RootState = appStore.getState();
  const user = appState?.indexPage?.user;

  return {
    packageId: NativeAppInfo.packageId,
    uiVersion: NativeAppInfo.uiVersion,
    mode: NativeAppInfo.mode,
    appName: NativeAppInfo.appName,
    domain: NativeAppInfo.domain,
    'user.userName': user.userName !== '' ? user.userName : 'unknown',
    'user.phoneNo': getUserPhoneNo(),
  };
}

// export const SentryModuleInstance = new SentryModule();
