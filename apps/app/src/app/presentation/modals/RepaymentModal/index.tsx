import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Overlay } from '@frontend/mobile/shared/ui';
import { withTranslation } from 'react-i18next';
import { i18nRepaymentModal } from './i18n/translations';
import useRepayCreate from '../../hooks/useRepayCreate';
import useRepayTypes from '../../hooks/useRepayTypes';
import { renderByCountry } from '../../../modules/i18n';
import { IndiaCountry } from '../../../../../../../libs/shared/domain/src/country/IndiaCountry';
import { PakistanCountry } from '../../../../../../../libs/shared/domain/src/country/PakistanCountry';
import IndiaRepaymentModal from './i18n/IndiaRepaymentModal';
import PakistanRepaymentModal from './i18n/PakistanRepaymentModal';
import { environment } from '../../../../environments/environment';

type paymentMethodValueType = {
  type: string;
  label: string;
};

export interface IRepaymentModalProps {
  radioValue: string;
  setRadioValue: React.Dispatch<React.SetStateAction<string>>;
  balance: string;
  balanceValue: string;
  setBalanceValue: React.Dispatch<React.SetStateAction<string>>;
  repayTypesList: string[];
  isRepayTypesFetching: boolean;
  repayType: paymentMethodValueType;
  setRepayType: React.Dispatch<React.SetStateAction<paymentMethodValueType>>;
  handleConfirm: () => void;
  orderNo: string;
}

const RepaymentModal = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handlePostRepayCreate } = useRepayCreate();
  // console.log("location.state", location.state);

  const { balance = '', orderNo = '' } = location.state;

  const [radioValue, setRadioValue] = useState('balance');

  // NOTE: 變動數值
  const [balanceValue, setBalanceValue] = useState(`${environment.currency} ${balance}`);

  // NOTE: 付款方式
  const { triggerGetList, isRepayTypesFetching, repayTypesList, repayType, setRepayType } = useRepayTypes();

  useEffect(() => {
    triggerGetList({ orderNo: orderNo });
  }, []);

  const handleConfirm = () => {
    // console.log("balanceValue");
    // console.log(typeof balanceValue);
    // console.log(balanceValue.trim() === "");
    if (balanceValue === '') {
      return;
    }
    // self
    /* props.setShowRepaymentModal(false);
        // other
        props.setShowRepaymentAdsModal(true); */
    const payType = repayType && repayType.value;
    const coupon = radioValue === 'balance' && location.state.coupon ? location.state.coupon : null;
    const repaymentAmount =
      parseInt(balanceValue.replace(`${environment.currency}`, '').trim()) - Number(coupon?.discountAmount || 0);
    handlePostRepayCreate(false, orderNo, repaymentAmount, payType, coupon?.couponNo || null);
  };

  return (
    <Overlay
      show={true}
      content={() => {
        return (
          <>
            <div className="text-lg font-bold text-black">{props.t('Repay')}</div>
            {renderByCountry(
              {
                [IndiaCountry.country]: (
                  <IndiaRepaymentModal
                    radioValue={radioValue}
                    setRadioValue={setRadioValue}
                    // NOTICE:
                    balance={balance}
                    balanceValue={balanceValue}
                    setBalanceValue={setBalanceValue}
                    isRepayTypesFetching={isRepayTypesFetching}
                    repayTypesList={repayTypesList}
                    repayType={repayType}
                    setRepayType={setRepayType}
                    handleConfirm={handleConfirm}
                    orderNo={orderNo}
                  />
                ),
                [PakistanCountry.country]: (
                  <PakistanRepaymentModal
                    radioValue={radioValue}
                    setRadioValue={setRadioValue}
                    balance={balance}
                    balanceValue={balanceValue}
                    setBalanceValue={setBalanceValue}
                    repayTypesList={repayTypesList}
                    isRepayTypesFetching={isRepayTypesFetching}
                    repayType={repayType}
                    setRepayType={setRepayType}
                    handleConfirm={handleConfirm}
                    orderNo={orderNo}
                  />
                ),
              },
              <IndiaRepaymentModal
                radioValue={radioValue}
                setRadioValue={setRadioValue}
                balance={balance}
                balanceValue={balanceValue}
                setBalanceValue={setBalanceValue}
                repayTypesList={repayTypesList}
                isRepayTypesFetching={isRepayTypesFetching}
                repayType={repayType}
                setRepayType={setRepayType}
                handleConfirm={handleConfirm}
                orderNo={orderNo}
              />
            )}
          </>
        );
      }}
    />
  );
};

export default withTranslation(i18nRepaymentModal.namespace)(RepaymentModal);
