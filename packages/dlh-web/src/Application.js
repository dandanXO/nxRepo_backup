import conf from 'conf';
import * as Sentry from "@sentry/react";
import {BrowserTracing} from "@sentry/tracing";

console.log("[api-dlh-web] conf", conf);

export const Application = {
  isLocalhost: function () {
    return window.location.hostname === "localhost"
  },
  getEnvironmentName: function (){
    const envMachine = this.isLocalhost() ? "localhost" : "production";
    return `${envMachine}:${conf.country}`;
  }
}

export const SentryModule = {
  getReplayConfig: function () {
    return {
      maskAllText: false,
      maskAllInputs: false,
      blockAllMedia: false,
    }
  },
  init: function () {
    if(Application.isLocalhost()) {
      const envName = Application.getEnvironmentName();
      console.log("[api-dlh-web][sentry] environment", envName);
      console.log("[api-dlh-web][sentry] isLocalhost", Application.isLocalhost());

      const sentryConfig = {
        dsn: "https://eed8143e74e34bf994b409bf7e64c731@monitor.sijneokd.com/3",
        integrations: [new BrowserTracing(), new Sentry.Replay(this.getReplayConfig())],
        environment: envName,
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
        // Session Replay
        replaysSessionSampleRate: 1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
      }
      if(!Application.isLocalhost()) {
        sentryConfig.release = appInfo.COMMITHASH;
      }
      Sentry.init(sentryConfig);
    }

  }
}
