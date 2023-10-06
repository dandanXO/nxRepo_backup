import { SentryModule } from '../modules/sentry';
import { BindBankCardPageEvents } from '../ui/pages/BindBankCardPage/event';
import { IMonitorUsecaseFlow } from './IMonitorUsecaseFlow';

export const userBindBankAccountBadly: IMonitorUsecaseFlow['userBindBankAccountBadly'] =
  (requestBody) => {
    SentryModule.captureMessage(
      BindBankCardPageEvents.UserBindBankcard.name,
      BindBankCardPageEvents.UserBindBankcard.getTags('failure', requestBody)
    );
  };
