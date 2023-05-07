import React, { useEffect, useState } from 'react';
import { IUseBindBankAccountPage } from '../../../types/IUseBindBankAccountPage';
import { CustomPage } from '../../../../../components/layouts/CustomPage';
import { ChooseBindMethod } from '../../ChooseBindMethod';
import { MobileWalletForm } from './MobileWalletForm';
import { BankAccountForm } from './BankAccountForm';
import { useBindBankAccountForm } from '../../../hooks/common/useBindBankAccountForm';
import { usePakistanBankAccountForm } from '../../../hooks/i18n/pakistan/usePakistanBankAccountForm';
import { useFinishedBindBankAccountForm } from '../../../hooks/common/useFinishedBindBankAccountForm';
import { usePakistanMobileWalletForm } from '../../../hooks/i18n/pakistan/usePakistanMobileWalletForm';
import { Outlet } from 'react-router';
import styled from 'styled-components';

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
  const [chooseBindMethodValue, setChooseBindMethodValue] = useState<0 | 1>(1);

  const changeOptionValue = (value: 0 | 1) => {
    setChooseBindMethodValue(value);
  };

  useEffect(() => {
    props.triggerGetBindCardDropListQuery();
  }, []);

  const {
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
    onMobileDataBlur,
    //confirm Wallet Account
    confirmMobileData,
    onConfirmMobileDataChange,
    onConfirmMobileDataBlur,
    iBanData: iBanDataMobileWallet,
    onIBanChange: onMobileWalletIBanChange,
    onIbanBlur: onMobileWalletIbanBlur,
    confirm: confirmMobileWallet,
  } = usePakistanMobileWalletForm({
    isPostBankBindSaveToPKMutationLoading:
      props.isPostBankBindSaveToPKMutationLoading || false,
    triggerPostBankBindSaveToPKMutation:
      props.triggerPostBankBindSaveToPKMutation,
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

  const { isFormPending, confirm } = useFinishedBindBankAccountForm({
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
    iBanData,
  });

  return (
    <>
      <Outlet />
      <ChooseBindMethod
        value={chooseBindMethodValue}
        changeOptionValueCallback={changeOptionValue}
        disable={props.bindCardDropListData?.showBankOption || false}
      />

      <div
        className={
          'bg-cstate-info-variant text-cstate-info-main rounded-md px-3 py-2 mb-4 text-xs font-bold '
        }
      >
        <span className={'underline font-bold'}>
          Once added, it cannot be edited anymore.{' '}
        </span>
        <span>
          Please ensure that the account belongs to you, and that all
          information is correct and accurate.
        </span>
      </div>

      {chooseBindMethodValue === 0 ? (
        <MobileWalletForm
          walletDropList={walletDropList}
          walletValue={walletValue}
          setWalletValue={setWalletValue}
          mobileData={mobileData}
          onMobileDataChange={onMobileDataChange}
          onMobileDataBlur={onMobileDataBlur}
          confirmMobileData={confirmMobileData}
          onConfirmMobileDataChange={onConfirmMobileDataChange}
          onConfirmMobileDataBlur={onConfirmMobileDataBlur}
          iBanData={iBanDataMobileWallet}
          onIBanChange={onMobileWalletIBanChange}
          onIbanBlur={onMobileWalletIbanBlur}
          isFormPending={isFormPending || false}
          confirm={() => {
            // country
            confirmMobileWallet();
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
            const validation = validateCommonForm(); // account Number
            const validation2 = confirmBankAccount(); // Iban
            // common
            if (validation && validation2) confirm();
          }}
          iBanData={iBanData}
          onIBanChange={onIBanChange}
          onIbanBlur={onIbanBlur}
        />
      )}
    </>
  );
};
