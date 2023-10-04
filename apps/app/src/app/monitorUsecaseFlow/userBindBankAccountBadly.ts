import {IMonitorUsecaseFlow} from "./IMonitorUsecaseFlow";
import {SentryModule} from "../modules/sentry";
import {BindBankCardPageEvents} from "../presentation/pages/BindBankCardPage/event";

export const userBindBankAccountBadly: IMonitorUsecaseFlow["userBindBankAccountBadly"] = (requestBody) => {
  SentryModule.captureMessage(
    BindBankCardPageEvents.UserBindBankcard.name,
    BindBankCardPageEvents.UserBindBankcard.getTags('failure', requestBody)
  );
}