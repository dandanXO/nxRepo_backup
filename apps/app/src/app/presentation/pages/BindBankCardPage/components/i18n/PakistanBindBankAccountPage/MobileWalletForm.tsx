import { Form } from '../../Form';
import { Input, InputValue } from '@frontend/mobile/shared/ui';
import React, { ClipboardEvent } from 'react';
import { Label } from '../../Label';
import { useNavigate } from 'react-router';
import { selectStyles } from '../../../../../components/layouts/selectStyles';
import Select from 'react-select';
import { EnumV15GradientButtonClassNames } from '../../../../../../../environments/theme/pakistan/v15/button';
import { Button } from '../../../../../components/layouts/Button';
import { Page } from '../../../../../components/layouts/Page';

type IMobileWalletForm = {
  // Wallet List
  walletDropList: any;
  walletValue: any;
  setWalletValue: any;
  // Wallet Account
  mobileData: InputValue<string>;
  onMobileDataChange: (event: any) => void;
  onMobileDataBlur: (event: any) => void;
  // Confirm Wallet Account
  confirmMobileData: InputValue<string>;
  onConfirmMobileDataChange: (event: any) => void;
  onConfirmMobileDataBlur: (event: any) => void;
  // Form
  isFormPending: boolean;
  confirm: () => void;
  iBanData: InputValue<string>;
  onIBanChange: (event: any) => void;
  onIbanBlur: (event: any) => void;
};

export const MobileWalletForm = (props: IMobileWalletForm) => {
  const navigate = useNavigate();
  const options = props.walletDropList?.map((item: string, index: number) => {
    return { value: index, label: item };
  });
  const preventCopyPaste = (e: ClipboardEvent<any>) => {
    e.preventDefault();
  };
  return (
    <div className="grow flex flex-col">
      <div>
        <div className={'text-sm'}>{'Mobile Wallet'}</div>
        <Select
          styles={selectStyles}
          className="react-select-container mb-2"
          options={options}
          // defaultValue={props.bankDropList[0].value}
          value={props.walletValue}
          onChange={(item: any) => {
            console.log(item);
            props.setWalletValue(item);
          }}
          isSearchable={false}
          placeholder={'Mobile Wallet'}
        />
      </div>
      <div className={'text-sm'}>{'Your IBAN Number (24 characters)'}</div>
      <Input
        name={'iban'}
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
        onClick={() => navigate('iban-finder-modal', { state: 'Wallet' })}
      >
        {'Click me to learn where can I find my IBAN number?'}
      </div>

      <div>
        <div className={'text-sm mb-0'}>{'Mobile Wallet Account'}</div>
        <Input
          name={'account'}
          className="mb-1"
          textAlign={'left'}
          labelType={'left'}
          outlineType={'standard'}
          label={'+92'}
          placeholder={'Mobile Wallet Account'}
          value={props.mobileData.data}
          onChange={props.onMobileDataChange}
          onBlur={props.onMobileDataBlur}
          errorMessage={props.mobileData.errorMessage}
          onCopy={(e) => preventCopyPaste(e)}
          onCut={(e) => preventCopyPaste(e)}
        />
      </div>

      <div>
        <div className={'text-sm'}>{'Confirm Mobile Wallet Account'}</div>
        <Input
          name={'account_confirm'}
          className="mb"
          textAlign={'left'}
          labelType={'left'}
          outlineType={'standard'}
          label={'+92'}
          placeholder={'Confirm Mobile Wallet Account'}
          value={props.confirmMobileData.data}
          onChange={props.onConfirmMobileDataChange}
          onBlur={props.onConfirmMobileDataBlur}
          errorMessage={props.confirmMobileData.errorMessage}
          onCopy={(e) => preventCopyPaste(e)}
          onPaste={(e) => preventCopyPaste(e)}
          onCut={(e) => preventCopyPaste(e)}
        />
      </div>

      {/*<Button onClick={() => !props.isFormPending && props.confirm()}>Submit</Button>*/}
      <div className="grow flex flex-col justify-end mb-2">
        <Button
          className={`${EnumV15GradientButtonClassNames} `}
          text={'Confirm'}
          onClick={() => props.confirm()}
        />
      </div>
    </div>
  );
};
