import {IMonitorUsecaseFlow} from "./IMonitorUsecaseFlow";
import {AppEnvironment} from "../device/appEnvironment";
import {SentryModule} from "../modules/sentry";

export const debugAPIConnection: IMonitorUsecaseFlow["debugAPIConnection"] = ({
  method,
  url,
  params,
  data,
  result
}) => {
  if (!AppEnvironment.isDev()) return;
  SentryModule.captureMessage(
    `API: ${method} ${url}`,
    {},
    {
      request: {
        params,
        data,
      },
      response: {
        ...result,
        data: JSON.parse(JSON.stringify(result.data)),
      },
    }
  );
}
