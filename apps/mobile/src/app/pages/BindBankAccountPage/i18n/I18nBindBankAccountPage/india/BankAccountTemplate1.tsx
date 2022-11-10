import {Button, Input} from "@frontend/mobile/shared/ui";
import React from "react";
import {IGeneralPageLayoutTypeProps} from "../../../types/IGeneralPageLayoutTypeProps";
import {Form} from "../../../components/Form";
import { Paragraph } from "../../../components/Paragraph";

export const BankAccountTemplate1 = (props: IGeneralPageLayoutTypeProps) => {
  return (
    <>
      <Form>
        <Input
          label="Cardholder Name"
          value={props.cardholderName}
          disabled
        />
        <Paragraph>
          For KYC, your Cardholder name and Aadhaar name should be
          match.
        </Paragraph>
        <Input
          className="mb"
          label="IFSC Code"
          value={props.ifscData.data}
          onChange={props.onIFSCChange}
          onBlur={props.onIFSCBlur}
          errorMessage={props.ifscData.errorMessage}
        />
        <Input
          className="mb"
          label="Account Number"
          value={props.bankcardNoData.data}
          onChange={props.onAccountNumberChange}
          onBlur={props.onAccountNumberBlur}
          errorMessage={props.bankcardNoData.errorMessage}
        />
        <Input
          className="mb"
          label="Confirm Account Number"
          value={props.confirmedBankcardNoData.data}
          onChange={props.onConfirmAccountNumberChange}
          onBlur={props.onConfirmAccountNumberBlur}
          errorMessage={props.confirmedBankcardNoData.errorMessage}
        />
        <Input
          className="mb"
          label="UPI ID"
          value={props.upiData.data}
          onChange={props.onUPIIDChange}
        />
      </Form>

      <Button onClick={() => {
        // if(!props.isFormPending && props.confirm) {
        //   console.log("request")
        props.confirm && props.confirm();
        // } else {
        //   console.log("request2")
        // }
      }}>Submit</Button>
    </>
  );
}
