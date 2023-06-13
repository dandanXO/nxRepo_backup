import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { InputValue, Modal } from '@frontend/mobile/shared/ui';

import { BankVendor, GetBindCardDropListResponse } from '../../../../../api/rtk/old/GetBindCardDropList';
import { changeLocationHref } from '../../../../../modules/errorHandler';
import { SentryModule } from '../../../../../modules/sentry';
import { BindBankCardPageEvents } from '../../event';
import { i18nBankBindAccountPage } from '../../translations';

type IUseFinishedBindBankAccountPage = {
  // NOTICE: Common
  bankcardNoData: InputValue<string>;

  // NOTICE: India
  isLoadingPostBankBindSave?: boolean;
  postBankBindSave?: any;
  ifscData?: InputValue<string>;
  upiData?: InputValue<string>;

  // NOTICE: Pakistan
  isLoadingPostBankBindSaveToPK?: boolean;
  postBankBindSaveToPK?: any;
  // iBanData?: InputValue<any>;
  // NOTE: 取得電子錢包列表
  bindCardDropListData?: GetBindCardDropListResponse;
  // NOTE: 設定電子錢包列表
  bankAccountValue?: any;
};

export const useFinishedBindBankAccountForm = (props: IUseFinishedBindBankAccountPage) => {
  const { t } = useTranslation(i18nBankBindAccountPage.namespace);

  const navigateToAPP = () => {
    // let targetBankAccount;
    // if (
    //   props.bindCardDropListData &&
    //   props.bindCardDropListData.availableBanks
    // ) {
    //   // NOTICE: bankAccountValue 可能為 0
    //   if (typeof props.bankAccountValue?.value === 'number') {
    //     targetBankAccount =
    //       props.bindCardDropListData.availableBanks[
    //         props.bankAccountValue.value
    //         ];
    //   }
    // }

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

    changeLocationHref('innerh5://127.0.0.1');
  };

  let targetBankAccount: BankVendor;

  if (props.bindCardDropListData && props.bindCardDropListData.availableBanks) {
    // NOTICE: bankAccountValue 可能為 0
    if (typeof props.bankAccountValue?.value === 'number') {
      targetBankAccount = props.bindCardDropListData.availableBanks[props.bankAccountValue.value];
    }
  }

  const confirm = useCallback(() => {
    if (props.isLoadingPostBankBindSaveToPK) return;

    // NOTE: FormRequest
    let request;
    let requestBody = {};

    // NOTICE: India
    if (props.postBankBindSave) {
      requestBody = {
        bankAccount: props.bankcardNoData.data,
        ifscCode: props.ifscData && props.ifscData.data,
        upiId: props.upiData && props.upiData.data,
      };
      // console.log('requestBody', requestBody);
      request = props.postBankBindSave(requestBody);
    } else if (props.postBankBindSaveToPK) {
      // NOTICE: Pakistan
      requestBody = {
        bankAccNr: props.bankcardNoData.data,
        mobileWallet: false,
        mobileWalletAccount: '',
        walletVendor: '',
        // FIXME:
        bankName: (targetBankAccount && targetBankAccount?.bankName) || '',
        bankCode: (targetBankAccount && targetBankAccount?.bankCode) || '',
        // iban: props.iBanData?.data || '',
      };
      // console.log('requestBody', requestBody);
      request = props.postBankBindSaveToPK(requestBody);
    }

    request
      .unwrap()
      .then((data: any) => {
        // Notice: bind account successfully
        Modal.alert({
          show: true,
          mask: true,
          title: t('modal.Notice', { ns: 'common' }) as string,
          content: t('modal.Success', { ns: 'common' }) as string,
          confirmText: t('modal.Confirm', { ns: 'common' }) as string,
          maskClosable: true,
          enableClose: false,
          enableIcon: false,
          onConfirm: () => {
            navigateToAPP();
          },
        });
      })
      .catch(() => {
        SentryModule.captureMessage(
          BindBankCardPageEvents.UserBindBankcard.name,
          BindBankCardPageEvents.UserBindBankcard.getTags('failure', requestBody)
        );
      });
  }, [
    props.postBankBindSave,
    props.postBankBindSaveToPK,
    props.ifscData && props.ifscData.data,
    props.bankcardNoData.data,
    props.upiData && props.upiData.data,
    props.bindCardDropListData?.availableBanks,
    props.bankAccountValue,
    props.isLoadingPostBankBindSave,
    props.isLoadingPostBankBindSaveToPK,
    // props.iBanData && props.iBanData.data,
  ]);

  return {
    isFormPending: props.postBankBindSave ? props.isLoadingPostBankBindSave : props.isLoadingPostBankBindSaveToPK,
    confirm,
  };
};
