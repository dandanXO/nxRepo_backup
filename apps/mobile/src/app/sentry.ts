import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import {environment} from "../environments/environment";
import {AppFlag} from "./App";


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
      dsn: "https://24e0adc52fe84c69812ad7f500b771d8@o4504354754985984.ingest.sentry.io/4504365838434304",
      integrations: [new BrowserTracing()],
      environment: env,
      release: appInfo.COMMITHASH,
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });
  }
}

