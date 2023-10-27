import { IoMdRadioButtonOn } from '@react-icons/all-files/io/IoMdRadioButtonOn';
import { RiArrowRightSLine } from '@react-icons/all-files/ri/RiArrowRightSLine';
import moment from 'moment/moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { StylesConfig } from 'react-select';

import { environment } from '../../../../../../environments/environmentModule/environment';
import { getToken } from '../../../../../application/getToken';
import { getOrderNo } from '../../../../../externel/window/querystring/getOrderNo';
import { formatDate } from '../../../../../modules/format/formatDate';
import { RootState } from '../../../../../reduxStore';
import { repaymentDetailPageInitialState } from '../../../../../reduxStore/repaymentDetailPageSlice';
import { PageOrModalPathEnum } from '../../../../PageOrModalPathEnum';
import Money from '../../../../components/Money';
import { Button } from '../../../../core-components/Button';
import ListItem from '../../../../core-components/ListItem';
import { RadioOption } from '../../../../core-components/RadioOption';
import Select from '../../../../core-components/Select';
import ValidateInput from '../../../../core-components/ValidateInput';
import { InputValue } from '../../../../core-components/form/InputValue';
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

const selectStyleConfig: StylesConfig = {
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
    ':hover': {
      backgroundColor: window.theme?.textFiled?.background?.main,
    },
  }),
  menuList: (baseStyles) => ({
    ...baseStyles,
    margin: 0,
    padding: 0,
    boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.2)',
  }),
};

const PhilippinesRepaymentModal = ({
  balanceValue,
  setRadioValue,
  setBalanceValue,
  handleConfirm,
  handleRepayData,
}: IPhilippinesRepaymentModalProps) => {
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
    payType,
    radio,
    payTypeNote,
    payTypeNoteList,
    onlineRepayTypeList,
    offlineRepayTypeList,
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

  const repayTypeSubOption =
    payTypeNote?.value === 'Online Payment'
      ? onlineRepayTypeList
      : payTypeNote?.value === 'Pay over the counter'
      ? offlineRepayTypeList
      : [];

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
            validateBalance(balanceValue.data, balance, false, false)
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
          styles={selectStyleConfig}
          placeholder="Select"
          options={payTypeNoteList}
          value={payTypeNote}
          onChange={(item: any) => {
            let initialOption: any = [];
            if (item.value === 'Online Payment') {
              initialOption = onlineRepayTypeList || [];
            }
            if (item.value === 'Pay over the counter') {
              initialOption = offlineRepayTypeList || [];
            }
            if (initialOption) {
              handleRepayData({
                ...repaymentData,
                payTypeNote: item,
                payType: initialOption[0]?.value,
              });
            }
          }}
        />
      </div>

      {payTypeNote && (
        <div className="mt-2">
          <Label text={payTypeNote.label || 'Loading'} />
          <Select
            className="bg-cTextFields-background-main rounded-md text-sm focus:outline-0"
            styles={selectStyleConfig}
            placeholder="Select"
            options={repayTypeSubOption}
            value={repayTypeSubOption?.find(
              (option: any) => option.value === payType
            )}
            onChange={(item: any) =>
              handleRepayData({ ...repaymentData, payType: item?.value })
            }
          />
        </div>
      )}

      {radio !== 'custom' && (
        <div className="mt-3">
          <Label text={t('coupon')} />
          <div
            className="bg-cTextFields-background-main flex items-center justify-between rounded-md py-3 px-4 text-sm font-medium"
            onClick={() => {
              if (payType === '') return;
              navigate(
                `${
                  PageOrModalPathEnum.RepaymentDetailPage
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
                PageOrModalPathEnum.RepaymentDetailPage
              }?token=${getToken()}&orderNo=${getOrderNo()}`,
              { state: { orderNo }, replace: true }
            );
          }}
        />
        <Button
          outlineTheme="round"
          text={t('Repay')}
          onClick={() => {
            if (payType === '') return;
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
