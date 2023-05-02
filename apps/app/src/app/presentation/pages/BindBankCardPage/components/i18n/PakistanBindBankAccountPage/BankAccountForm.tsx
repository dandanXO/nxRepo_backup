import React from "react";
import styled from "styled-components";
import {Form} from "../../Form";
import {Label} from "../../Label";
import {Input} from "@frontend/mobile/shared/ui";
import {IPakistanBankAccountForm} from "../../../types/IBankAccountForm";
import Select from 'react-select';
import {useNavigate} from "react-router";
import {Button} from "../../../../../components/layouts/Button";
import {selectStyles} from "../../../../../components/layouts/selectStyles";

const CustomForm = styled.div`
  .css-1s2u09g-control, .css-1pahdxg-control {
    border-radius: 9px;
    height: 49px;
    border: 1px solid #aaaaaa;
  }
  .css-14el2xx-placeholder {
    //font-weight: 600;
  }
`
export const BankAccountForm = (props: IPakistanBankAccountForm)  => {

  const navigate = useNavigate();

  const options = props.bankDropList?.map((item: string, index: number) => {
    return {value: item, label: item, index: index}
  });

  return (
    <CustomForm>
      <Form>

        <div>
          <Label className={"text-sm"}>{'Cardholder Name'}</Label>
          <Input
            className="mb"
            labelType={'none'}
            outlineType={"standard"}
            placeholder={'Cardholder Name'}
            value={props.cardholderName}
            disabled
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
               onClick={()=>navigate('iban-finder-modal',{state:'Bank'})}
          >
            {'Click me to learn where can I find my IBAN number?'}
          </div>
        </div>

        <div>
          <Label className={"text-sm"}>{'Bank Name'}</Label>
          <Select
            styles={selectStyles}
            className="react-select-container mb"
            // defaultValue={props.bankDropList[0].value}
            value={props?.bankDropList[props.bankAccountValue]?.value}
            onChange={(item: any) => {
              console.log(item)
              props.onIFSCDropSelect(item.index);
            }}
            options={options}
            isSearchable={false}
            placeholder={"Select"}
          />
        </div>

        <div>
          <Label className={"text-sm"}>{'Account Number'}</Label>
          <Input
            className="mb"
            labelType={'none'}
            outlineType={"standard"}
            placeholder={'Account Number'}
            value={props.bankcardNoData.data}
            onChange={props.onAccountNumberChange}
            onBlur={props.onAccountNumberBlur}
            errorMessage={props.bankcardNoData.errorMessage}
          />
        </div>

        <div>
          <Label className={"text-sm"}>{'Confirm Account Number'}</Label>
          <Input
            className="mb"
            labelType={'none'}
            outlineType={"standard"}
            placeholder={'Confirm Account Number'}
            value={props.confirmedBankcardNoData.data}
            onChange={props.onConfirmAccountNumberChange}
            onBlur={props.onConfirmAccountNumberBlur}
            errorMessage={props.confirmedBankcardNoData.errorMessage}
          />
        </div>

        <Button text={"Confirm and Add"} onClick={() => {
          // !props.isFormPending && props.confirm
          props.confirm && props.confirm();
        }} className={"bg-primary-main text-white"}/>

      </Form>

    </CustomForm>
  );
}
