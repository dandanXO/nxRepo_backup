import React, { useCallback, useEffect, useState } from 'react';
import {
  BankVendor,
  GetBindCardDropListResponse,
} from '../../../../../../api/rtk/old/GetBindCardDropList';
import { usePakistanIBanValidate } from '../../../../../../../../../../libs/hooks/src/usePakistanIBanValidate';

interface IUsePakistanBankAccountForm {
  // NOTE: 取得電子錢包列表
  bindCardDropListData?: GetBindCardDropListResponse;
}

// NOTE: 巴基斯坦多家銀行專用 - 帳號列表 Data
export const usePakistanBankAccountForm = (
  props: IUsePakistanBankAccountForm
) => {

  // NOTE: 帳號列表 Data
  const [bankDropList, setBankDropList] = useState<string[]>([]);
  const { iBanData, onIBanChange, onIbanBlur, validateIban } = usePakistanIBanValidate()
  const [bankAccountValue, setBankAccountValue] = useState<{ value: number, label: string }>({ value: 0, label: '' });

  useEffect(() => {
    if(!props.bindCardDropListData) return;
    const walletList = props.bindCardDropListData && props.bindCardDropListData.availableBanks && props.bindCardDropListData.availableBanks.map((wallet: BankVendor) => {
      return wallet.bankName
    });
    setBankDropList(walletList);
    setBankAccountValue({ value: 0, label: walletList[0] })
  }, [props.bindCardDropListData]);

  //NOTE: 選擇的帳號


  const onIFSCDropSelect = useCallback((index:any) => {
    setBankAccountValue(index);
  }, []);

  const confirm = () => {
    return validateIban();
  }

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
