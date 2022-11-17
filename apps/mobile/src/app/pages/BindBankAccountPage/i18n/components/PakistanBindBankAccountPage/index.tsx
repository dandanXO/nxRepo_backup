import React, {useState} from "react";
import {IUseBindBankAccountPage,} from "../../types/IUseBindBankAccountPage";
import {CustomPage} from "../../../components/CustomPage";
import {ChooseBindMethod} from "./ChooseBindMethod";
import {MobileWalletForm} from "./MobileWalletForm";
import {BankAccountForm} from "./BankAccountForm";
import {useBindBankAccountForm} from "../../hooks/common/useBindBankAccountForm";
import {usePakistanBankAccountForm} from "../../hooks/pakistan/usePakistanBankAccountForm";
import {useFinishedBindBankAccountForm} from "../../hooks/common/useFinishedBindBankAccountForm";
import {usePakistanMobileWalletForm} from "../../hooks/pakistan/usePakistanMobileWalletForm";

export const PakistanBindBankAccountPage = (props: IUseBindBankAccountPage) => {
  // NOTE: 選擇支付方式
  const [chooseBindMethodValue, setChooseBindMethodValue] = useState<0|1>(0);

  const changeOptionValue = (value: 0|1) => {
    setChooseBindMethodValue(value);
  }

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
    confirmMobileWalletCallback,
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
      <ChooseBindMethod value={chooseBindMethodValue} changeOptionValueCallback={changeOptionValue} disable={props.bindCardDropListData?.showBankOption || false}/>
      {chooseBindMethodValue === 0 ? (
        <MobileWalletForm
          walletDropList={walletDropList}
          walletValue={walletValue}
          setWalletValue={setWalletValue}
          mobileData={mobileData}
          onMobileDataChange={onMobileDataChange}
          validateMobileWalletAccount={validateMobileWalletAccount}
          isFormPending={isFormPending}
          confirmMobileWalletCallback={confirmMobileWalletCallback}
        />
        ) : (
          <BankAccountForm
            isFormPending={isFormPending}
            cardholderName={props.cardholderName}
            bankcardNoData={bankcardNoData}
            onAccountNumberChange={onAccountNumberChange}
            onAccountNumberBlur={onAccountNumberBlur}
            confirmedBankcardNoData={confirmedBankcardNoData}
            onConfirmAccountNumberChange={onConfirmAccountNumberChange}
            onConfirmAccountNumberBlur={onConfirmAccountNumberBlur}
            bankDropList={bankDropList}
            bankAccountValue={bankAccountValue}
            bindCardDropListData={props.bindCardDropListData}
            onIFSCDropSelect={onIFSCDropSelect}
            confirm={confirm}
          />
        )}
    </CustomPage>
  );
}