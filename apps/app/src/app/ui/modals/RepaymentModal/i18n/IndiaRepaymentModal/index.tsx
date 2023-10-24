import { RiArrowRightSLine } from '@react-icons/all-files/ri/RiArrowRightSLine';
import cx from 'classnames';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import { Input, ListItem, Radio } from '@frontend/mobile/shared/ui';

import { environment } from '../../../../../../environments/environmentModule/environment';
import { getToken } from '../../../../../application/getToken';
import { getOrderNo } from '../../../../../externel/window/querystring/getOrderNo';
import { formatDate } from '../../../../../modules/format/formatDate';
import { PageOrModalPathEnum } from '../../../../PageOrModalPathEnum';
import Money from '../../../../components/Money';
// import useRepayCreate from "../../hooks/useRepayCreate";
// import useRepayTypes from "../../hooks/useRepayTypes";
import { Button } from '../../../../core-components/Button';
import { IRepaymentModalProps } from '../../index';
import AdSVG from '../../repayment_banner.svg';
import { i18nRepaymentModal } from '../translations';
import { useSelector } from 'react-redux';
import { RootState } from 'apps/app/src/app/reduxStore';
import { repaymentDetailPageInitialState } from 'apps/app/src/app/reduxStore/repaymentDetailPageSlice';
import { RadioOption } from '../../../../core-components/RadioOption';
import ValidateInput from '../../../../core-components/ValidateInput';
import { validateBalance } from '../validation';

const IndiaRepaymentModal = (props: IRepaymentModalProps & any) => {
  const {
    setRadioValue,
    balanceValue,
    setBalanceValue,
    handleRepayData,
    handleConfirm,
    isPostRepayCreateLoading,
  } = props;
  
  const { t } = useTranslation(i18nRepaymentModal.namespace);
  const navigate = useNavigate();
  const location = useLocation();
  
  const repaymentData = useSelector(
    (state: RootState) => state.repaymentDetailPage.repaymentData
  );

  const {
    balance,
    repayAmount,
    radio,
    payType,
    coupon,
    orderNo,
    repayTypeList,
  } = repaymentData;

  const payOptions = [
    { value: 'balance', label: t('Pay Full') },
    { value: 'custom', label: t('Pay Partial') },
  ];


  const handleRadioChange = (e: any) => {
    if (e === 'balance') {
      setBalanceValue({
        ...balanceValue,
        data: `${environment.currency} ${balance}`,
      });
    }
    setRadioValue(e);
  };
  
  return (
    <div className="text-ctext-primary p-4">
      <div className="font-sm px-1 mb-3">
        <div className="flex justify-between text-sm font-bold">
          <div>{t('Balance')}</div>
          <div>{balanceValue.data}</div>
        </div>
      </div>

      <div className="mb-1.5 font-sm">
        <RadioOption options={payOptions} onChange={handleRadioChange} />
      </div>
      <ValidateInput
        name={'Amount'}
        label={t('Amount') as string}
        labelType={'left'}
        placeholder="8,500"
        value={`${balanceValue.data}`}
        disabled={radio === 'balance'}
        inputData={balanceValue}
        setInputData={setBalanceValue}
        validateData={() =>
          balance !== undefined && validateBalance(balanceValue.data, balance)
        }
        inputLength={radio !== 'balance' ? 1 : balance?.length}
        errorMessage={t(balanceValue.errorMessage)}
      />
      {radio !== 'custom' && (
        <a
          className="mt-1 flex w-full items-center justify-center rounded-lg border border-solid border-[#aaaaaa] py-2.5 pl-5"
          onClick={() => {
            if (repayTypeList === undefined) return;
            navigate(
              `${PageOrModalPathEnum.RepaymentDetailPage}/repayment-coupon-modal?token=${getToken()}&orderNo=${getOrderNo()}`,
              {
                state: {
                  ...location.state,
                  paymentAmount: balance,
                },
              }
            );
          }}
        >
          <div
            className={cx('flex grow flex-nowrap justify-between text-base')}
          >
            <div className="self-center">{t('Coupon')}</div>
            {coupon!==null ? (
              <div className="my-[-4px] flex grow flex-col items-end justify-between">
                <div className="text-primary-main text-sm">
                  {<Money money={coupon?.discountAmount||''} isNagetive={true} />}
                </div>
                <div className="text-ctext-tertiary text-xs">
                  <div>
                    {`${t('expiration date')}: `}
                    {coupon?.expireTime
                      ? formatDate(moment(coupon?.expireTime))
                      : ''}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-cTextFields-placeholder-main">
                {t('Select')}
              </div>
            )}
          </div>
          <RiArrowRightSLine className="fill-ctext-primary mx-1 text-xl" />
        </a>
      )}
      <div className="mt-4 font-bold">
        <ListItem
          title={t('Repayment Amount') as string}
          text={<Money money={repayAmount || 0} />}
        />
      </div>
      <div className={`my-3 flex flex-row`}>
        <div className={`mr-1.5 w-full`}>
          <Button
            onClick={() => {
              navigate(`${PageOrModalPathEnum.RepaymentDetailPage}?token=${getToken()}&orderNo=${getOrderNo()}`,
                { 
                  state: { orderNo }, 
                  replace: true 
                }
              );
            }}
            text={t('Cancel')}
            type={'ghost'}
            ghostTheme={'tertiary'}
          />
        </div>
        <div className={` ml-1.5 w-full`}>
          <Button
            disable={isPostRepayCreateLoading}
            onClick={() => {
              if (repayTypeList === undefined) return;
              if (balanceValue.errorMessage === '') handleConfirm();
            }}
            text={t('Repay')}
          />
        </div>
      </div>

      <div className={`text-ctext-secondary text-left text-xs`}>
        <div>{t('Attention')}:</div>
        <ul className="list-outside list-decimal pl-3 pt-1">
          <li>{t('Before repayment, please make sure that you have enough balance on your bank account.')}</li>
          <li>
            {t('In order to protect your rights, we strongly recommend you take a screenshot and upload your UTR number after completing the repayment and return to the APP to upload your repayment receipt.')}
          </li>
        </ul>
      </div>

      <div className={`my-4`}>
        <img className={`w-full`} src={AdSVG} />
      </div>
    </div>
  );
};

export default IndiaRepaymentModal;
