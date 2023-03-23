import React, {useCallback, useEffect, useState} from "react";
import {BankVendor, GetBindCardDropListResponse} from "../../../../../api/old/GetBindCardDropList";

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

  useEffect(() => {
    if(!props.bindCardDropListData) return;
    const walletList = props.bindCardDropListData && props.bindCardDropListData.availableBanks && props.bindCardDropListData.availableBanks.map((wallet: BankVendor) => {
      return wallet.bankName
    });
    setBankDropList(walletList);
  }, [props.bindCardDropListData]);

  //NOTE: 選擇的帳號
  const [bankAccountValue, setBankAccountValue] = useState(0);

  const onIFSCDropSelect = useCallback((index: number) => {
    setBankAccountValue(index);
  }, []);

  return {
    bankDropList,
    bankAccountValue,
    onIFSCDropSelect,
  }
};
