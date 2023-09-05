import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

import { i18nBankBindAccountPage } from '../../translations';

interface IAddEWalletFormProps {
  walletVendorOption: { value: string; label: string }[];
}

const AddEWalletForm = ({ walletVendorOption }: IAddEWalletFormProps) => {
  const [selectedWallet, setSelectedWallet] = useState<string | undefined>('');

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
            className="bg-cTextFields-background-main rounded-md text-sm placeholder-red-400 focus:outline-0"
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: 'transparent',
                border: 0,
                boxShadow: 'none',
                padding: '8px 8px',
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
      </div>
      <div>
        <button>Submit</button>
      </div>
    </div>
  );
};

export default AddEWalletForm;
