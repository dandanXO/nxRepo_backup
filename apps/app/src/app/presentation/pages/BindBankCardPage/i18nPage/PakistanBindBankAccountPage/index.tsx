import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { IUseBindBankAccountPage } from '../types/IUseBindBankAccountPage';
import { ChooseBindMethod } from '../../components/ChooseBindMethod';
import { BankAccountForm } from './BankAccountForm';
import { MobileWalletForm } from './MobileWalletForm';
import ConfirmBindBankCardModal from '../../../../modals/ConfirmBindBankCardModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../reduxStore';


export const PakistanBindBankAccountPage = (props: IUseBindBankAccountPage) => {
  // NOTE: 選擇支付方式
  const [chooseBindMethodValue, setChooseBindMethodValue] = useState<0 | 1>(1);
  const [walletDropList, setWalletDropList] = useState<{ value: string; label: string }[]>([]);
  const [bankDropList, setankDropList] = useState<{ value: string; label: string }[]>([]);

  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.model);

  const changeOptionValue = (value: 0 | 1) => {
    setChooseBindMethodValue(value);
  };

  useEffect(() => {
    props.triggerGetBindCardDropListQuery();
  }, []);

  useEffect(() => {
      const walletDropListData = props?.bindCardDropListData?.availableWalletVendors || [];
      const bankDropListData = props?.bindCardDropListData?.availableBanks || [];

      if (walletDropListData.length !== 0) {
          const walletList = walletDropListData.map(i => ({ value: i.code, label: i.displayName }))
          setWalletDropList(walletList)
      }

      if (bankDropListData.length !== 0) {
        const bankList = bankDropListData.map(i => ({ value: i.bankCode, label: i.bankName }))
        setankDropList(bankList)
    }
  }, [props.bindCardDropListData]);

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
          isFormPending={isFormPending || false}
          cardholderName={props.cardholderName}
        />
      ) : (
        <BankAccountForm
          isFormPending={isFormPending || false}
          cardholderName={props.cardholderName}
          bankDropList={bankDropList}
        />
      )}
      {modalState.bindBankcardModal.show && <ConfirmBindBankCardModal />}
    </>
  );
};
