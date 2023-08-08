import { RiArrowRightSLine } from '@react-icons/all-files/ri/RiArrowRightSLine';
import cx from 'classnames';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import Select, { StylesConfig } from 'react-select';

import { Horizontal, Input, Overlay, Radio } from '@frontend/mobile/shared/ui';

import { environment } from '../../../../../../environments/environment';
import { getToken } from '../../../../../modules/querystring/getToken';
import ListItem from '../../../../components/ListItem';
import Money from '../../../../components/Money.tsx';
// import useRepayCreate from "../../hooks/useRepayCreate";
// import useRepayTypes from "../../hooks/useRepayTypes";
import { Button } from '../../../../components/layouts/Button';
import { selectStyles } from '../../../../components/layouts/selectStyles';
import { PagePathEnum } from '../../../../pages/PagePathEnum';
import { IRepaymentModalProps } from '../../index';
import AdSVG from '../../repayment_banner.svg';
import { i18nRepaymentModal } from '../translations';
import {formatDate} from "../../../../../modules/format/formatDate";

type paymentMethodValueType = {
  type: string;
  label: string;
};

const PakistanRepaymentModal = (props: IRepaymentModalProps & any) => {
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
  const location = useLocation();
  const { coupon } = location.state;

  const [balanceValueErrorMessage, setBalanceValueErrorMessage] = useState('');

  return (
    <div className="px-4 text-left text-ctext-primary">
      <div className="mt-3 ml-[-4px] whitespace-nowrap text-xs">
        <Radio.Group
          value={radioValue}
          onCheck={(value: any) => {
            setRadioValue(value);
            if (value === 'balance') {
              setBalanceValue(`${environment.currency} ${balance}`);
              setBalanceValueErrorMessage('');
            }
          }}
        >
          <Radio value="balance">{props.t('Repay Full Amount')}</Radio>
          <Radio value="custom">{props.t('Partial Repayment')}</Radio>
        </Radio.Group>
      </div>

      <div>
        <div className="mt-3 text-xs">{'Payment Amount (PKR)'}</div>
        <Input
          name={'amount'}
          labelType="none"
          outlineType="standard"
          value={balanceValue}
          disabled={radioValue === 'balance'}
          onChange={(event: any) => {
            let value = event.target.value;
            // value = value.replace(`${environment.currency}`, '').trim();
            value = value.replace(`P`, '').trim();
            value = value.replace(`K`, '').trim();
            value = value.replace(`R`, '').trim();
            
            if (value === '' || Number(value) === 0) {
              setBalanceValueErrorMessage('This field cannot be left blank or 0.');
            } else if (!new RegExp('^[0-9]*$').test(value)) {
              setBalanceValueErrorMessage('Numbers only. Please try again.');
            } else if (Number(value) > Number(balance)) {
              // NOTE: 限制數字最大值
              setBalanceValueErrorMessage('Amount cannot be greater than the repayment balance.');
            } else {
              setBalanceValueErrorMessage('');
            }
            setBalanceValue(`${environment.currency} ${value}`);
          }}
          onBlur={() => {}}
          errorMessage={balanceValueErrorMessage === '' ? '' : balanceValueErrorMessage}
        />
      </div>

      <div>
        <div className="mt-1.5 text-xs">{'Payment Method'}</div>
        <Select
          styles={selectStyles}
          options={repayTypesList || []}
          value={repayType}
          onChange={(item) => {
            setRepayType(item as paymentMethodValueType);
          }}
          isSearchable={false}
        />
      </div>

      {radioValue !== 'custom' && (
        <>
          <div className="mt-2.5 text-xs">{'Coupon (PKR)'}</div>
          <div
            className="flex items-center justify-center border-b border-solid border-[#aaaaaa] py-1.5 pl-5 pr-4"
            onClick={() => {
              if (isRepayTypesFetching) return;
              navigate(`${PagePathEnum.RepaymentDetailPage}/repayment-coupon-modal?token=${getToken()}`, {
                state: {
                  ...location.state,
                  paymentAmount: balance,
                  paymentMethod: repayType.value,
                },
              });
            }}
          >
            <div
              className={cx('flex grow flex-nowrap justify-between text-base', {
                'text-primary-main': coupon !== undefined && coupon !== null,
              })}
            >
              {coupon ? (
                <div className="flex grow justify-between">
                  <div className="self-center">- {coupon.discountAmount}</div>
                  <div className="flex flex-col text-xs text-ctext-secondary">
                    <div>expiration date</div>
                    <div className="">{coupon.expireTime ? formatDate(moment(coupon.expireTime)) : ''}</div>
                  </div>
                </div>
              ) : (
                <div>Select</div>
              )}
              <RiArrowRightSLine className="fill-[#CCCCCC] text-2xl" />
            </div>
          </div>
        </>
      )}

      <div className="mt-3 font-bold">
        <ListItem
          title={'Repayment Amount'}
          text={
            radioValue !== 'custom' ? (
              <Money money={Number(balance) - Number(coupon ? coupon.discountAmount : 0)} />
            ) : (
              <Money money={
                isNaN(balanceValue.replace(`${environment.currency}`, '').trim()) 
                ? 0 
                : balanceValue.replace(`${environment.currency}`, '').trim()
            } />
            )
          }
        />
      </div>

      <div className={`my-3 flex flex-row`}>
        <div className={`mr-1.5 w-full `}>
          <Button
            type={'ghost'}
            ghostTheme={'tertiary'}
            className={`w-full`}
            text={props.t('Cancel')}
            onClick={() => {
              if (isRepayTypesFetching) return;
              navigate(`${PagePathEnum.RepaymentDetailPage}?token=${getToken()}`, { state: { orderNo } });
            }}
          />
        </div>
        <div className={` ml-1.5 w-full`}>
          <Button
            className={`w-full`}
            text={props.t('Repay')}
            primaryTypeGradient={true}
            disable={isPostRepayCreateLoading}
            onClick={() => {
              if (isRepayTypesFetching) return;
              if (balanceValueErrorMessage === '') handleConfirm();
            }}
          />
        </div>
      </div>
      <div className={`text-left text-xs text-ctext-secondary font-bold leading-none`}>
        <div>Attention：</div>
        <ul className="list-outside list-decimal pl-3 pt-1">
          <li>Before repayment, please make sure that you have enough balance on your bank account.</li>
          <li>
            To protect your rights, we strongly recommend that you take a screenshot of the repayment details after
            completing the repayment, and upload your screenshot to the app.
          </li>
        </ul>
      </div>
      <div className={`my-4`}>
        <img className={`w-full`} src={AdSVG} />
      </div>
    </div>
  );
};

export default withTranslation(i18nRepaymentModal.namespace)(PakistanRepaymentModal);
