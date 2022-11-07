import {Form} from "../../components/Form";
import {Button, Input} from "@frontend/mobile/shared/ui";
import React from "react";
import {IGeneralPageLayoutTypeProps} from "../../types/IGeneralPageLayoutTypeProps";
import {Label} from "../Label";

export const BankAccountTemplate2 = (props: IGeneralPageLayoutTypeProps) => {

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

        <Label>IFSC Code</Label>
        <Input
          className="mb"
          labelType={"none"}
          placeholder="IFSC Code"
          value={props.ifscData.data}
          onChange={props.onIFSCChange}
          onBlur={props.onIFSCBlur}
          errorMessage={props.ifscData.errorMessage}
        />

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

        <Label>UPI ID</Label>
        <Input
          className="mb"
          labelType={"none"}
          placeholder="UPI ID"
          value={props.upiData.data}
          onChange={props.onUPIIDChange}
        />
      </Form>

      <Button onClick={() => !props.isFormPending && props.confirm && props.confirm()}>Submit</Button>
    </>
  );
}
