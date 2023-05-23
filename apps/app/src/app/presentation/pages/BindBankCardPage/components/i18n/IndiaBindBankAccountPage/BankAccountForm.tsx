import React from 'react';
import { IIndiaBankAccountForm } from '../../../types/IBankAccountForm';
import { Form } from '../../Form';
import { Paragraph } from '../../Paragraph';
import { Button } from '../../../../../components/layouts/Button';
import { Input } from '@frontend/mobile/shared/ui';

export const BankAccountForm = (props: IIndiaBankAccountForm) => {
  return (
    <div className="flex grow flex-col">
      <Form className="grow">
        <div className="text-ctext-primary mb-1 text-xs">
          {'For KYC, your Cardholder name and PAN card name should be match.'}
        </div>
        <Input className="mb-3 text-sm" label={'Cardholder Name'} value={props.cardholderName} disabled />
        <Input
          className="mb-3 text-sm"
          label={'IFSC Code (11 digits)'}
          value={props.ifscData.data}
          onChange={props.onIFSCChange}
          onBlur={props.onIFSCBlur}
          errorMessage={props.ifscData.errorMessage}
        />
        <Input
          className="mb-3 text-sm"
          label={'Account Number'}
          value={props.bankcardNoData.data}
          onChange={props.onAccountNumberChange}
          onBlur={props.onAccountNumberBlur}
          errorMessage={props.bankcardNoData.errorMessage}
        />
        <Input
          className="mb-3 text-sm"
          label={'Confirm Account Number'}
          value={props.confirmedBankcardNoData.data}
          onChange={props.onConfirmAccountNumberChange}
          onBlur={props.onConfirmAccountNumberBlur}
          errorMessage={props.confirmedBankcardNoData.errorMessage}
        />
        <Input className="mb-4 text-sm" label={'UPI ID'} value={props.upiData.data} onChange={props.onUPIIDChange} />
      </Form>
      <div className="mb-4">
        <Button
          text={'Confirm'}
          onClick={() => {
            !props.isFormPending && props.confirm();
          }}
        />
      </div>
    </div>
  );
};
