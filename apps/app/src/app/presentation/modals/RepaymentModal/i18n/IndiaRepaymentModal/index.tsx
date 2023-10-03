import { RiArrowRightSLine } from '@react-icons/all-files/ri/RiArrowRightSLine';
import cx from 'classnames';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { Horizontal, Input, InputValue, ListItem, Overlay, Radio } from '@frontend/mobile/shared/ui';

import { environment } from '../../../../../../environments/environmentModule/environment';
import { formatPrice } from '../../../../../modules/format/formatPrice';
import { getToken } from '../../../../../modules/querystring/getToken';
import Money from '../../../../components/Money';
// import useRepayCreate from "../../hooks/useRepayCreate";
// import useRepayTypes from "../../hooks/useRepayTypes";
import { Button } from '../../../../components/layouts/Button';
import { PagePathEnum } from '../../../../pages/PagePathEnum';
import { IRepaymentModalProps } from '../../index';
import AdSVG from '../../repayment_banner.svg';
import { i18nRepaymentModal } from '../translations';
import {formatDate} from "../../../../../modules/format/formatDate";
import { getOrderNo } from 'apps/app/src/app/modules/querystring/getOrderNo';

const IndiaRepaymentModal = (props: IRepaymentModalProps & any) => {
  const {
    radioValue,
    setRadioValue,
    balance,
    balanceValue,
    setBalanceValue,
    repayTypesList,
    isRepayTypesFetching,
    repayType,
    setRepayType,
    handleConfirm,
    orderNo,
    isPostRepayCreateLoading
  } = props;
  const navigate = useNavigate();

  // const [bankcardNoData, setBankcardNoData] = useState<InputValue<string>>({
  //   data: "",
  //   isValidation: false,
  //   errorMessage: "",
  // });
  const [balanceValueErrorMessage, setBalanceValueErrorMessage] = useState('');
  const location = useLocation();
  const { coupon } = location.state;
  const { t } = useTranslation(i18nRepaymentModal.namespace);

  return (
    <div className="text-ctext-primary p-4">
      <div className="font-2xl px-1">
        <div className="flex justify-between text-sm font-bold">
          <div>{t('Balance')}</div>
          <div>{<Money money={balance} />}</div>
        </div>
      </div>

      <div className="mb-1.5">
        <Radio.Group
          value={radioValue}
          onCheck={(value: any) => {
            setRadioValue(value);
            // console.log("balance");
            // console.log(balance);
            if (value === 'balance') {
              setBalanceValue(`${environment.currency} ${balance}`);
              setBalanceValueErrorMessage('');
            }
          }}
        >
          <Radio value="balance">{t('Pay Full')}</Radio>
          <Radio value="custom">{t('Pay Partial')}</Radio>
        </Radio.Group>
      </div>

      <Input
        disabled={radioValue === 'balance'}
        label={t('Amount') as string}
        labelType="left"
        value={`${balanceValue}`}
        onChange={(event: any) => {
          let value = event.target.value;
          value = value.replace(`${environment.currency} `, '').trim();

          if (value === '' || Number(value) === 0) {
            setBalanceValueErrorMessage(t('This field cannot be left blank or 0.') as string);
          } else if (!new RegExp('^[0-9]*$').test(value)) {
            setBalanceValueErrorMessage(t('Numbers only. Please try again.') as string);
          } else if (Number(value) > Number(balance)) {
            // NOTE: 限制數字最大值
            setBalanceValueErrorMessage(t('Amount cannot be greater than the repayment balance.') as string);
          } else {
            setBalanceValueErrorMessage('');
          }

          if (!value.includes(environment.currency)) {
            setBalanceValue(`${environment.currency} ${value}`);
          }
        }}
        onBlur={() => {}}
        errorMessage={balanceValueErrorMessage === '' ? '' : balanceValueErrorMessage}
      />
      {radioValue !== 'custom' && (
        <a
          className="mt-1 flex w-full items-center justify-center rounded-lg border border-solid border-[#aaaaaa] py-2.5 pl-5"
          onClick={() => {
            if (isRepayTypesFetching) return;
            navigate(`${PagePathEnum.RepaymentDetailPage}/repayment-coupon-modal?token=${getToken()}&orderNo=${getOrderNo()}`, {
              state: {
                ...location.state,
                paymentAmount: balance,
              },
            });
          }}
        >
          <div className={cx('flex grow flex-nowrap justify-between text-base')}>
            <div className="self-center">{t('Coupon')}</div>
            {coupon ? (
              <div className="my-[-4px] flex grow flex-col items-end justify-between">
                <div className="text-primary-main text-sm">
                  {<Money money={coupon.discountAmount} isNagetive={true} />}
                </div>
                <div className="text-ctext-tertiary text-xs">
                  <div>{`${t('expiration date')}: `}{coupon.expireTime ? formatDate(moment(coupon.expireTime)) : ''}</div>
                </div>
              </div>
            ) : (
              <div className="text-cTextFields-placeholder-main">{t('Select')}</div>
            )}
          </div>
          <RiArrowRightSLine className="fill-ctext-primary mx-1 text-xl" />
        </a>
      )}
      <div className="mt-4 font-bold">
        <ListItem
          title={t('Repayment Amount') as string}
          text={
            radioValue !== 'custom' ? (
              <Money money={Number(balance) - Number(coupon ? coupon.discountAmount : 0)} />
            ) : (
              <Money money={balanceValue.replace(`${environment.currency}`, '').trim()} />
            )
          }
        />
      </div>
      <div className={`my-3 flex flex-row`}>
        <div className={`mr-1.5 w-full`}>
          <Button
            onClick={() => {
              navigate(`${PagePathEnum.RepaymentDetailPage}?token=${getToken()}&orderNo=${getOrderNo()}`, { state: { orderNo } });
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
              if (isRepayTypesFetching) return;
              if (balanceValueErrorMessage === '') handleConfirm();
            }}
            text={t('Repay')}
            // className={`border-primary-main bg-primary-main border-[1.5px] border-solid text-white`}
          />
        </div>
      </div>

      <div className={`text-left text-xs text-ctext-secondary`}>
        <div>{t('Attention')}:</div>
        <ul className="list-outside list-decimal pl-3 pt-1">
          <li>{t('Before repayment, please make sure that you have enough balance on your bank account.')}</li>
          <li>{t('In order to protect your rights, we strongly recommend you take a screenshot and upload your UTR number after completing the repayment and return to the APP to upload your repayment receipt.')}</li>
        </ul>
      </div>

      <div className={`my-4`}>
        <img className={`w-full`} src={AdSVG} />
      </div>
    </div>
  );
};

export default IndiaRepaymentModal;
