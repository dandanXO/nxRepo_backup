import { MexicoCountry } from 'libs/shared/domain/src/country/MexicoCountry';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { Overlay } from '@frontend/mobile/shared/ui';

import { IndiaCountry } from '../../../../../../../libs/shared/domain/src/country/IndiaCountry';
import { PakistanCountry } from '../../../../../../../libs/shared/domain/src/country/PakistanCountry';
import { PhilippinesCountry } from '../../../../../../../libs/shared/domain/src/country/PhilippinesCountry';
import { environment } from '../../../../environments/environmentModule/environment';
import { InputValue } from '../../../modules/form/InputValue';
import { renderByCountry } from '../../../modules/i18n';
import { getOrderNo } from '../../../modules/querystring/getOrderNo';
import { RootState } from '../../../reduxStore';
import {
  repaymentDetailPageInitialState,
  repaymentDetailPageInitialStateType,
  repaymentDetailPageSlice,
} from '../../../reduxStore/repaymentDetailPageSlice';
import Modal from '../../core-components/Modal';
import useRepayCreate from '../../hooks/useRepayCreate';
import useRepayTypes from '../../hooks/useRepayTypes';
import { RepaymentDetailPageUseCaseActions } from '../../pages/RepaymentDetailPage/userUsecaseSaga';
import IndiaRepaymentModal from './i18n/IndiaRepaymentModal';
import MexicoRepaymentModal from './i18n/MexicoRepaymentModal';
import PakistanRepaymentModal from './i18n/PakistanRepaymentModal';
import PhilippinesRepaymentModal from './i18n/PhilippinesRepaymentModal';
import { i18nRepaymentModal } from './i18n/translations';

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
  const { t } = useTranslation(i18nRepaymentModal.namespace);

  const { handlePostRepayCreate, isPostRepayCreateLoading } = useRepayCreate();

  const dispatch = useDispatch();
  const { repaymentData, repaymentDetail } = useSelector(
    (state: RootState) => state.repaymentDetailPage
  );

  const { balance = location.state.balance, orderNo = getOrderNo() } =
    repaymentDetail || {};
  const [radioValue, setRadioValue] = useState('balance');

  // NOTE: 變動數值
  const [balanceValue, setBalanceValue] = useState(
    `${environment.currency} ${balance}`
  );

  const [balanceData, setbalanceData] = useState<InputValue<string>>({
    data:
      environment.country === PhilippinesCountry.country
        ? `${balance}`
        : `${environment.currency} ${balance}`,
    isValidation: false,
    errorMessage: '',
    isEdit: false,
  });

  // NOTE: 付款方式
  const {
    triggerGetList,
    isRepayTypesFetching,
    repayTypesList,
    repayType,
    setRepayType,
  } = useRepayTypes();
  useEffect(() => {
    if (
      [MexicoCountry.country, PhilippinesCountry.country].includes(
        environment.country
      ) &&
      repaymentData.orderNo === ''
    ) {
      dispatch(RepaymentDetailPageUseCaseActions.user.repayData());
    } else {
      triggerGetList({ orderNo: orderNo });
    }
  }, []);

  useEffect(() => {
    const isCustom = radioValue !== 'balance';
    const coupon = repaymentData.coupon;
    const currentBalance =
      Number(balanceData.data.replace(`${environment.currency}`, '').trim()) ||
      0;

    const repayAmount = isCustom
      ? currentBalance
      : Number(balance) - Number(coupon ? coupon.discountAmount : 0);
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
    if (
      [MexicoCountry.country, PhilippinesCountry.country].includes(
        environment.country
      )
    ) {
      const {
        balance,
        repayAmount,
        radio,
        payType,
        coupon,
        orderNo,
        repayTypeList,
      } = repaymentData;
      if (
        balanceData.data === '' ||
        isPostRepayCreateLoading ||
        orderNo === ''
      ) {
        return;
      }

      if (payType && orderNo) {
        const couponNo =
          radio === 'balance' && coupon ? coupon?.couponNo || '' : '';
        handlePostRepayCreate(
          false,
          orderNo,
          Number(repayAmount) || 0,
          payType,
          couponNo
        );
      }
    } else {
      if (balanceValue === '' || isPostRepayCreateLoading) {
        return;
      }

      const payType = repayType && repayType.value;
      const coupon =
        radioValue === 'balance' && location.state.coupon
          ? location.state.coupon
          : null;
      const repaymentAmount =
        parseInt(balanceValue.replace(`${environment.currency}`, '').trim()) -
        Number(coupon?.discountAmount || 0);
      handlePostRepayCreate(
        false,
        orderNo,
        repaymentAmount,
        payType,
        coupon?.couponNo || null
      );
    }
  };

  return (
    <Modal
      outlineTheme={
        environment.country === MexicoCountry.country ? 'round' : undefined
      }
      className={'overflow-auto'}
      maskclassName={
        environment.country === PhilippinesCountry.country ? 'px-4' : undefined
      }
    >
      <>
        <div className="text-ctext-primary my-2 text-lg font-bold">
          {t('Repay')}
        </div>
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
                isPostRepayCreateLoading={isPostRepayCreateLoading}
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
                isPostRepayCreateLoading={isPostRepayCreateLoading}
                orderNo={orderNo}
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
            balance={balance}
            balanceValue={balanceValue}
            setBalanceValue={setBalanceValue}
            repayTypesList={repayTypesList}
            isRepayTypesFetching={isRepayTypesFetching}
            repayType={repayType}
            setRepayType={setRepayType}
            handleConfirm={handleConfirm}
            isPostRepayCreateLoading={isPostRepayCreateLoading}
            orderNo={orderNo}
          />
        )}
      </>
    </Modal>
  );
};

export default withTranslation(i18nRepaymentModal.namespace)(RepaymentModal);
