import React, {ClipboardEvent, } from 'react';

import { Input } from '@frontend/mobile/shared/ui';
import { IPakistanBankAccountForm } from '../../../types/IBankAccountForm';
import Select from 'react-select';
import { useNavigate } from 'react-router';
import { Button } from '../../../../../components/layouts/Button';
import { selectStyles } from '../../../../../components/layouts/selectStyles';
import { EnumV15GradientButtonClassNames } from '../../../../../../../environments/theme/pakistan/v15/button';

export const BankAccountForm = (props: IPakistanBankAccountForm) => {
  const navigate = useNavigate();

  const options = props.bankDropList?.map((item: string, index: number) => {
    return { value: index, label: item };
  });

  const preventCopyPaste = (e: ClipboardEvent<any>) => {
    e.preventDefault()
  }

  return (
    <div className="grow flex flex-col">
      <div>
        <div className={'text-sm'}>{'Cardholder Name'}</div>
        <Input
          className="mb-2"
          labelType={'none'}
          outlineType={'standard'}
          placeholder={'Cardholder Name'}
          value={props.cardholderName}
          disabled
        />
      </div>

      <div>
        <div className={'text-sm'}>{'Your IBAN Number (24 characters)'}</div>
        <Input
          labelType={'none'}
          outlineType={'standard'}
          placeholder={'Ex. PK36FTBK0000111123456702'}
          value={props.iBanData.data}
          onChange={props.onIBanChange}
          onBlur={props.onIbanBlur}
          errorMessage={props.iBanData.errorMessage}
          onCopy={(e) => preventCopyPaste(e)}
          onPaste={(e) => preventCopyPaste(e)}
          onCut={(e) => preventCopyPaste(e)}
        />
        <div
          className="text-xs text-cstate-info-main underline leading-none whitespace-nowrap mb-2"
          onClick={() => navigate('iban-finder-modal', { state: 'Bank' })}
        >
          {'Click me to learn where can I find my IBAN number?'}
        </div>
      </div>

      <div>
        <div className={'text-sm'}>{'Bank Name'}</div>
        <Select
          styles={selectStyles}
          className=" mb-2"
          // defaultValue={props.bankDropList[0].value}
          // value={props?.bankDropList[props.bankAccountValue]?.value}
          value={props.bankAccountValue}
          onChange={(item: any) => {
            // console.log(item)
            props.onIFSCDropSelect(item);
          }}
          options={options}
          isSearchable={false}
          placeholder={'Select'}
        />
      </div>

      <div>
        <div className={'text-sm'}>{'Account Number'}</div>
        <Input
          className="mb-2"
          labelType={'none'}
          outlineType={'standard'}
          placeholder={'Account Number'}
          value={props.bankcardNoData.data}
          onChange={props.onAccountNumberChange}
          onBlur={props.onAccountNumberBlur}
          errorMessage={props.bankcardNoData.errorMessage}
          onCopy={(e) => preventCopyPaste(e)}
          onPaste={(e) => preventCopyPaste(e)}
          onCut={(e) => preventCopyPaste(e)}
        />
      </div>

      <div>
        <div className={'text-sm'}>{'Confirm Account Number'}</div>
        <Input
          className="mb-2"
          labelType={'none'}
          outlineType={'standard'}
          placeholder={'Confirm Account Number'}
          value={props.confirmedBankcardNoData.data}
          onChange={props.onConfirmAccountNumberChange}
          onBlur={props.onConfirmAccountNumberBlur}
          errorMessage={props.confirmedBankcardNoData.errorMessage}
          onCopy={(e) => preventCopyPaste(e)}
          onPaste={(e) => preventCopyPaste(e)}
          onCut={(e) => preventCopyPaste(e)}
        />
      </div>
      <div className="grow flex flex-col justify-end mb-2">
        <Button
          text={'Confirm'}
          className={`${EnumV15GradientButtonClassNames}`}
          onClick={() => {
            // !props.isFormPending && props.confirm
            props.confirm && props.confirm();
          }}
        />
      </div>
    </div>
  );
};
