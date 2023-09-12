import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Select from 'react-select';

import { InputValue } from '../../../../../modules/form/InputValue';
import {
  modalInitialState,
  modalSlice,
} from '../../../../../reduxStore/modalSlice';
import ValidateInput from '../../../../components/ValidateInput';
import { Button } from '../../../../components/layouts/Button';
import { i18nBankBindAccountPage } from '../../translations';
import { validationPHMobileNumber } from './validation';

interface IAddEWalletFormProps {
  walletVendorOption: { value: string; label: string }[];
  cardholderName?: string;
}

const AddEWalletForm = ({
  walletVendorOption,
  cardholderName,
}: IAddEWalletFormProps) => {
  const dispatch = useDispatch();

  const [selectedWallet, setSelectedWallet] = useState('');
  const [isWalletSelected, setIsWalletSelected] = useState(true);
  const [holderName, setHolderName] = useState<InputValue<string>>({
    data: cardholderName || '',
    isValidation: false,
    errorMessage: '',
    isEdit: false,
  });
  const [mobileNumber, setMobileNumber] = useState<InputValue<string>>({
    data: '',
    isValidation: false,
    errorMessage: '',
    isEdit: false,
  });
  const [confirmMobileNumber, setConfirmMobileNumber] = useState<
    InputValue<string>
  >({
    data: '',
    isValidation: false,
    errorMessage: '',
    isEdit: false,
  });

  const { t } = useTranslation(i18nBankBindAccountPage.namespace);

  const compareMobileNumber = () => {
    const same = mobileNumber.data === confirmMobileNumber.data;
    return {
      ...confirmMobileNumber,
      isValidation: same,
      errorMessage: same ? '' : 'Please make sure your mobile number match.',
    };
  };

  const confirmValidation = () => {
    const isWalletValid = !(selectedWallet === '');
    const isHolderNameValid = !(holderName.data === '');
    const isMobileNumberValid = validationPHMobileNumber(mobileNumber.data);
    const isConfirmMobileNumberValid = validationPHMobileNumber(
      confirmMobileNumber.data
    );
    const isCompareMobileNumberValid =
      mobileNumber.data === confirmMobileNumber.data;
    setIsWalletSelected(isWalletValid);
    setHolderName({
      ...holderName,
      isValidation: isHolderNameValid,
      errorMessage: isHolderNameValid ? '' : 'This field cannot be left blank.',
    });
    setMobileNumber(isMobileNumberValid);
    setConfirmMobileNumber(
      isCompareMobileNumberValid
        ? isConfirmMobileNumberValid
        : compareMobileNumber()
    );

    return (
      isWalletValid &&
      isHolderNameValid &&
      isMobileNumberValid.isValidation &&
      isConfirmMobileNumberValid.isValidation &&
      isCompareMobileNumberValid
    );
  };

  const onConfirm = () => {
    if (confirmValidation()) {
      const walletName =
        walletVendorOption?.find((option) => option.value === selectedWallet)
          ?.label || '';

      dispatch(
        modalSlice.actions.updatebindBankcardModal({
          ...modalInitialState.bindBankcardModal,
          show: true,
          confirm: false,
          cardholderName: holderName.data,
          mobileWalletAccount: mobileNumber.data,
          walletVendor: selectedWallet,
          walletName: walletName,
        })
      );
    }
  };

  useEffect(() => {
    if (confirmMobileNumber.isEdit) {
      setConfirmMobileNumber(compareMobileNumber());
    }
  }, [mobileNumber.data, confirmMobileNumber.data]);

  const Label = ({ labelKey }: { labelKey: string }) => (
    <div className="mb-1 text-xs font-medium">{t(labelKey)}</div>
  );

  return (
    <div className="mt-3 flex grow flex-col overflow-auto">
      <div className="grow">
        <div>
          <Label labelKey="walletSelectorLabel" />
          <Select
            className="bg-cTextFields-background-main rounded-md text-sm focus:outline-0"
            isSearchable={false}
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
            }}
            placeholder="Select"
            options={walletVendorOption}
            onChange={(newValue) => {
              setSelectedWallet(newValue?.value || '');
            }}
          />
          {!isWalletSelected && selectedWallet === '' && (
            <div className="text-cstate-error-main my-1 ml-5">
              {t('Please select an option.')}
            </div>
          )}
        </div>
        <div className="mt-3">
          <Label labelKey="eWalletHolderName" />
          <ValidateInput
            placeholder="Enter"
            placeholderColor={window.theme?.input?.placeholder}
            inputData={holderName}
            setInputData={setHolderName}
            validateData={() => {
              const { data } = holderName;
              const isValidation = data !== '';
              return {
                data,
                isValidation,
                isEdit: true,
                errorMessage: isValidation
                  ? ''
                  : 'This field cannot be left blank.',
              };
            }}
            errorMessage={holderName.errorMessage}
            value={holderName.data}
            containerStyle={{
              backgroundColor: window.theme?.textFiled?.background?.main,
              borderRadius: '6px',
              padding: '12px 16px',
              fontSize: '14px',
            }}
            onCopy={() => null}
          />
        </div>
        <div className="mt-3">
          <Label labelKey="mobileNumber" />
          <ValidateInput
            inputData={mobileNumber}
            setInputData={setMobileNumber}
            validateData={() => validationPHMobileNumber(mobileNumber.data)}
            errorMessage={mobileNumber.errorMessage}
            value={mobileNumber.data}
            inputLength={11}
            containerStyle={{
              backgroundColor: window.theme?.textFiled?.background?.main,
              borderRadius: '6px',
              padding: '12px 16px',
              fontSize: '14px',
            }}
            placeholder={t('mobileNumber')}
            placeholderColor={window.theme?.input?.placeholder}
            onCopy={() => null}
          />
        </div>

        <div className="mt-3">
          <Label labelKey="confirmMobileNumber" />
          <ValidateInput
            inputData={confirmMobileNumber}
            setInputData={setConfirmMobileNumber}
            validateData={() =>
              validationPHMobileNumber(confirmMobileNumber.data)
            }
            errorMessage={confirmMobileNumber.errorMessage}
            value={confirmMobileNumber.data}
            containerStyle={{
              backgroundColor: window.theme?.textFiled?.background?.main,
              borderRadius: '6px',
              padding: '12px 16px',
              fontSize: '14px',
            }}
            placeholder={t('confirmMobileNumber')}
            placeholderColor={window.theme?.input?.placeholder}
            inputLength={11}
            onCopy={() => null}
          />
        </div>
      </div>

      <div className="mt-3">
        <Button text={t('Confirm')} outlineTheme="round" onClick={onConfirm} />
      </div>
    </div>
  );
};

export default AddEWalletForm;
