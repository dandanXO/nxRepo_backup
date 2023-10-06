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
import ValidateInput from '../../../../core-components/ValidateInput';
import { InputValue } from '../../../../core-components/form/InputValue';
import { selectStyles } from '../../../../core-components/selectStyles';
import { i18nBankBindAccountPage } from '../../translations';
import { IPakistanBankAccountForm } from '../types/IBankAccountForm';
import { validateBankcardNo } from './validation';

export const BankAccountForm = (props: IPakistanBankAccountForm) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bankValue, setBankValue] = useState({ value: '', label: '' });
  const [isBankSelected, setIsBankSelected] = useState(true);
  const { t } = useTranslation(i18nBankBindAccountPage.namespace);

  const [bankAccountData, setBankAccountData] = useState<InputValue<string>>({
    data: '',
    isValidation: false,
    errorMessage: '',
    isEdit: false,
  });

  const [confirmBankAccountData, setconfirmBankAccountData] = useState<
    InputValue<string>
  >({
    data: '',
    isValidation: false,
    errorMessage: '',
    isEdit: false,
  });

  useEffect(() => {
    if (
      confirmBankAccountData.isEdit ||
      confirmBankAccountData.data.length >= 9
    ) {
      const isConfirmMobileDataError =
        bankAccountData.data === confirmBankAccountData.data;
      setconfirmBankAccountData({
        ...confirmBankAccountData,
        isValidation: isConfirmMobileDataError,
        errorMessage: isConfirmMobileDataError
          ? ''
          : ('Please make sure your account number match.' as string),
      });
    }
  }, [bankAccountData.data, confirmBankAccountData.data]);

  const confirmBindCard = () => {
    if (
      bankValue.value === '' ||
      !bankAccountData.isValidation ||
      !confirmBankAccountData.isValidation
    ) {
      setIsBankSelected(bankValue.value === '' ? false : true);
      if (bankAccountData.data === '') {
        setBankAccountData(validateBankcardNo(bankAccountData.data));
      }
      if (confirmBankAccountData.data === '') {
        setconfirmBankAccountData(
          validateBankcardNo(confirmBankAccountData.data)
        );
      }
    } else {
      dispatch(
        modalSlice.actions.updatebindBankcardModal({
          ...modalInitialState.bindBankcardModal,
          show: true,
          confirm: false,
          paymentMethod: 1,
          cardholderName: props.cardholderName,
          bankCode: bankValue?.value !== '' && bankValue?.value,
          bankName: bankValue?.label,
          bankAccNr: bankAccountData.data,
          mobileWallet: false,
          mobileWalletAccount: '',
          walletVendor: '',
          walletName: '',
        } as any)
      );
    }
  };

  return (
    <div className="flex grow flex-col">
      <div>
        <div className={'text-sm'}>{t('Cardholder Name')}</div>
        <Input
          className="mb-2"
          labelType={'none'}
          outlineType={'standard'}
          placeholder={t('Cardholder Name') as string}
          value={props.cardholderName}
          disabled
        />
      </div>
      <div>
        <div className={'text-sm'}>{t('Bank Name')}</div>
        <Select
          styles={selectStyles}
          className="mb-2"
          value={bankValue.value === '' ? undefined : bankValue}
          onChange={(item: any) => {
            setBankValue(item);
          }}
          options={props.bankDropList}
          isSearchable={true}
          placeholder={t('Select')}
        />
        {!isBankSelected && bankValue.value === '' && (
          <div className="text-cstate-error-main ml-5">
            {t('Please select an option')}
          </div>
        )}
      </div>
      <div>
        <div className={'text-sm'}>{t('Account Number')}</div>
        <ValidateInput
          name={'account'}
          className="mb-2"
          labelType={'none'}
          outlineType={'standard'}
          placeholder={t('Account Number') as string}
          value={bankAccountData.data}
          errorMessage={t(bankAccountData.errorMessage as string)}
          inputData={bankAccountData}
          setInputData={setBankAccountData}
          validateData={() => validateBankcardNo(bankAccountData.data)}
          inputLength={9}
        />
      </div>

      <div>
        <div className={'text-sm'}>{t('Confirm Account Number')}</div>
        <ValidateInput
          name={'account_confirm'}
          className="mb-2"
          labelType={'none'}
          outlineType={'standard'}
          placeholder={t('Confirm Account Number') as string}
          value={confirmBankAccountData.data}
          errorMessage={t(confirmBankAccountData.errorMessage as string)}
          inputData={confirmBankAccountData}
          setInputData={setconfirmBankAccountData}
          validateData={() => validateBankcardNo(confirmBankAccountData.data)}
          inputLength={9}
        />
      </div>
      <div className="pb-4">
        <Button
          text={t('Confirm')}
          primaryTypeGradient={true}
          onClick={confirmBindCard}
        />
      </div>
    </div>
  );
};

{
  /*<div>*/
}
{
  /*  <div className={'text-sm'}>{'Your IBAN Number (24 characters)'}</div>*/
}
{
  /*  <Input*/
}
{
  /*    name={'iban'}*/
}
{
  /*    labelType={'none'}*/
}
{
  /*    outlineType={'standard'}*/
}
{
  /*    placeholder={'Ex. PK36FTBK0000111123456702'}*/
}
{
  /*    value={props.iBanData.data}*/
}
{
  /*    onChange={props.onIBanChange}*/
}
{
  /*    onBlur={props.onIbanBlur}*/
}
{
  /*    errorMessage={props.iBanData.errorMessage}*/
}
{
  /*    onCopy={(e) => preventCopyPaste(e)}*/
}
{
  /*    onCut={(e) => preventCopyPaste(e)}*/
}
{
  /*  />*/
}
{
  /*  <div*/
}
{
  /*    className="text-cstate-info-main mb-2 whitespace-nowrap text-xs leading-none underline"*/
}
{
  /*    onClick={() => navigate('iban-finder-modal', { state: 'Bank' })}*/
}
{
  /*  >*/
}
{
  /*    {'Click me to learn where can I find my IBAN number?'}*/
}
{
  /*  </div>*/
}
{
  /*</div>*/
}
