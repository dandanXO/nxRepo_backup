import { RiArrowRightSLine } from '@react-icons/all-files/ri/RiArrowRightSLine';
import cx from 'classnames';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import { Input, Radio } from '@frontend/mobile/shared/ui';

import { environment } from '../../../../../../../environments/environmentModule/environment';
import { getToken } from '../../../../../../application/getToken';
import { formatDate } from '../../../../../../modules/format/formatDate';
import { PageOrModalPathEnum } from '../../../../../PageOrModalPathEnum';
import Money from '../../../../../components/Money';
// import useRepayCreate from "../../hooks/useRepayCreate";
// import useRepayTypes from "../../hooks/useRepayTypes";
import { Button } from '../../../../../core-components/Button';
import ListItem from '../../../../../core-components/ListItem';
import Select from '../../../../../core-components/Select';
import { selectStyles } from '../../../../../core-components/selectStyles';
import { IRepaymentModalProps } from '../../../index';
import AdSVG from '../../../repayment_banner.svg';
import { i18nRepaymentModal } from '../../translations';
import { RootState } from 'apps/app/src/app/reduxStore';
import { useSelector } from 'react-redux';
import { RadioOption } from '../../../../../core-components/RadioOption';
import ValidateInput from '../../../../../core-components/ValidateInput';
import { validateBalance } from '../../validation';
import { getOrderNo } from 'apps/app/src/app/externel/window/querystring/getOrderNo';
import info_circle from  "./info_circle.svg"
import styled from 'styled-components';
import { Tooltip as ReactTooltip } from "react-tooltip";

const PakistanRepaymentModal = (props: IRepaymentModalProps & any) => {
  const [showCoolTooltip,setShowCoolTooltip]=useState(true);
  const {
    setRadioValue,
    balanceValue,
    setBalanceValue,
    handleRepayData,
    handleConfirm,
    isPostRepayCreateLoading,
  } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation(i18nRepaymentModal.namespace);

  const payOptions = [
    { value: 'cooling', label: t('Cooling off Period') },
  ];
  const repaymentData = useSelector((state: RootState) => state.repaymentDetailPage.repaymentData);
  const {
    balance,
    repayAmount,
    radio,
    payType,
    coupon,
    orderNo,
    repayTypeList,
    repaymentAmountForDemo,
  } = repaymentData;

  const handleRadioChange = (e: any) => {
    if (e === 'balance') {
      setBalanceValue({
        ...balanceValue,
        data: `${environment.currency} ${repaymentAmountForDemo}`,
      });
    }
    setRadioValue(e);
  };

  return (
    <div className="text-ctext-primary px-4 text-left relative">
      <div className="mt-1 mb-2 text-sm flex flex-row" data-tooltip-id='cool-tooltip'>
        <RadioOption options={payOptions} onChange={handleRadioChange} />
        <img src={info_circle} alt="info" className='cursor-pointer'/>
      </div>
      <ReactTooltip
        id='cool-tooltip'
        place='bottom'
        className='z-50 w-[90%] absolute'
        style={{width:'90%'}}
        >
          <div className="text-xs font-bold">What should I know about Cooling off Period?</div>
            <ul className='list-outside list-decimal pl-3 pt-1 text-xs'>
              <li>To ensure you have sufficient time for careful consideration, we provide you with the option of a cooling-off period.</li>
              <li>The cooling-off period can only be utilized within 24 hours after borrowing.</li>
              <li>Repayments made during the cooling-off period will be subject to an additional third-party service fee, which will be included in the total repayment amount.</li>
              <li>If you decide to repay during the cooling-off period, you must repay the entire loan amount, and partial payments are not allowed.</li>
              <li>We encourage you to take the time to carefully consider your borrowing decision within the cooling-off period to ensure it aligns with your needs.</li>
            </ul>
      </ReactTooltip>
      <div>
        <div className="mt-3 text-xs">{t('Payment Amount (PKR)')}</div>
        <ValidateInput
          name={'Amount'}
          labelType="none"
          outlineType="standard"
          placeholder="8,500"
          value = {`${environment.currency} ${repaymentAmountForDemo}`}
          disabled={radio === 'balance'}
          inputData={balanceValue}
          setInputData={setBalanceValue}
          validateData={() =>
            balance !== undefined && validateBalance(balanceValue.data, balance)
          }
          inputLength={radio !== 'balance' ? 1 : balance?.length}
          errorMessage={t(balanceValue.errorMessage)}
        />
      </div>

      <div>
        <div className="mt-1.5 text-xs">{t('Payment Method')}</div>
        <Select
          styles={selectStyles}
          options={repayTypeList || []}
          value={
            repayTypeList === undefined
              ? undefined
              : repayTypeList.find((option: any) => option.value === payType)
          }
          onChange={(item: any) => {
            handleRepayData({ ...repaymentData, payType: item.value });
          }}
        />
      </div>

      {/*{radio !== 'custom' && (*/}
      {/*  <>*/}
      {/*    <div className="mt-2.5 text-xs">{t('Coupon (PKR)')}</div>*/}
      {/*    <div*/}
      {/*      className="flex items-center justify-center border-b border-solid border-[#aaaaaa] py-1.5 pl-5 pr-4"*/}
      {/*      onClick={() => {*/}
      {/*        if (repayTypeList === undefined) return;*/}
      {/*        navigate(`${PageOrModalPathEnum.RepaymentDetailPage}/repayment-coupon-modal?token=${getToken()}&orderNo=${getOrderNo()}`,*/}
      {/*        {*/}
      {/*          state: {*/}
      {/*            ...location.state,*/}
      {/*            paymentAmount: balance,*/}
      {/*          },*/}
      {/*        }*/}
      {/*      );*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <div*/}
      {/*        className={cx('flex grow flex-nowrap justify-between text-base', {*/}
      {/*          'text-primary-main': coupon !== undefined && coupon !== null,*/}
      {/*        })}*/}
      {/*      >*/}
      {/*        {coupon ? (*/}
      {/*          <div className="flex grow justify-between">*/}
      {/*            <div className="self-center">- {coupon.discountAmount}</div>*/}
      {/*            <div className="text-ctext-secondary flex flex-col text-xs">*/}
      {/*              <div>{t('expiration date')}</div>*/}
      {/*              <div className="">*/}
      {/*                {coupon.expireTime*/}
      {/*                  ? formatDate(moment(coupon.expireTime))*/}
      {/*                  : ''}*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        ) : (*/}
      {/*          <div>{t('Select')}</div>*/}
      {/*        )}*/}
      {/*        <RiArrowRightSLine className="fill-[#CCCCCC] text-2xl" />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </>*/}
      {/*)}*/}

      <div className="mt-3 font-bold">
        <ListItem
          title={t('Repayment Amount')}
          text={<Money money={Number(repaymentAmountForDemo || 0)} />}
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
              if (repayTypeList === undefined) return;
              navigate(`${PageOrModalPathEnum.RepaymentDetailPage}?token=${getToken()}&orderNo=${getOrderNo()}`, { state: { orderNo }, replace: true });
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
              if (repayTypeList === undefined) return;
              if (balanceValue.errorMessage === '') handleConfirm();
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
            {t('Before repayment, please make sure that you have enough balance on your bank account.')}
          </li>
          <li>
            {t('To protect your rights, we strongly recommend that you take a screenshot of the repayment details after completing the repayment, and upload your screenshot to the app.')}
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
