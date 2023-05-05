import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import {environment} from "../../../environments/environment";
import {AppFlag} from "../../../environments/flag";

export const isLocalhost = () => window.location.hostname === "localhost";

const getEnvironment = () => {
  const envMachine = isLocalhost() ? "localhost" : "production";
  return `${envMachine}:${environment.countryName}`;
}

const env = getEnvironment();
console.log("[Sentry] environment", env);


export const Application = {
  isLocalhost: function () {
    return window.location.hostname === "localhost"
  },
  getEnvironmentName: function (){
    const envMachine = this.isLocalhost() ? "localhost" : "production";
    return `${envMachine}:${environment.countryName}`;
  }
}

if(AppFlag.enableSentry) {
  const environmentName = Application.getEnvironmentName();
  const replayConfig = {
    maskAllText: false,
    maskAllInputs: false,
    blockAllMedia: false,
  }
  // const replay = new Sentry.Replay(replayConfig);
  // replay.start();
  const sentryConfig: Sentry.BrowserOptions = {
    // dsn: "https://c7460b88e57746c2804aec8514c3eef6@o4504354754985984.ingest.sentry.io/4505027128852480",
    // NOTE: self-hosting
    dsn: "https://4a49d8eb6e164c86a8284b81294ed8d1@monitor.sijneokd.com/3",
    environment: environmentName,
    integrations: [
      new BrowserTracing(),
      // replay
      new Sentry.Replay(replayConfig)
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  }
  if(!Application.isLocalhost()) {
    sentryConfig.release = AppInfo.COMMITHASH;
  }
  Sentry.init(sentryConfig);
}

