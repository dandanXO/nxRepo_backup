import {Form} from "../../Form";
import {Input, InputValue } from "@frontend/mobile/shared/ui";
import React from "react";
import {Label} from "../../Label";
import {useNavigate} from "react-router";
import {selectStyles} from "../../../../../components/layouts/selectStyles";
import Select from "../../../../../components/Select";
import {EnumV15GradientButtonClassNames} from "../../../../../../../environments/theme/pakistan/v15/button";
import {Button} from "../../../../../components/layouts/Button";

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
    return {value: index, label: item}
  });

  return (
    <div>
      <Form>

        <div>
          <Label className={"text-sm"}>{"Mobile Wallet"}</Label>
          <Select
            styles={selectStyles}
            className="react-select-container mb"
            options={options}
            // defaultValue={props.bankDropList[0].value}
            value={props.walletValue}
            onChange={(item: any) => {
              console.log(item)
              props.setWalletValue(item);
            }}
            isSearchable={false}
            placeholder={"Mobile Wallet"}
          />

        </div>

        <div>
          <Label className={"text-sm"}>{'Your IBAN Number (24 characters)'}</Label>
          <Input
            labelType={'none'}
            outlineType={"standard"}
            placeholder={'Ex. PK36FTBK0000111123456702'}
            value={props.iBanData.data}
            onChange={props.onIBanChange}
            onBlur={props.onIbanBlur}
            errorMessage={props.iBanData.errorMessage}
          />
          <div className="text-xs text-blue-500 underline leading-none whitespace-nowrap mb"
               onClick={() => navigate('iban-finder-modal', { state: 'Wallet' })}
          >
            {'Click me to learn where can I find my IBAN number?'}
          </div>
        </div>

        <div>
          <Label className={"text-sm"}>{'Mobile Wallet Account'}</Label>
          <Input
            className="mb"
            labelType={"left"}
            outlineType={"standard"}
            label={"+92"}
            placeholder={"Wallet Account Number"}
            value={props.mobileData.data}
            onChange={props.onMobileDataChange}
            onBlur={props.onMobileDataBlur}
            errorMessage={props.mobileData.errorMessage}
          />
        </div>

        <div>
          <Label className={"text-sm"}>{'Confirm Mobile Wallet Account'}</Label>
          <Input
            className="mb"
            labelType={"left"}
            outlineType={"standard"}
            label={"+92"}
            placeholder={"Wallet Account Number"}
            value={props.confirmMobileData.data}
            onChange={props.onConfirmMobileDataChange}
            onBlur={props.onConfirmMobileDataBlur}
            errorMessage={props.confirmMobileData.errorMessage}
          />
        </div>

        {/*<Button onClick={() => !props.isFormPending && props.confirm()}>Submit</Button>*/}
        <Button
          className={`${EnumV15GradientButtonClassNames}`}
          text={"Confirm and Add"}
          onClick={() => props.confirm()}
        />
      </Form>
    </div>
  );
}

