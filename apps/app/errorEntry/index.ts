import * as Sentry from '@sentry/react';

import {AppEnvironment} from '../src/app/device/appEnvironment';
import sentryEnv from '../src/environments/sentryModule/sentry.json';

const environmentName = AppEnvironment.getEnvironmentName();

const sentryConfig: Sentry.BrowserOptions = {
  dsn: sentryEnv.DSN,
  environment: environmentName,
};
sentryConfig.release = AppInfo.COMMITHASH;
Sentry.init(sentryConfig);

window.onerror = (message, source, lineno, colno, error) => {
  console.log('debug.window.onerror');
  console.log(`message: ${message}`);
  console.log(`source: ${source}`);
  console.log(`lineno: ${lineno}`);
  console.log(`colno: ${colno}`);
  console.log(`error: ${error}`);

  const frontendError = new Error();
  frontendError.name = 'window.onerror';
  frontendError.message = JSON.stringify({
    message,
    source,
    lineno,
    colno,
    error,
  });

  Sentry.captureException(frontendError);
  return true;
};
