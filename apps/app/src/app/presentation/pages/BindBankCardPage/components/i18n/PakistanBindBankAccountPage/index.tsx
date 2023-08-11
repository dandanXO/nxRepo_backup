import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';

import { CustomPage } from '../../../../../components/layouts/CustomPage';
import { useBindBankAccountForm } from '../../../hooks/common/useBindBankAccountForm';
import { useFinishedBindBankAccountForm } from '../../../hooks/common/useFinishedBindBankAccountForm';
import { usePakistanBankAccountForm } from '../../../hooks/i18n/pakistan/usePakistanBankAccountForm';
import { usePakistanMobileWalletForm } from '../../../hooks/i18n/pakistan/usePakistanMobileWalletForm';
import { IUseBindBankAccountPage } from '../../../types/IUseBindBankAccountPage';
import { ChooseBindMethod } from '../../ChooseBindMethod';
import { BankAccountForm } from './BankAccountForm';
import { MobileWalletForm } from './MobileWalletForm';
import ConfirmBindBankCardModal from 'apps/app/src/app/presentation/modals/ConfirmBindBankCardModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'apps/app/src/app/reduxStore';
import { modalSlice } from 'apps/app/src/app/reduxStore/modalSlice';


export const PakistanBindBankAccountPage = (props: IUseBindBankAccountPage) => {
  // NOTE: 選擇支付方式
  const [chooseBindMethodValue, setChooseBindMethodValue] = useState<0 | 1>(1);
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.model);

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
    // iBanData: iBanDataMobileWallet,
    // onIBanChange: onMobileWalletIBanChange,
    // onIbanBlur: onMobileWalletIbanBlur,
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
    // iBanData,
    // onIBanChange,
    // onIbanBlur,
    bankCodeList,
    confirm: confirmBankAccount,
  } = usePakistanBankAccountForm({
    bindCardDropListData: props.bindCardDropListData,
  });


  // console.log("bankAccountValue", bankAccountValue);
  // console.log("bankCodeList", bankCodeList);

  // NOTE : 暫時先用變數代替，之後修改
  const isFormPending = false;

  return (
    <>
      <Outlet />
      <ChooseBindMethod
        value={chooseBindMethodValue}
        changeOptionValueCallback={changeOptionValue}
        disable={props.bindCardDropListData?.showBankOption || false}
      />
      <div className={'bg-secondary-assistant text-secondary-main mb-2 rounded-md px-3 py-2 text-xs'}>
        <span>If you wish to borrow an amount greater than 20,000 Rupees, please select “Bank Card” as your preferred payment method.</span>
      </div>
      <div className={'bg-cstate-info-variant text-cstate-info-main mb-4 rounded-md px-3 py-2 text-xs'}>
        <span className={'font-bold underline'}>Once added, it cannot be edited anymore. </span>
        <span>Please ensure that the account belongs to you, and that all information is correct and accurate.</span>
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
          // iBanData={iBanDataMobileWallet}
          // onIBanChange={onMobileWalletIBanChange}
          // onIbanBlur={onMobileWalletIbanBlur}
          isFormPending={isFormPending || false}
          cardholderName={props.cardholderName}
          confirm={() => {
            const validation = confirmMobileWallet();
            if (validation) {
              dispatch(
                modalSlice.actions.updatebindBankcardModal({
                  show: true,
                  confirm: false,
                  paymentMethod: chooseBindMethodValue,
                  cardholderName: props.cardholderName,
                  bankName: '',
                  bankAccNr: '',
                  mobileWallet: true,
                  mobileWalletAccount: mobileData.data,
                  walletVendor: walletValue?.label ?? '',
                  bankCode: '',
                })
              );
            }
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
            const validation2 = confirmBankAccount(); // Iban & Bank Name
            // common
            if (validation && validation2) {
              dispatch(
                modalSlice.actions.updatebindBankcardModal({
                  show: true,
                  confirm: false,
                  paymentMethod: chooseBindMethodValue,
                  cardholderName: props.cardholderName,
                  bankCode: bankCodeList && bankAccountValue.data?.value !== "" && bankCodeList[bankAccountValue.data?.value],
                  bankName: bankAccountValue.data?.label,
                  bankAccNr: bankcardNoData.data,
                  mobileWallet: false,
                  mobileWalletAccount: '',
                  walletVendor: '',
                } as any)
              );
            }
          }}
          // iBanData={iBanData}
          // onIBanChange={onIBanChange}
          // onIbanBlur={onIbanBlur}
        />
      )}
      {modalState.bindBankcardModal.show && <ConfirmBindBankCardModal state={modalState.bindBankcardModal}/>}
    </>
  );
};
