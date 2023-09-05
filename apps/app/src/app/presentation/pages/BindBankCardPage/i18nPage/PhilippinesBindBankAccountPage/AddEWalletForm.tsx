import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

import { Input } from '@frontend/mobile/shared/ui';

import { InputValue } from '../../../../../modules/form/InputValue';
import ValidateInput from '../../../../components/ValidateInput';
import { i18nBankBindAccountPage } from '../../translations';
import { validationPHMobileNumber } from "./validation";

interface IAddEWalletFormProps {
  walletVendorOption: { value: string; label: string }[];
}

const AddEWalletForm = ({ walletVendorOption }: IAddEWalletFormProps) => {
  const [selectedWallet, setSelectedWallet] = useState<string | undefined>('');
  const [holderName, setHolderName] = useState('');
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
            options={walletVendorOption}
            onChange={(newValue) => {
              setSelectedWallet(newValue?.value);
            }}
          />
        </div>
        <div className="mt-3">
          <Label labelKey="eWalletHolderName" />
          <input
            className="bg-cTextFields-background-main placeholder-cTextFields-placeholder-main w-full rounded-md py-3 px-4 text-sm focus:outline-0"
            value={holderName}
            placeholder="Enter"
            onChange={(e) => setHolderName(e.currentTarget.value)}
          />
        </div>
        <div className="mt-3">
          <Label labelKey="mobileNumber" />
          <ValidateInput
            inputData={mobileNumber}
            setInputData={setMobileNumber}
            validateData={()=>validationPHMobileNumber(mobileNumber.data)}
            errorMessage={mobileNumber.errorMessage}
            value={mobileNumber.data}
            inputLength={11}
            containerStyle={{
              backgroundColor: window.theme?.textFiled?.background?.main,
              borderRadius: '6px',
              padding: '12px 16px',
              fontSize: '14px'
            }}
            placeholder={t('mobileNumber')}
            placeholderColor={window.theme?.input?.placeholder}
          />
        </div>
      </div>

      <div>
        <button>Submit</button>
      </div>
    </div>
  );
};

export default AddEWalletForm;
