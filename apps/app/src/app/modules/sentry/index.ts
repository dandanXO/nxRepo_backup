import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import {environment} from "../../../environments/environment";
import {AppFlag} from "../../app";


export const isLocalhost = () => window.location.hostname === "localhost";

const getEnvironment = () => {
  const envMachine = isLocalhost() ? "localhost" : "production";
  return `${envMachine}:${environment.countryName}`;
}

const env = getEnvironment();
console.log("[Sentry] environment", env);

if(!isLocalhost()) {
  if(AppFlag.enableSentry) {
    Sentry.init({
      dsn: "https://c7460b88e57746c2804aec8514c3eef6@o4504354754985984.ingest.sentry.io/4505027128852480",
      integrations: [new BrowserTracing(), new Sentry.Replay()],
      environment: env,
      release: appInfo.COMMITHASH,
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
      // Session Replay
      replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
      replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    });
  }
}

