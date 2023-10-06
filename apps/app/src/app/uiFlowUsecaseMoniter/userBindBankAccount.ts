import { SentryModule } from '../modules/sentry';
import { BindBankCardPageEvents } from '../ui/pages/BindBankCardPage/event';
import { IMonitorUsecaseFlow } from './IMonitorUsecaseFlow';

export const userBindBankAccount: IMonitorUsecaseFlow['userBindBankAccount'] = (
  props
) => {
  SentryModule.captureMessage(BindBankCardPageEvents.UserBindBankcard.name, {
    ...BindBankCardPageEvents.UserBindBankcard.getTags(
      'success',
      props.postBankBindSave
        ? {
            bankAccount: props.bankcardNoData.data,
            // ifscCode: props.ifscData && props.ifscData.data,
            // upiId: props.upiData && props.upiData.data,
          }
        : {
            // bankAccNr: props.bankcardNoData.data,
            // mobileWallet: false,
            // mobileWalletAccount: '',
            // walletVendor: '',
            // bankName: (targetBankAccount && targetBankAccount?.bankName) || '',
            // bankCode: (targetBankAccount && targetBankAccount?.bankCode) || '',
            // iban: props.iBanData?.data || '',
          }
    ),
  });
};
