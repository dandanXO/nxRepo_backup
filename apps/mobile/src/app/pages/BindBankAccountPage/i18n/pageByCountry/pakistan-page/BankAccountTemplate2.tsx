import {Form} from "../../../components/Form";
import {Button, Input} from "@frontend/mobile/shared/ui";
import React from "react";
import {IPakistanPageLayoutTypeProps} from "../../../types/IGeneralPageLayoutTypeProps";
import {Label} from "../../../components/Label";
import styled from "styled-components";

const Warning = styled.div`
  margin: 0 auto;
  width: 284px;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.42;
  letter-spacing: normal;
  text-align: center;
  color: #f82626;
`;
export const BankAccountTemplate2 = (props: IPakistanPageLayoutTypeProps) => {

  return (
    <>
      <Form>
        <Label>Cardholder Name</Label>

        <Input
          className="mb"
          labelType={"none"}
          placeholder="Cardholder Name"
          value={props.cardholderName}
          disabled
        />

        {/*<Label>IFSC Code</Label>*/}
        {/*<Input*/}
        {/*  className="mb"*/}
        {/*  labelType={"none"}*/}
        {/*  placeholder="IFSC Code"*/}
        {/*  value={props.ifscData.data}*/}
        {/*  onChange={props.onIFSCChange}*/}
        {/*  onBlur={props.onIFSCBlur}*/}
        {/*  errorMessage={props.ifscData.errorMessage}*/}
        {/*/>*/}

        <Label>Account Number</Label>
        <Input
          className="mb"
          labelType={"none"}
          placeholder="Account Number"
          value={props.bankcardNoData.data}
          onChange={props.onAccountNumberChange}
          onBlur={props.onAccountNumberBlur}
          errorMessage={props.bankcardNoData.errorMessage}
        />

        <Label>Confirm Account Number</Label>
        <Input
          className="mb"
          labelType={"none"}
          placeholder="Confirm Account Number"
          value={props.confirmedBankcardNoData.data}
          onChange={props.onConfirmAccountNumberChange}
          onBlur={props.onConfirmAccountNumberBlur}
          errorMessage={props.confirmedBankcardNoData.errorMessage}
        />

        {/*<Label>UPI ID</Label>*/}
        {/*<Input*/}
        {/*  className="mb"*/}
        {/*  labelType={"none"}*/}
        {/*  placeholder="UPI ID"*/}
        {/*  value={props.upiData.data}*/}
        {/*  onChange={props.onUPIIDChange}*/}
        {/*/>*/}

        <Warning>Unchangeable after linked, please check before submission.</Warning>
      </Form>

      <Button onClick={() => {
        // if(!props.isFormPending && props.confirm) {
        //   console.log("request")
        props.confirm && props.confirm()
        // } else {
        //   console.log("request2")
        // }
      }}>Submit</Button>
    </>
  );
}
