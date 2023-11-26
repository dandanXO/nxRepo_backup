import * as Sentry from '@sentry/react';
import {BrowserTracing} from '@sentry/tracing';
import {AppEnvironment} from '../../device/appEnvironment';
import WebpackSentryConfig from './WebpackSentryConfig.json';

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
    integrations: [new BrowserTracing()],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  };

  if (Array.isArray(sentryConfig.integrations)) {
    sentryConfig.integrations.push(new Sentry.Replay(replayConfig));
  }

  // NOTE: AppEnvironment.isLocalhost()
  if (!AppEnvironment.isLocalhost()) {
    sentryConfig.release = AppInfo.COMMIT_HASH;
  }
  console.log('[app] sentryConfig', sentryConfig);
  Sentry.init(sentryConfig);
}
