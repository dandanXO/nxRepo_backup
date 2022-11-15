import {Button, Input} from "@frontend/mobile/shared/ui";
import React from "react";
import {IGeneralPageLayoutTypeProps} from "../../../types/IGeneralPageLayoutTypeProps";
import {Form} from "../../../components/Form";
import { Paragraph } from "../../../components/Paragraph";
import {useTranslation} from "react-i18next";

export const BankAccountTemplate1 = (props: IGeneralPageLayoutTypeProps) => {
  const {t} = useTranslation();
  return (
    <>
      <Form>
        <Input
          label={t("Cardholder Name", {ns: "bank-bind"}) as string}
          value={props.cardholderName}
          disabled
        />
        <Paragraph>
          {t("For KYC, your Cardholder name and Aadhaar name should be match.", {ns: "bank-bind-india"})}
        </Paragraph>
        <Input
          className="mb"
          label={t("IFSC Code", {ns: "bank-bind"}) as string}
          value={props.ifscData.data}
          onChange={props.onIFSCChange}
          onBlur={props.onIFSCBlur}
          errorMessage={props.ifscData.errorMessage}
        />
        <Input
          className="mb"
          label={t("Account Number", {ns: "bank-bind"}) as string}
          value={props.bankcardNoData.data}
          onChange={props.onAccountNumberChange}
          onBlur={props.onAccountNumberBlur}
          errorMessage={props.bankcardNoData.errorMessage}
        />
        <Input
          className="mb"
          label={t("Confirm Account Number", {ns: "bank-bind"}) as string}
          value={props.confirmedBankcardNoData.data}
          onChange={props.onConfirmAccountNumberChange}
          onBlur={props.onConfirmAccountNumberBlur}
          errorMessage={props.confirmedBankcardNoData.errorMessage}
        />
        <Input
          className="mb"
          label={t("UPI ID", {ns: "bank-bind-india"}) as string}
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
