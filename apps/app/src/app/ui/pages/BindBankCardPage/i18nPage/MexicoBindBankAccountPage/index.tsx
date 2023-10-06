import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';

import { useLocationOrderQueryString } from '@frontend/mobile/shared/ui';

import { useLazyGetMXBindCardDropListQuery } from '../../../../../externel/backend/rtk';
import { RootState } from '../../../../../reduxStore';
import ConfirmBindBankCardModal from '../../../../modals/ConfirmBindBankCardModal';
import { i18nBankBindAccountPage } from '../../translations';
import { IUseBindBankAccountPage } from '../types/IUseBindBankAccountPage';
import { BankAccountForm } from './BankAccountForm';

export const MexicoBindBankAccountPage = (props: IUseBindBankAccountPage) => {
  // NOTE: 選擇支付方式
  const [bankDropList, setankDropList] = useState<
    { value: string; label: string }[]
  >([]);

  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.model);
  const pageQueryString = useLocationOrderQueryString();

  const [
    triggerGetBindCardDropListQuery,
    {
      currentData: bindCardDropListData,
      isLoading: isBindCardDropListDataLoading,
      isFetching: isBindCardDropListDataFetching,
    },
  ] = useLazyGetMXBindCardDropListQuery({});
  useEffect(() => {
    triggerGetBindCardDropListQuery({});
  }, []);

  useEffect(() => {
    const bankDropListData = bindCardDropListData?.availableBanks || [];
    if (bankDropListData.length !== 0) {
      const bankList = bankDropListData.map((i) => ({
        value: i.bankCode,
        label: i.bankName,
      }));
      setankDropList(bankList);
    }
  }, [bindCardDropListData]);

  // NOTE : 暫時先用變數代替，之後修改
  const isFormPending = false;
  const cardholderName =
    pageQueryString.cardholderName || bindCardDropListData?.cardholderName;
  const { t } = useTranslation(i18nBankBindAccountPage.namespace);

  return (
    <div className="flex h-full grow flex-col overflow-auto">
      <Outlet />
      <div className="mb-4">
        <div className="text-ctext-primary text-sm font-bold">
          {t('Advice')}:
        </div>
        <ul className="text-ctext-secondary list-outside list-decimal pl-3 pt-1 text-xs">
          <li>{t('Only your debit card can be linked.')}</li>
          <li>{t('Can’t link credit card.')}</li>
          <li>
            {t(
              'To expedite your request, please make sure the name and phone number on the card match the information you provide'
            )}
          </li>
        </ul>
      </div>
      <BankAccountForm
        isFormPending={isFormPending || false}
        cardholderName={cardholderName || ''}
        bankDropList={bankDropList}
      />
      {modalState.bindBankcardModal.show && <ConfirmBindBankCardModal />}
    </div>
  );
};
