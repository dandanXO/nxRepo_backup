import {CustomPage} from "../CustomPage";
import {Form} from "../Form";
import {Button, Input} from "@frontend/mobile/shared/ui";
import {Paragraph} from "../Paragraph";
import React from "react";
import {IGeneralPageLayoutTypeProps} from "./types/IGeneralPageLayoutTypeProps";
import styled from "styled-components";

const Label = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 7px;
`
export const PageLayoutType2 = (props: IGeneralPageLayoutTypeProps) => {
  return (
    <CustomPage>
      <Form>
        <Label>Cardholder Name</Label>
        <Input
          labelType={"none"}
          placeholder="Cardholder Name"
          value={props.cardholderName}
          disabled
        />
        <Paragraph>
          For KYC, your Cardholder name and Aadhaar name should be
          match.
        </Paragraph>

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

      <Button onClick={() => !props.isFormPending && props.confirm()}>Submit</Button>
    </CustomPage>
  );
}
