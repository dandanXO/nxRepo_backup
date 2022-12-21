import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import {environment} from "./environments/environment";


Sentry.init({
  dsn: "https://24e0adc52fe84c69812ad7f500b771d8@o4504354754985984.ingest.sentry.io/4504365838434304",
  integrations: [new BrowserTracing()],
  environment: `${environment.countryName}`,
  release: appInfo.COMMITHASH,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
