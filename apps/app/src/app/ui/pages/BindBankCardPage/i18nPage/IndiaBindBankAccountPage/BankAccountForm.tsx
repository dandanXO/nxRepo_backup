import { MdInfoOutline } from '@react-icons/all-files/md/MdInfoOutline';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Input } from '@frontend/mobile/shared/ui';

import { Button } from '../../../../core-components/Button';
import IFSCHintModal from '../../../../modals/i18n/india/IFSCHintModal';
import UPIHintModal from '../../../../modals/i18n/india/UPIHintModal';
import { i18nBankBindAccountPage } from '../../translations';
import { IIndiaBankAccountForm } from '../types/IBankAccountForm';
import { Form } from './Form';
import ValidateInput from '../../../../core-components/ValidateInput';
import { useIndiaBankAccountForm } from '../../hooks/i18n/india/useIndiaBankAccountForm';

export const BankAccountForm = (props: IIndiaBankAccountForm) => {
  const [ifscModalShow, SetIfscModalShow] = useState(false);
  const [upiModalShow, SetUpiModalShow] = useState(false);
  const { t } = useTranslation(i18nBankBindAccountPage.namespace);
  const {
    // NOTE: IFSC
    ifscData,
    setIFSCData,
    validateIFSC,
    // NOTE: UPI
    upiData,
    setUpiData,
    validateUpiId
  } = props;
  return (
    <div className="flex grow flex-col">
      <Form className="grow">
        <div className="text-ctext-primary mb-1 text-xs">
          To ensure a successful loan disbursement, your Cardholder name must match the name on your PAN card. Also, please carefully verify your{' '}
          <span className='font-bold underline'>account number</span> and{' '}
          <span className='font-bold underline'>IFSC code</span> to ensure are correct and correspond to the same card.
        </div>
        <Input
          className="mb-3 text-sm"
          label={t('Cardholder Name') as string}
          value={props.cardholderName}
          disabled
        />

        <Input
          className="mb-3 text-sm"
          label={t('Account Number') as string}
          value={props.bankcardNoData.data}
          onChange={props.onAccountNumberChange}
          onBlur={props.onAccountNumberBlur}
          errorMessage={props.bankcardNoData.errorMessage}
        />
        <Input
          className="mb-3 text-sm"
          label={t('Confirm Account Number') as string}
          value={props.confirmedBankcardNoData.data}
          onChange={props.onConfirmAccountNumberChange}
          onBlur={props.onConfirmAccountNumberBlur}
          errorMessage={props.confirmedBankcardNoData.errorMessage}
        />

        <ValidateInput
          name={'IFSC'}
          className="mb-3 text-sm"
          suffix={
            <div
              className="absolute left-1"
              onClick={(e) => {
                e.preventDefault();
                SetIfscModalShow(true);
              }}
            >
              <MdInfoOutline />
            </div>
          }
          label={t('IFSC Code (11characters )') as string}
          value={ifscData.data}
          errorMessage={ifscData.errorMessage}
          inputData={ifscData}
          setInputData={setIFSCData}
          validateData={() => validateIFSC(ifscData.data)}
          inputLength={11}
        />
        <ValidateInput
          name={'UPI ID'}
          className="mb-4 text-sm"
          label={t('UPI ID') as string}
          suffix={
            <div
              className="absolute left-1"
              onClick={(e) => {
                e.preventDefault();
                SetUpiModalShow(true);
              }}
            >
              <MdInfoOutline />
            </div>
          }
          value={upiData.data}
          errorMessage={upiData.errorMessage}
          inputData={upiData}
          setInputData={setUpiData}
          validateData={() => validateUpiId(upiData.data)}
        />

      </Form>
      <div className="mb-4">
        <Button
          text={t('Confirm') as string}
          onClick={() => {
            !props.isFormPending && props.confirm();
          }}
        />
      </div>
      {ifscModalShow && (
        <IFSCHintModal onClick={() => SetIfscModalShow(false)} />
      )}
      {upiModalShow && <UPIHintModal onClick={() => SetUpiModalShow(false)} />}
    </div>
  );
};
