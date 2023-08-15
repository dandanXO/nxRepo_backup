import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import { IUseBindBankAccountPage } from '../types/IUseBindBankAccountPage';
import { BankAccountForm } from './BankAccountForm';
import ConfirmBindBankCardModal from '../../../../modals/ConfirmBindBankCardModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../reduxStore';


export const MexicoBindBankAccountPage = (props: IUseBindBankAccountPage) => {
  // NOTE: 選擇支付方式
  const [bankDropList, setankDropList] = useState<{ value: string; label: string }[]>([]);

  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.model);

  useEffect(() => {
    props.triggerGetBindCardDropListQuery();
  }, []);

  useEffect(() => {
      const bankDropListData = props?.bindCardDropListData?.availableBanks || [];
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
      <div className='mb-4'>
        <div className='text-ctext-primary font-bold text-sm'>Advice:</div>
        <ul className="list-outside list-decimal pl-3 pt-1 text-xs text-ctext-secondary">
            <li>Only your debit card can be linked.</li>
            <li>Can’t link credit card.</li>
            <li>To expedite your request, please make sure the name and phone number on the card match the information you provide</li>
        </ul>
      </div>
      <BankAccountForm
          isFormPending={isFormPending || false}
          cardholderName={props.cardholderName}
          bankDropList={bankDropList}
        />
      {modalState.bindBankcardModal.show && <ConfirmBindBankCardModal state={modalState.bindBankcardModal}/>}
    </>
  );
};
