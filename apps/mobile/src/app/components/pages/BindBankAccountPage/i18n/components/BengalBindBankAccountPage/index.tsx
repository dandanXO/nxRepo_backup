import React, {useState} from "react";
import {IUseBindBankAccountPage,} from "../../types/IUseBindBankAccountPage";
import {CustomPage} from "../../../components/CustomPage";
import {useBindBankAccountForm} from "../../hooks/common/useBindBankAccountForm";
import {usePakistanBankAccountForm} from "../../hooks/pakistan/usePakistanBankAccountForm";
import {useFinishedBindBankAccountForm} from "../../hooks/common/useFinishedBindBankAccountForm";
import {usePakistanMobileWalletForm} from "../../hooks/pakistan/usePakistanMobileWalletForm";
import {MobileWalletForm} from "./MobileWalletForm";


export const BengalBindBankAccountPage = (props: IUseBindBankAccountPage) => {
  // // NOTE: 選擇支付方式
  const {
    // Wallet List
    walletDropList,
    walletValue,
    setWalletValue,
    // Wallet Account
    mobileData,
    onMobileDataChange,
    validateMobileWalletAccount,
    // Form
    isFormPending: isWalletFormPending,
    confirm: confirmMobileWallet,
  } = usePakistanMobileWalletForm({
    triggerPostBankBindSaveToPKMutation: props.triggerPostBankBindSaveToPKMutation,
    bindCardDropListData: props.bindCardDropListData,
  });

  const  {
    bankcardNoData,
    onAccountNumberChange,
    onAccountNumberBlur,
    confirmedBankcardNoData,
    onConfirmAccountNumberChange,
    onConfirmAccountNumberBlur,
    validate: validateCommonForm,
  } = useBindBankAccountForm();

  const {
    bankDropList,
    bankAccountValue,
    onIFSCDropSelect,
  } = usePakistanBankAccountForm({
    bindCardDropListData: props.bindCardDropListData,
  });

  const {
    isFormPending,
    confirm,
  } = useFinishedBindBankAccountForm({
    // NOTICE: Common
    bankcardNoData,

    // NOTICE: India
    // postBankBindSave: props.postBankBindSave,
    // ifscData,
    // upiData,

    // NOTICE: Pakistan
    postBankBindSaveToPK: props.postBankBindSaveToPK,
    // NOTE: 取得電子錢包列表
    bindCardDropListData: props.bindCardDropListData,
    // NOTE: 設定電子錢包列表
    bankAccountValue,
  });

  return (
    <CustomPage>
      <MobileWalletForm
        walletDropList={walletDropList}
        walletValue={walletValue}
        setWalletValue={setWalletValue}
        mobileData={mobileData}
        onMobileDataChange={onMobileDataChange}
        validateMobileWalletAccount={validateMobileWalletAccount}
        isFormPending={isFormPending}
        confirm={() => {
          confirmMobileWallet();
        }}
      />
    </CustomPage>
  );
}
