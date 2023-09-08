import { IoMdRadioButtonOn } from '@react-icons/all-files/io/IoMdRadioButtonOn';
import { RiArrowRightSLine } from '@react-icons/all-files/ri/RiArrowRightSLine';
import moment from 'moment/moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { environment } from '../../../../../../environments/environmentModule/environment';
import { InputValue } from '../../../../../modules/form/InputValue';
import { formatDate } from '../../../../../modules/format/formatDate';
import { getOrderNo } from '../../../../../modules/querystring/getOrderNo';
import { getToken } from '../../../../../modules/querystring/getToken';
import { RootState } from '../../../../../reduxStore';
import { repaymentDetailPageInitialState } from '../../../../../reduxStore/repaymentDetailPageSlice';
import ListItem from '../../../../components/ListItem';
import Money from '../../../../components/Money.tsx';
import { RadioOption } from '../../../../components/RadioOption';
import Select from '../../../../components/Select';
import ValidateInput from '../../../../components/ValidateInput';
import { Button } from '../../../../components/layouts/Button';
import { PagePathEnum } from '../../../../pages/PagePathEnum';
import AdSVG from '../../repayment_banner.svg';
import { i18nRepaymentModal } from '../translations';
import { validateBalance } from '../validation';

interface IPhilippinesRepaymentModalProps {
  radioValue: string;
  setRadioValue: React.Dispatch<React.SetStateAction<string>>;
  balanceValue: InputValue<string>;
  setBalanceValue: React.Dispatch<React.SetStateAction<InputValue<string>>>;
  handleConfirm: () => void;
  handleRepayData: (data: any) => void;
}

const PhilippinesRepaymentModal = ({
  balanceValue,
  setRadioValue,
  setBalanceValue,
  handleConfirm,
  handleRepayData,
}: IPhilippinesRepaymentModalProps) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation(i18nRepaymentModal.namespace);
  const navigate = useNavigate();
  const repaymentData = useSelector(
    (state: RootState) => state.repaymentDetailPage.repaymentData
  );
  const {
    coupon,
    repayAmount,
    balance,
    orderNo,
    repayTypeList,
    payType,
    radio,
  } = repaymentData;

  const payOptions = [
    { value: 'balance', label: t('Repay Full Amount') },
    { value: 'custom', label: t('Partial Repayment') },
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

  const Label = ({ text }: { text: string }) => (
    <div className="mb-1 text-xs font-medium">{text}</div>
  );

  return (
    <div className="mb-5 px-4 text-left">
      <div className="mt-1 text-sm">
        <RadioOption
          options={payOptions}
          onChange={handleRadioChange}
          radioOnTheme="fill-cstate-info-main"
          radioOffTheme="fill-cstate-disable-main"
          onRadio={<IoMdRadioButtonOn />}
        />
      </div>
      <div className="mt-3">
        <Label text={t('Payment Amount')} />
        <ValidateInput
          inputData={balanceValue}
          setInputData={setBalanceValue}
          validateData={() =>
            balance !== undefined &&
            validateBalance(balanceValue.data, balance, false)
          }
          value={balanceValue.data}
          containerStyle={{
            backgroundColor: window.theme?.textFiled?.background?.main,
            borderRadius: '6px',
            padding: '12px 16px',
            fontSize: '14px',
          }}
          placeholder="Amount"
          disabled={radio === 'balance'}
          inputLength={radio !== 'balance' ? 1 : balance?.length}
          errorMessage={t(balanceValue.errorMessage || '')}
        />
      </div>
      <div className="mt-2">
        <Label text={t('Payment Method')} />
        <Select
          className="bg-cTextFields-background-main rounded-md text-sm focus:outline-0"
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: 'transparent',
              border: 0,
              boxShadow: 'none',
              padding: '6px 8px',
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              boxShadow: 'none',
              margin: 0,
            }),
            indicatorSeparator: (baseStyles) => ({
              ...baseStyles,
              display: 'none',
            }),
            placeholder: (baseStyles) => ({
              ...baseStyles,
              color: window.theme?.input?.placeholder,
            }),
            dropdownIndicator: (baseStyles) => ({
              ...baseStyles,
              color: window.theme?.text?.primary,
            }),
            option: (baseStyles, { isSelected }) => ({
              ...baseStyles,
              backgroundColor: isSelected ? '#F5F5F5' : '',
              color: 'black',
            }),
            menuList: (baseStyles) => ({
              ...baseStyles,
              margin: 0,
              padding: 0,
            }),
          }}
          placeholder="Select"
          options={repayTypeList || []}
          value={
            repayTypeList === undefined
              ? undefined
              : repayTypeList.find((option: any) => option.value === payType)
          }
          onChange={(item) =>
            handleRepayData({ ...repaymentData, payType: item?.value })
          }
        />
      </div>

      {radio !== 'custom' && (
        <div className="mt-3">
          <Label text={t('coupon')} />
          <div
            className="bg-cTextFields-background-main flex items-center justify-between rounded-md py-3 px-4 text-sm font-medium"
            onClick={() => {
              if (repayTypeList === undefined) return;
              navigate(
                `${
                  PagePathEnum.RepaymentDetailPage
                }/repayment-coupon-modal?token=${getToken()}&orderNo=${getOrderNo()}`,
                {
                  state: {
                    ...location.state,
                    paymentAmount: balance,
                  },
                }
              );
            }}
          >
            {coupon ? (
              <div className="text-primary-main">
                - {environment.currency} {coupon.discountAmount}
              </div>
            ) : (
              <div className="text-cTextFields-placeholder-main">
                {t('Select')}
              </div>
            )}
            <div className="flex items-center gap-2">
              {coupon && (
                <div className="text-ctext-tertiary text-right text-xs leading-[14px]">
                  <div>{t('expiration date')}</div>
                  <div>
                    {coupon.expireTime
                      ? formatDate(moment(coupon.expireTime))
                      : ''}
                  </div>
                </div>
              )}
              <RiArrowRightSLine className="fill-ctext-primary text-2xl" />
            </div>
          </div>
        </div>
      )}

      <div className="mt-3 font-bold">
        <ListItem
          title={t('Repayment Amount')}
          text={<Money money={repayAmount || 0} />}
        />
      </div>

      <div className="mt-4 flex gap-2">
        <Button
          outlineTheme="round"
          type="ghost"
          ghostTheme="disable"
          text={t('Cancel')}
          onClick={() => {
            handleRepayData({
              ...repaymentDetailPageInitialState.repaymentData,
            });
            navigate(
              `${
                PagePathEnum.RepaymentDetailPage
              }?token=${getToken()}&orderNo=${getOrderNo()}`,
              { state: { orderNo } }
            );
          }}
        />
        <Button
          outlineTheme="round"
          text={t('Repay')}
          onClick={() => {
            if (repayTypeList === undefined) return;
            if (balanceValue.errorMessage === '') handleConfirm();
          }}
        />
      </div>
      <div className="text-ctext-tertiary mt-3 text-xs font-medium">
        <div>{t('attention')}</div>
        <ul className="list-outside list-decimal pl-4">
          <li>{t('attention1')}</li>
          <li>{t('attention2')}</li>
        </ul>
      </div>
      <div className={`mt-4`}>
        <img alt="ad" className={`w-full`} src={AdSVG} />
      </div>
    </div>
  );
};

export default PhilippinesRepaymentModal;
