import React, {useEffect, useState} from "react";
import {IUseBindBankAccountPage,} from "../../../types/IUseBindBankAccountPage";
import {CustomPage} from "../../../../../components/layouts/CustomPage";
import {ChooseBindMethod} from "../../ChooseBindMethod";
import {MobileWalletForm} from "./MobileWalletForm";
import {BankAccountForm} from "./BankAccountForm";
import {useBindBankAccountForm} from "../../../hooks/common/useBindBankAccountForm";
import {usePakistanBankAccountForm} from "../../../hooks/i18n/pakistan/usePakistanBankAccountForm";
import {useFinishedBindBankAccountForm} from "../../../hooks/common/useFinishedBindBankAccountForm";
import {usePakistanMobileWalletForm} from "../../../hooks/i18n/pakistan/usePakistanMobileWalletForm";
import { Outlet } from "react-router";
import styled from "styled-components";


const Warning = styled.div`
  //margin: 0 auto;
  //width: 284px;
  //font-size: 15px;
  //font-weight: normal;
  //font-stretch: normal;
  //font-style: normal;
  //line-height: 1.42;
  //letter-spacing: normal;
  //text-align: center;
  //color: #f82626;
`;

export const PakistanBindBankAccountPage = (props: IUseBindBankAccountPage) => {
  // NOTE: 選擇支付方式
  const [chooseBindMethodValue, setChooseBindMethodValue] = useState<0|1>(1);

  const changeOptionValue = (value: 0|1) => {
    setChooseBindMethodValue(value);
  }

  useEffect(() => {
    props.triggerGetBindCardDropListQuery();
  }, [])

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
    // Wallet List
    walletDropList,
    walletValue,
    setWalletValue,
    // Wallet Account
    mobileData,
    onMobileDataChange,
    validateMobileWalletAccount,
    iBanData: iBanDataMobileWallet,
    onIBanChange: onMobileWalletIBanChange,
    onIbanBlur: onMobileWalletIbanBlur,
    confirm: confirmMobileWallet,
  } = usePakistanMobileWalletForm({
    isPostBankBindSaveToPKMutationLoading: props.isPostBankBindSaveToPKMutationLoading || false,
    triggerPostBankBindSaveToPKMutation: props.triggerPostBankBindSaveToPKMutation,
    bindCardDropListData: props.bindCardDropListData,
  });

  const {
    bankDropList,
    bankAccountValue,
    onIFSCDropSelect,
    iBanData,
    onIBanChange,
    onIbanBlur,
    confirm: confirmBankAccount,
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
    isLoadingPostBankBindSaveToPK: props.isLoadingPostBankBindSaveToPK || false,
    postBankBindSaveToPK: props.postBankBindSaveToPK,

    // NOTE: 取得電子錢包列表
    bindCardDropListData: props.bindCardDropListData,
    // NOTE: 設定電子錢包列表
    bankAccountValue,
    iBanData

  });

  return (
    <>
      <Outlet/>
      <ChooseBindMethod value={chooseBindMethodValue} changeOptionValueCallback={changeOptionValue} disable={props.bindCardDropListData?.showBankOption || false}/>

      <div className={"bg-[#E8F0FF] text-[#4285F4] rounded-md p-3 mb-2 text-xs"}>
        <span className={"underline font-medium"}>Once added, it cannot be edited anymore. </span>
        <span>Please ensure that the account belongs to you, and that all information is correct and accurate.</span>
      </div>

      {chooseBindMethodValue === 0 ? (
        <MobileWalletForm
          walletDropList={walletDropList}
          walletValue={walletValue}
          setWalletValue={setWalletValue}
          mobileData={mobileData}
          onMobileDataChange={onMobileDataChange}
          iBanData={iBanDataMobileWallet}
          onIBanChange={onMobileWalletIBanChange}
          onIbanBlur={onMobileWalletIbanBlur}
          validateMobileWalletAccount={validateMobileWalletAccount}
          isFormPending={isFormPending || false}
          confirm={() => {
            // country
            confirmMobileWallet();
            // common
            confirm();
          }}
        />
        ) : (
          <BankAccountForm
            isFormPending={isFormPending || false}
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
            confirm={() => {
              validateCommonForm();
              confirmBankAccount();
            }}
            iBanData={iBanData}
            onIBanChange={onIBanChange}
            onIbanBlur={onIbanBlur}
          />
        )}
    </>
  );
}
