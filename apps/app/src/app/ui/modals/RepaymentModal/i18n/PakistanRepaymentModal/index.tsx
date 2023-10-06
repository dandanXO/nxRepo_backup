import { RiArrowRightSLine } from '@react-icons/all-files/ri/RiArrowRightSLine';
import cx from 'classnames';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import { Input, Radio } from '@frontend/mobile/shared/ui';

import { environment } from '../../../../../../environments/environmentModule/environment';
import { getToken } from '../../../../../application/getToken';
import { formatDate } from '../../../../../modules/format/formatDate';
import { PageOrModalPathEnum } from '../../../../PageOrModalPathEnum';
import Money from '../../../../components/Money';
// import useRepayCreate from "../../hooks/useRepayCreate";
// import useRepayTypes from "../../hooks/useRepayTypes";
import { Button } from '../../../../core-components/Button';
import ListItem from '../../../../core-components/ListItem';
import Select from '../../../../core-components/Select';
import { selectStyles } from '../../../../core-components/selectStyles';
import { IRepaymentModalProps } from '../../index';
import AdSVG from '../../repayment_banner.svg';
import { i18nRepaymentModal } from '../translations';

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
    isPostRepayCreateLoading,
  } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation(i18nRepaymentModal.namespace);

  const { coupon } = location.state;

  const [balanceValueErrorMessage, setBalanceValueErrorMessage] = useState('');

  return (
    <div className="text-ctext-primary px-4 text-left">
      <div className="mt-1 ml-[-4px] whitespace-nowrap text-xs">
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
          <Radio value="balance">{t('Repay Full Amount')}</Radio>
          <Radio value="custom">{t('Partial Repayment')}</Radio>
        </Radio.Group>
      </div>

      <div>
        <div className="mt-3 text-xs">{t('Payment Amount (PKR)')}</div>
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
              setBalanceValueErrorMessage(
                t('This field cannot be left blank or 0.') as string
              );
            } else if (!new RegExp('^[0-9]*$').test(value)) {
              setBalanceValueErrorMessage(
                t('Numbers only. Please try again.') as string
              );
            } else if (Number(value) > Number(balance)) {
              // NOTE: 限制數字最大值
              setBalanceValueErrorMessage(
                t(
                  'Amount cannot be greater than the repayment balance.'
                ) as string
              );
            } else {
              setBalanceValueErrorMessage('');
            }
            setBalanceValue(`${environment.currency} ${value}`);
          }}
          onBlur={() => {}}
          errorMessage={
            balanceValueErrorMessage === '' ? '' : balanceValueErrorMessage
          }
        />
      </div>

      <div>
        <div className="mt-1.5 text-xs">{t('Payment Method')}</div>
        <Select
          styles={selectStyles}
          options={repayTypesList || []}
          value={repayType}
          onChange={(item) => {
            setRepayType(item as paymentMethodValueType);
          }}
        />
      </div>

      {radioValue !== 'custom' && (
        <>
          <div className="mt-2.5 text-xs">{t('Coupon (PKR)')}</div>
          <div
            className="flex items-center justify-center border-b border-solid border-[#aaaaaa] py-1.5 pl-5 pr-4"
            onClick={() => {
              if (isRepayTypesFetching) return;
              navigate(
                `${
                  PageOrModalPathEnum.RepaymentDetailPage
                }/repayment-coupon-modal?token=${getToken()}`,
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
              className={cx('flex grow flex-nowrap justify-between text-base', {
                'text-primary-main': coupon !== undefined && coupon !== null,
              })}
            >
              {coupon ? (
                <div className="flex grow justify-between">
                  <div className="self-center">- {coupon.discountAmount}</div>
                  <div className="text-ctext-secondary flex flex-col text-xs">
                    <div>{t('expiration date')}</div>
                    <div className="">
                      {coupon.expireTime
                        ? formatDate(moment(coupon.expireTime))
                        : ''}
                    </div>
                  </div>
                </div>
              ) : (
                <div>{t('Select')}</div>
              )}
              <RiArrowRightSLine className="fill-[#CCCCCC] text-2xl" />
            </div>
          </div>
        </>
      )}

      <div className="mt-3 font-bold">
        <ListItem
          title={t('Repayment Amount')}
          text={
            radioValue !== 'custom' ? (
              <Money
                money={
                  Number(balance) - Number(coupon ? coupon.discountAmount : 0)
                }
              />
            ) : (
              <Money
                money={
                  isNaN(
                    balanceValue.replace(`${environment.currency}`, '').trim()
                  )
                    ? 0
                    : balanceValue.replace(`${environment.currency}`, '').trim()
                }
              />
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
            text={t('Cancel')}
            onClick={() => {
              if (isRepayTypesFetching) return;
              navigate(
                `${
                  PageOrModalPathEnum.RepaymentDetailPage
                }?token=${getToken()}`,
                { state: { orderNo } }
              );
            }}
          />
        </div>
        <div className={` ml-1.5 w-full`}>
          <Button
            className={`w-full`}
            text={t('Repay')}
            primaryTypeGradient={true}
            disable={isPostRepayCreateLoading}
            onClick={() => {
              if (isRepayTypesFetching) return;
              if (balanceValueErrorMessage === '') handleConfirm();
            }}
          />
        </div>
      </div>
      <div
        className={`text-ctext-secondary text-left text-xs font-bold leading-none`}
      >
        <div>{t('Attention')}:</div>
        <ul className="list-outside list-decimal pl-3 pt-1">
          <li>
            {t(
              'Before repayment, please make sure that you have enough balance on your bank account.'
            )}
          </li>
          <li>
            {t(
              'To protect your rights, we strongly recommend that you take a screenshot of the repayment details after completing the repayment, and upload your screenshot to the app.'
            )}
          </li>
        </ul>
      </div>
      <div className={`my-4`}>
        <img className={`w-full`} src={AdSVG} />
      </div>
    </div>
  );
};

export default PakistanRepaymentModal;
