import React, { useState } from 'react';

import { Input } from '@frontend/mobile/shared/ui';

import { Button } from '../../../../../components/layouts/Button';
import { IIndiaBankAccountForm } from '../../../types/IBankAccountForm';
import { Form } from '../../Form';
import { Paragraph } from '../../Paragraph';
import { MdInfoOutline } from '@react-icons/all-files/md/MdInfoOutline';
import IFSCHintModal from 'apps/app/src/app/presentation/modals/IFSCHintModal';
import UPIHintModal from 'apps/app/src/app/presentation/modals/UPIHintModal';
export const BankAccountForm = (props: IIndiaBankAccountForm) => {

  const [ifscModalShow,SetIfscModalShow]=useState(false);
  const [upiModalShow,SetUpiModalShow]=useState(false);

  return (
    <div className="flex flex-col grow">
      <Form className="grow">
        <div className="text-ctext-primary mb-1 text-xs">
          {'For KYC, your Cardholder name and PAN card name should be match.'}
        </div>
        <Input className="mb-3 text-sm" label={'Cardholder Name'} value={props.cardholderName} disabled />
        
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
        <Input
          suffix={<div className='absolute left-1' onClick={()=>SetIfscModalShow(true)}><MdInfoOutline/></div>}
          className="mb-3 text-sm"
          label={'IFSC Code (11characters )'}
          value={props.ifscData.data}
          onChange={props.onIFSCChange}
          onBlur={props.onIFSCBlur}
          errorMessage={props.ifscData.errorMessage}
        />
        <Input
          suffix={<div className='absolute left-1' onClick={() => SetUpiModalShow(true)}><MdInfoOutline /></div>}
          className="mb-4 text-sm"
          label={'UPI ID'}
          value={props.upiData.data}
          onChange={props.onUPIIDChange}
          onBlur={props.onUPIIDChangBlur}
          errorMessage={props.upiData.errorMessage}
        />
      </Form>
      <div className="mb-4">
        <Button
          text={'Confirm'}
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
