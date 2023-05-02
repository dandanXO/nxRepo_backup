import {Form} from "../../Form";
import {Button, Input, InputValue, Select} from "@frontend/mobile/shared/ui";
import React from "react";
import {Label} from "../../Label";
import {useNavigate} from "react-router";

type IMobileWalletForm = {
  // Wallet List
  walletDropList: any;
  walletValue: number;
  setWalletValue: any;
  // Wallet Account
  mobileData: InputValue<string>;
  onMobileDataChange: (event: any) => void;
  validateMobileWalletAccount: (event: any) => void;
  // Form
  isFormPending: boolean;
  confirm: () => void;
  iBanData: InputValue<string>;
  onIBanChange: (event: any) => void;
  onIbanBlur: (event: any) => void;
};

export const MobileWalletForm = (props: IMobileWalletForm) => {
  const navigate = useNavigate();
  return (
    <Form>

      <div>
        <Label>{"Mobile Wallet"}</Label>
        <Select
          className="mb"
          fixButtonWidth={"calc(100vw - 36px)"}
          dataSource={props.walletDropList}
          defaultIndex={props.walletValue}
          // FIXME: to controlled component
          onSelect={(index:number) => {
            props.setWalletValue(index);
          }}
        />
      </div>

      <div>
        <Label>{'Your IBAN Number (24 characters)'}</Label>
        <Input
          labelType={'none'}
          outlineType={"standard"}
          placeholder={'Ex. PK36FTBK0000111123456702'}
          value={props.iBanData.data}
          onChange={props.onIBanChange}
          onBlur={props.onIbanBlur}
          errorMessage={props.iBanData.errorMessage}
        />
        <div className="text-sm text-blue-500 underline leading-none whitespace-nowrap mb"
             onClick={() => navigate('iban-finder-modal', { state: 'Wallet' })}
        >
          {'Click me to learn where can I find my IBAN number?'}
        </div>
      </div>

      <div>
        <Label>{'Confirm Mobile Wallet Account'}</Label>
        <Input
          className="mb"
          labelType={"left"}
          outlineType={"standard"}
          label={"+92"}
          placeholder={"Wallet Account Number"}
          value={props.mobileData.data}
          onChange={props.onMobileDataChange}
          onBlur={props.validateMobileWalletAccount}
          errorMessage={props.mobileData.errorMessage}
        />
      </div>

      {/*<Button onClick={() => !props.isFormPending && props.confirm()}>Submit</Button>*/}
      <Button
        onClick={() => props.confirm()}
      >
        {"Confirm and Add"}
      </Button>
    </Form>
  );
}

