import { IoMdRadioButtonOn } from '@react-icons/all-files/io/IoMdRadioButtonOn';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { environment } from '../../../../../../environments/environmentModule/environment';
import { InputValue } from '../../../../../modules/form/InputValue';
import { getOrderNo } from '../../../../../modules/querystring/getOrderNo';
import { getToken } from '../../../../../modules/querystring/getToken';
import { RootState } from '../../../../../reduxStore';
import { repaymentDetailPageInitialState } from '../../../../../reduxStore/repaymentDetailPageSlice';
import { RadioOption } from '../../../../components/RadioOption';
import Select from '../../../../components/Select';
import ValidateInput from '../../../../components/ValidateInput';
import { Button } from '../../../../components/layouts/Button';
import { PagePathEnum } from '../../../../pages/PagePathEnum';
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
  radioValue,
  balanceValue,
  setRadioValue,
  setBalanceValue,
  handleConfirm,
  handleRepayData,
}: IPhilippinesRepaymentModalProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(i18nRepaymentModal.namespace);
  const navigate = useNavigate();
  const repaymentData = useSelector(
    (state: RootState) => state.repaymentDetailPage.repaymentData
  );
  const { balance, orderNo, repayTypeList, payType } = repaymentData;
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
    <div className="px-4 text-left">
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
        <Button outlineTheme="round" text={t('Repay')} />
      </div>
    </div>
  );
};

export default PhilippinesRepaymentModal;
