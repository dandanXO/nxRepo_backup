import React, { useCallback, useEffect, useState } from 'react';

import { usePakistanIBanValidate } from '../../../../../../../../../../libs/shared/component/src/hooks/usePakistanIBanValidate';
import { BankVendor, GetBindCardDropListResponse } from '../../../../../../api/rtk/old/GetBindCardDropList';
import { InputValue } from '@frontend/mobile/shared/ui';
import { useTranslation } from 'react-i18next';
import { i18nBankBindAccountPage } from '../../../translations';
interface IUsePakistanBankAccountForm {
  // NOTE: 取得電子錢包列表
  bindCardDropListData?: GetBindCardDropListResponse;
}

// NOTE: 巴基斯坦多家銀行專用 - 帳號列表 Data
export const usePakistanBankAccountForm = (props: IUsePakistanBankAccountForm) => {
  const { t } = useTranslation(i18nBankBindAccountPage.namespace);
  // NOTE: 帳號列表 Data
  const [bankDropList, setBankDropList] = useState<string[]>([]);
  const { iBanData, onIBanChange, onIbanBlur, validateIban } = usePakistanIBanValidate();
  const [bankAccountValue, setBankAccountValue] = useState<InputValue<{ value: number | ''; label: string }>>
  ({
      data: { value: '', label: '' },
      isValidation: false,
      errorMessage: ""
    }
  );

  useEffect(() => {
    if (!props.bindCardDropListData) return;
    const walletList =
      props.bindCardDropListData &&
      props.bindCardDropListData.availableBanks &&
      props.bindCardDropListData.availableBanks.map((wallet: BankVendor) => {
        return wallet.bankName;
      });
    setBankDropList(walletList);
  }, [props.bindCardDropListData]);

  //NOTE: 選擇的帳號
  const onIFSCDropSelect = useCallback((index: any) => {

    setBankAccountValue({
        ...bankAccountValue,
        data:index
    });
  }, []);

  const validateBankAccount=useCallback(()=>{
      const isValidateBankAccount = bankAccountValue.data.value === '';
      setBankAccountValue({
        ...bankAccountValue,
        isValidation: isValidateBankAccount,
        errorMessage: isValidateBankAccount?t('Please select an option') as string:'',
    });
    return !isValidateBankAccount
  },[bankAccountValue.data])

  const confirm = () => {
    validateIban();
    validateBankAccount();
    return validateIban() && validateBankAccount();
  };

  return {
    bankDropList,
    bankAccountValue,
    onIFSCDropSelect,
    iBanData,
    onIBanChange,
    onIbanBlur,
    confirm,
  };
};
