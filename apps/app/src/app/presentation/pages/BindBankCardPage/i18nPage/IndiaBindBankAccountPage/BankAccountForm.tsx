import React, { useState } from 'react';

import { Input } from '@frontend/mobile/shared/ui';

import { Button } from '../../../../components/layouts/Button';
import { IIndiaBankAccountForm } from '../types/IBankAccountForm';
import { Form } from './Form';
import { MdInfoOutline } from '@react-icons/all-files/md/MdInfoOutline';
import IFSCHintModal from '../../../../modals/i18n/india/IFSCHintModal';
import UPIHintModal from '../../../../modals/i18n/india/UPIHintModal';
import { i18nBankBindAccountPage } from '../../translations';
import { useTranslation } from 'react-i18next';
export const BankAccountForm = (props: IIndiaBankAccountForm) => {

  const [ifscModalShow,SetIfscModalShow]=useState(false);
  const [upiModalShow,SetUpiModalShow]=useState(false);
  const { t } = useTranslation(i18nBankBindAccountPage.namespace);

  return (
    <div className="flex flex-col grow">
      <Form className="grow">
        <div className="text-ctext-primary mb-1 text-xs">
          {t('For KYC, your Cardholder name and PAN card name should be match.')}
        </div>
        <Input className="mb-3 text-sm" label={t('Cardholder Name') as string} value={props.cardholderName} disabled />

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
        <Input
          suffix={<div className='absolute left-1'
          onClick={(e) => {
              e.preventDefault();
              SetIfscModalShow(true)
          }}><MdInfoOutline /></div>}
          className="mb-3 text-sm"
          label={t('IFSC Code (11characters )') as string}
          value={props.ifscData.data}
          onChange={props.onIFSCChange}
          onBlur={props.onIFSCBlur}
          errorMessage={props.ifscData.errorMessage}
        />
        <Input
          suffix={<div className='absolute left-1' onClick={(e) => {
            e.preventDefault();
            SetUpiModalShow(true)
          }}><MdInfoOutline /></div>}
          className="mb-4 text-sm"
          label={t('UPI ID') as string}
          value={props.upiData.data}
          onChange={props.onUPIIDChange}
          onBlur={props.onUPIIDChangBlur}
          errorMessage={props.upiData.errorMessage}
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
      {ifscModalShow && <IFSCHintModal onClick={()=>SetIfscModalShow(false)}/>}
      {upiModalShow && <UPIHintModal onClick={()=>SetUpiModalShow(false)}/>}
    </div>
  );
};
