import * as Sentry from "@sentry/browser";
// import {BrowserTracing} from '@sentry/tracing';

import {AppEnvironment} from '../../device/appEnvironment';
import WebpackSentryConfig from './WebpackSentryConfig.json';
import {AppLocalStorage} from "../../persistant/localstorage";
import {AppLocalStorageKey} from "../../persistant/AppLocalStorageKey";
import {IUserInfo} from "../../persistant/IUserInfo";

// NOTE: 初始化
let loaded = false;

if (loaded === false) {
  loaded = true;

  const environmentName = AppEnvironment.getEnvironmentName();
  // console.log("environmentName", environmentName);

  const replayConfig = {
    maskAllText: false,
    maskAllInputs: false,
    blockAllMedia: false,
  };

  const sentryConfig: Sentry.BrowserOptions = {
    // NOTE: self-hosting
    dsn: WebpackSentryConfig.dsn,
    environment: environmentName,
    // integrations: [new BrowserTracing()],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    // Session Replay
    replaysSessionSampleRate: 1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  };

  if (!AppEnvironment.isLocalhost() && Array.isArray(sentryConfig.integrations)) {
    sentryConfig.integrations.push(new Sentry.Replay(replayConfig));
  }

  // NOTE: AppEnvironment.isLocalhost()
  if (!AppEnvironment.isLocalhost()) {
    sentryConfig.release = AppInfo.COMMIT_HASH;
  }
  console.log('[app] sentryConfig', sentryConfig);
  Sentry.init(sentryConfig);
}

if(AppLocalStorage.getItem(AppLocalStorageKey.token)) {
  const unparseUserInfo = AppLocalStorage.getItem(AppLocalStorageKey.userInfo);
  const userInfo: IUserInfo = unparseUserInfo ? JSON.parse(unparseUserInfo) : undefined;
  const userPhone = AppLocalStorage.getItem(AppLocalStorageKey.kPhone);
  const userID = AppLocalStorage.getItem(AppLocalStorageKey.userId);
  console.log("[debug] userInfo:", userInfo)
  console.log("[debug] userPhone:", userPhone)
  console.log("[debug] userID:", userID)

  const userInfoContext = {
    'user.phoneNo': userPhone,
    'user.appPackage': userInfo.app_package_name,
  };
  // console.log('userInfoContext', userInfoContext);
  Sentry.setContext('Custom - User Info', userInfoContext);

  const accountInfo = {
    // NOTE: 帳號個人資訊
    username: userInfo.nickname,
    id: userID || "never_see_id",
    ip_address: userInfo.client_ip,
    // email?: string;
  };
  console.log("[sentry] accountInfo", accountInfo);
  Sentry.setUser(accountInfo);
}


