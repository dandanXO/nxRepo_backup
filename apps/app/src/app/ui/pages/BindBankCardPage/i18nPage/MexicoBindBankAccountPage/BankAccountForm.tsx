import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Select from 'react-select';

import { Input } from '@frontend/mobile/shared/ui';

import {
  modalInitialState,
  modalSlice,
} from '../../../../../reduxStore/modalSlice';
import { Button } from '../../../../core-components/Button';
import { RadioOption } from '../../../../core-components/RadioOption';
import ValidateInput from '../../../../core-components/ValidateInput';
import { InputValue } from '../../../../core-components/form/InputValue';
import { i18nBankBindAccountPage } from '../../translations';
import { IPakistanBankAccountForm } from '../types/IBankAccountForm';
import { validateMXBankcardNo } from './validation';

export const BankAccountForm = (props: IPakistanBankAccountForm) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation(i18nBankBindAccountPage.namespace);

  const [cardType, setCardType] = useState('DEBIT_CARD');
  const [bankValue, setBankValue] = useState({ value: '', label: '' });
  const [isBankSelected, setIsBankSelected] = useState(true);
  const bankAccountLength = cardType === 'DEBIT_CARD' ? 16 : 18;
  const bankDropList = cardType === 'DEBIT_CARD' ? props.bankDropList.filter((i: any) => i.value !== "STP") : props.bankDropList;
 
  const initInputData = {
    data: '',
    isValidation: false,
    errorMessage: '',
    isEdit: false,
  };
  const [bankAccountData, setBankAccountData] = useState<InputValue<string>>(initInputData);
  const [confirmBankAccountData, setconfirmBankAccountData] = useState<InputValue<string>>(initInputData);

  const validateBankAndConfrimAccountSame = () => {
    const isBankAndConfrimAccountSame = bankAccountData.data === confirmBankAccountData.data;
    return {
      ...confirmBankAccountData,
      isValidation: isBankAndConfrimAccountSame,
      errorMessage: isBankAndConfrimAccountSame
        ? ''
        : ('Please make sure your account number match.' as string),
    };
  };
  useEffect(() => {
    if (
      confirmBankAccountData.isEdit ||
      confirmBankAccountData.data.length >= bankAccountLength
    ) {
      setconfirmBankAccountData(validateBankAndConfrimAccountSame());
    }
  }, [bankAccountData.data, confirmBankAccountData.data]);

  const payOptions = [
    { value: 'DEBIT_CARD', label: t('Debit Card') },
    { value: 'CLABE', label: t('CLABE') },
  ];

  const handleChangeCardType = (e: any) => {
    setCardType(e);
  };

  const validateBindCard = () => {
    const isBankValueValid = bankValue.value === '' ? false : true;
    const isBankAccountValid = validateMXBankcardNo(
      bankAccountData.data,
      bankAccountLength
    );
    const isConfirmBankAccountValid = validateMXBankcardNo(
      confirmBankAccountData.data,
      bankAccountLength
    );
    const isBankAndConfrimAccountSame = bankAccountData.data === confirmBankAccountData.data;
    setIsBankSelected(isBankValueValid);
    setBankAccountData(isBankAccountValid);
    setconfirmBankAccountData(
      isBankAndConfrimAccountSame
        ? isConfirmBankAccountValid
        : validateBankAndConfrimAccountSame()
    );
    return (
      isBankValueValid &&
      isBankAccountValid.isValidation &&
      isConfirmBankAccountValid.isValidation &&
      isBankAndConfrimAccountSame
    );
  };

  const confirmBindCard = () => {
    if (validateBindCard()) {
      dispatch(
        modalSlice.actions.updatebindBankcardModal({
          ...modalInitialState.bindBankcardModal,
          show: true,
          confirm: false,
          cardTypeName: payOptions.find((i) => i.value === cardType)?.label,
          cardType: cardType,
          cardholderName: props.cardholderName,
          bankCode: bankValue?.value !== '' && bankValue?.value,
          bankName: bankValue?.label,
          bankAccNr: bankAccountData.data,
        } as any)
      );
    }
  };

  const bankListLabel = (color = '#000') => ({
    ':before': {
      borderRadius: 10,
      content: `"${t('Name of the bank')}"`,
      display: 'block',
      color: color,
      top: 0,
    },
  });

  return (
    <div className="flex grow flex-col">
      <div className="grow">
        <div className="mb-2 flex flex-wrap">
          <div className="text-ctext-primary grow font-bold">
            {t('Payment Method')}
          </div>
          <RadioOption options={payOptions} onChange={handleChangeCardType} />
        </div>
        <div className="mb-2">
          <Input
            labelType={'topFix'}
            label={t('Cardholder Name') as string}
            outlineType={'outlined'}
            placeholder={t('Cardholder Name') as string}
            value={props.cardholderName}
            disabled
          />
        </div>
        <div className="mb-2">
          <Select
            styles={{
              control: (baseStyles: any, state: any) => ({
                ...baseStyles,
                paddingLeft: '12px',
                borderRadius: '9px',
                // border: `1px solid ${window.theme?.input?.outline ?? '#aaaaaa'}`,
              }),
              valueContainer: (style: any, state: any) => ({
                ...style,
                alignItems: 'end',
              }),
              //@ts-ignore
              indicatorSeparator: (provided) => ({
                ...provided,
                display: 'none',
              }),
              input: (styles) => ({ ...styles, bottom: 0 }),
              placeholder: (styles) => ({ ...styles, ...bankListLabel() }),
              singleValue: (styles, { data }) => ({
                ...styles,
                ...bankListLabel(),
              }),
            }}
            value={bankValue.value === '' ? undefined : bankValue}
            onChange={(item: any) => {
              setBankValue(item);
            }}
            options={bankDropList}
            isSearchable={true}
            placeholder={'Select'}
          />
          <div className="text-cstate-error-main my-1 ml-5">
            {!isBankSelected &&
              bankValue.value === '' &&
              t('Please select an option.')}
          </div>
        </div>
        <div className="mb-2">
          <ValidateInput
            name={'Bank account number'}
            labelType={'topFix'}
            label={t('Bank account number') as string}
            outlineType={'outlined'}
            placeholder={
              cardType === 'DEBIT_CARD'
                ? '1234 5678 1112 2222'
                : '123 456 7890123456 78'
            }
            value={bankAccountData.data}
            errorMessage={t(bankAccountData.errorMessage as string, {
              inputLength: bankAccountLength,
            })}
            inputData={bankAccountData}
            setInputData={setBankAccountData}
            validateData={() =>
              validateMXBankcardNo(bankAccountData.data, bankAccountLength)
            }
            inputLength={bankAccountLength}
            onCopy={() => {
              //
            }}
          />
        </div>

        <div className="mb-2">
          <ValidateInput
            name={'account_confirm'}
            labelType={'topFix'}
            label={t('Confirm Bank account number') as string}
            outlineType={'outlined'}
            placeholder={
              cardType === 'DEBIT_CARD'
                ? '1234 5678 1112 2222'
                : '123 456 7890123456 78'
            }
            value={confirmBankAccountData.data}
            errorMessage={t(confirmBankAccountData.errorMessage as string, {
              inputLength: bankAccountLength,
            })}
            inputData={confirmBankAccountData}
            setInputData={setconfirmBankAccountData}
            validateData={() =>
              validateMXBankcardNo(
                confirmBankAccountData.data,
                bankAccountLength
              )
            }
            inputLength={bankAccountLength}
            onCopy={() => {
              //
            }}
          />
        </div>
      </div>
      <div>
        <Button
          outlineTheme={'round'}
          text={t('Confirm')}
          onClick={confirmBindCard}
        />
      </div>
    </div>
  );
};
