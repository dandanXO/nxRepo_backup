import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdSVG from '../../repayment_banner.svg';
import { useLocation, useNavigate } from 'react-router';
import {
  Horizontal,
  Input,
  InputValue,
  ListItem,
  Overlay,
  Radio,
} from '@frontend/mobile/shared/ui';
import Select from 'react-select';
import { withTranslation } from 'react-i18next';
import { i18nRepaymentModal } from '../translations';
import { environment } from '../../../../../../environments/environment';
// import useRepayCreate from "../../hooks/useRepayCreate";
// import useRepayTypes from "../../hooks/useRepayTypes";
import { Button } from '../../../../components/layouts/Button';
import { IRepaymentModalProps } from '../../index';
import { formatPrice } from '../../../../../modules/format/formatPrice';
import { PagePathEnum } from '../../../../pages/PagePathEnum';
import { getToken } from '../../../../../modules/querystring/getToken';
import { RiArrowRightSLine } from '@react-icons/all-files/ri/RiArrowRightSLine';
import cx from 'classnames';
import moment from 'moment';
import Money from '../../../../components/Money.tsx';

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
  } = props;
  const navigate = useNavigate();

  // const [bankcardNoData, setBankcardNoData] = useState<InputValue<string>>({
  //   data: "",
  //   isValidation: false,
  //   errorMessage: "",
  // });
  const [balanceValueErrorMessage, setBalanceValueErrorMessage] = useState('');
  const location = useLocation()
  const { coupon } = location.state;
  return (
    <div className='px-2 text-ctext-primary'>
      <div className='px-1 font-2xl'>
        <div className="flex justify-between text-sm font-bold">
          <div>Balance</div>
          <div>{<Money money={balance}/>}</div>
        </div>
      </div>

      <div className='mb-1.5'>
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
          <Radio value="balance">{props.t('Pay Full')}</Radio>
          <Radio value="custom">{props.t('Pay Partial')}</Radio>
        </Radio.Group>
      </div>

      <Input
        disabled={radioValue === 'balance'}
        label={props.t('Amount') as string}
        labelType="left"
        value={`${balanceValue}`}
        onChange={(event: any) => {
          let value = event.target.value;
          value = value.replace(`${environment.currency} `, '').trim();

          if (value === '' || Number(value) === 0) {
            setBalanceValueErrorMessage(
              'This field cannot be left blank or 0.'
            );
          } else if (!new RegExp('^[0-9]*$').test(value)) {
            setBalanceValueErrorMessage('Numbers only. Please try again.');
          } else if (Number(value) > Number(balance)) {
            // NOTE: 限制數字最大值
            setBalanceValueErrorMessage(
              'Amount cannot be greater than the repayment balance.'
            );
          } else {
            setBalanceValueErrorMessage('');
          }

          if (!value.includes(environment.currency)) {
            setBalanceValue(`${environment.currency} ${value}`);
          } 
        }}
        onBlur={() => {}}
        errorMessage={
          balanceValueErrorMessage === '' ? '' : balanceValueErrorMessage
        }
      />
      {radioValue !== 'custom' && (
          <a
            className="flex w-full border-solid border border-[#aaaaaa] justify-center items-center pl-5 py-2.5 rounded-lg mt-1"
            onClick={() => {
              if (isRepayTypesFetching) return;

              navigate(`${PagePathEnum.RepaymentDetailPage}/repayment-coupon-modal?token=${getToken()}`,
                {
                  state: {
                    ...location.state,
                    paymentAmount: balance,
                    paymentMethod: repayType.value,
                  },
                }
              );
            }}
          >
            <div className={cx('grow text-base flex-nowrap flex justify-between')}>
            <div className='self-center'>Coupon</div>
              {coupon ? (
                <div className="flex flex-col justify-between grow items-end my-[-4px]">
                  <div className="text-sm text-primary-main">{<Money money={coupon.discountAmount} isNagetive={true}/>}</div>
                  <div className="text-xs text-ctext-tertiary">
                    <div>expiration date: {coupon.expireTime
                        ? moment(coupon.expireTime).format('DD-MM-YYYY')
                        : ''}</div>
                  </div>
                </div>
              ) : (
                    <div className='text-cTextFields-placeholder-main'>Select</div>
              )}
              
            </div>
            <RiArrowRightSLine className="text-xl fill-ctext-primary mx-1" />
          </a>

      )}
       <div className="mt-3 font-bold">
          <ListItem
              title={'Repayment Amount'}
              text={radioValue !== 'custom' ?
                  <Money money={Number(balance) - Number(coupon ? coupon.discountAmount : 0)} /> :
                  <Money money={balanceValue.replace(`${environment.currency}`, '').trim()} />
              }
           />
      </div>
      <div className={`flex flex-row my-3`}>
        <div className={`mr-1.5 w-full`}>
          <Button
            onClick={() => {
              if (isRepayTypesFetching) return;
              navigate(
                `${PagePathEnum.RepaymentDetailPage}?token=${getToken()}`,
                { state: { orderNo } }
              );
            }}
            text={props.t('Cancel')}
            type={'ghost'}
          />
        </div>
        <div className={` ml-1.5 w-full`}>
          <Button
            onClick={() => {
              if (isRepayTypesFetching) return;
              if (balanceValueErrorMessage === '') handleConfirm();
            }}
            text={props.t('Repay')}
            className={`border-[1.5px] border-solid border-primary-main bg-primary-main text-white`}
          />
        </div>
      </div>

      <div className={`text-xs text-gray-400 text-left`}>
        <div>Attention：</div>
        <ul className="list-decimal list-outside pl-3 pt-1">
          <li>
            Before repayment, please make sure that you have enough balance on
            your bank account.
          </li>
          <li>
            In order to protect your rights, we strongly recommend you take a
            screenshot and upload your UTR number after completing the repayment
            and return to the APP to upload your repayment receipt.
          </li>
        </ul>
      </div>

      <div className={`my-4`}>
        <img className={`w-full`} src={AdSVG} />
      </div>
    </div>
  );
};

export default withTranslation(i18nRepaymentModal.namespace)(
  IndiaRepaymentModal
);
