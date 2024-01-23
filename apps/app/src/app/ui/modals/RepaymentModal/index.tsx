import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import {
  IndiaCountry,
  MexicoCountry,
  PakistanCountry,
  PhilippinesCountry,
} from '@frontend/shared/domain';

import { environment } from '../../../../environments/environmentModule/environment';
import { getOrderNo } from '../../../externel/window/querystring/getOrderNo';
import { renderByCountry } from '../../../modules/i18n';
import { RootState } from '../../../reduxStore';
import { repaymentDetailPageSlice } from '../../../reduxStore/repaymentDetailPageSlice';
import Modal from '../../core-components/Modal';
import { InputValue } from '../../core-components/form/InputValue';
import useRepayCreate from '../../hooks/useRepayCreate';
import useRepayTypes from '../../hooks/useRepayTypes';
import { RepaymentDetailPageUseCaseActions } from '../../pages/RepaymentDetailPage/userUsecaseSaga';
import IndiaRepaymentModal from './i18n/IndiaRepaymentModal';
import MexicoRepaymentModal from './i18n/MexicoRepaymentModal';
import PakistanRepaymentModal from './i18n/PakistanRepaymentModal/PakistanRepaymentDefModal/index'
import PakistanRepaymentDemoModal from './i18n/PakistanRepaymentModal/PakistanRepaymentDemoModal/index'
import PhilippinesRepaymentModal from './i18n/PhilippinesRepaymentModal';
import { i18nRepaymentModal } from './i18n/translations';
import { formatDate } from '../../../modules/format/formatDate';
import moment from 'moment';

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
  const location = useLocation();
  const { t } = useTranslation(i18nRepaymentModal.namespace);

  const { handlePostRepayCreate, isPostRepayCreateLoading } = useRepayCreate();

  const dispatch = useDispatch();
  const { repaymentData, repaymentDetail } = useSelector((state: RootState) => state.repaymentDetailPage);
  const { balance = location.state.balance, orderNo = getOrderNo(),applyDate,status } = repaymentDetail || {};
  const [radioValue, setRadioValue] = useState('balance');

  // NOTE: 變動數值
  const [balanceData, setbalanceData] = useState<InputValue<string>>({
    data:
      environment.country === PhilippinesCountry.country
        ? `${balance}`
        : `${environment.currency} ${balance}`,
    isValidation: false,
    errorMessage: '',
    isEdit: false,
  });

  useEffect(() => {
    dispatch(RepaymentDetailPageUseCaseActions.user.repayData());
  }, []);

  useEffect(() => {
    const isCustom = radioValue !== 'balance';
    const coupon = repaymentData.coupon;
    const currentBalance = Number(balanceData.data.replace(`${environment.currency}`, '').trim()) || 0;
    const repayAmount = isCustom ? currentBalance : Number(balance) - Number(coupon ? coupon.discountAmount : 0);
    handleRepayData({
      ...repaymentData,
      coupon,
      radio: radioValue,
      repayAmount,
    });
  }, [radioValue, repaymentData.coupon, balanceData.data]);

  const handleRepayData = useCallback((data: any) => {
    dispatch(repaymentDetailPageSlice.actions.updateRepaymentData({ ...data }));
  }, []);

  const handleConfirm = () => {

      const {
        // balance,
        repayAmount,
        radio,
        payType,
        coupon,
        orderNo,
        // repayTypeList,
      } = repaymentData;
      if ( balanceData.data === '' || isPostRepayCreateLoading || orderNo === '') {
        return;
      }

      if (payType && orderNo) {
        const couponNo = radio === 'balance' && coupon ? coupon?.couponNo || '' : '';
        handlePostRepayCreate(
          false,
          orderNo,
          Number(repayAmount) || 0,
          payType,
          couponNo
        );
      }
  };
  // const isTodayRepayment=true;
  const isTodayRepayment=formatDate(moment(applyDate))===formatDate(moment())&&
  status==='UNPAID';
  return (
    <Modal
      outlineTheme={ environment.country === MexicoCountry.country ? 'round' : undefined}
      className={'overflow-auto'}
      maskclassName={environment.country === PhilippinesCountry.country ? 'px-4' : undefined}
    >
      <>
        <div className="text-ctext-primary my-2 text-lg font-bold">
          {t('Repay')}
        </div>
        {renderByCountry(
          {
            [IndiaCountry.country]:
            isTodayRepayment? (
              <PakistanRepaymentDemoModal
                radioValue={radioValue}
                setRadioValue={setRadioValue}
                balanceValue={balanceData}
                setBalanceValue={setbalanceData}
                handleConfirm={handleConfirm}
                handleRepayData={handleRepayData}
                isPostRepayCreateLoading={isPostRepayCreateLoading}
              />):
              (<PakistanRepaymentModal
                radioValue={radioValue}
                setRadioValue={setRadioValue}
                balanceValue={balanceData}
                setBalanceValue={setbalanceData}
                handleConfirm={handleConfirm}
                handleRepayData={handleRepayData}
                isPostRepayCreateLoading={isPostRepayCreateLoading}
              />
              // <IndiaRepaymentModal
              //   radioValue={radioValue}
              //   setRadioValue={setRadioValue}
              //   balanceValue={balanceData}
              //   setBalanceValue={setbalanceData}
              //   handleConfirm={handleConfirm}
              //   handleRepayData={handleRepayData}
              //   isPostRepayCreateLoading={isPostRepayCreateLoading}
              // />

            ),
            [PakistanCountry.country]:isTodayRepayment? (
              <PakistanRepaymentDemoModal
                radioValue={radioValue}
                setRadioValue={setRadioValue}
                balanceValue={balanceData}
                setBalanceValue={setbalanceData}
                handleConfirm={handleConfirm}
                handleRepayData={handleRepayData}
                isPostRepayCreateLoading={isPostRepayCreateLoading}
              />):
              (<PakistanRepaymentModal
                radioValue={radioValue}
                setRadioValue={setRadioValue}
                balanceValue={balanceData}
                setBalanceValue={setbalanceData}
                handleConfirm={handleConfirm}
                handleRepayData={handleRepayData}
                isPostRepayCreateLoading={isPostRepayCreateLoading}
              />
            ),
            [MexicoCountry.country]: (
              <MexicoRepaymentModal
                radioValue={radioValue}
                setRadioValue={setRadioValue}
                balanceValue={balanceData}
                setBalanceValue={setbalanceData}
                handleConfirm={handleConfirm}
                handleRepayData={handleRepayData}
                isPostRepayCreateLoading={isPostRepayCreateLoading}
              />
            ),
            [PhilippinesCountry.country]: (
              <PhilippinesRepaymentModal
                radioValue={radioValue}
                setRadioValue={setRadioValue}
                balanceValue={balanceData}
                setBalanceValue={setbalanceData}
                handleConfirm={handleConfirm}
                handleRepayData={handleRepayData}
              />
            ),
          },
          <IndiaRepaymentModal
            radioValue={radioValue}
            setRadioValue={setRadioValue}
            balanceValue={balanceData}
            setBalanceValue={setbalanceData}
            handleConfirm={handleConfirm}
            handleRepayData={handleRepayData}
            isPostRepayCreateLoading={isPostRepayCreateLoading}
          />
        )}
      </>
    </Modal>
  );
};

export default withTranslation(i18nRepaymentModal.namespace)(RepaymentModal);
