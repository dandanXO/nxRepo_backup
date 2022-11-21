import {Button, Input} from "@frontend/mobile/shared/ui";
import React from "react";
import {IIndiaBankAccountForm} from "../../types/IBankAccountForm";
import {Form} from "../../../components/Form";
import {Paragraph} from "../../../components/Paragraph";
import {withTranslation} from "react-i18next";
import {i18nBankBindAccountPage} from "../../translations";

export const BankAccountForm = withTranslation(i18nBankBindAccountPage.namespace)((props: IIndiaBankAccountForm) => {
    return (
      <>
        <Form>
          <Input
            label={props.t("Cardholder Name") as string}
            value={props.cardholderName}
            disabled
          />
          <Paragraph>
            {props.t("For KYC, your Cardholder name and Aadhaar name should be match.")}
          </Paragraph>
          <Input
            className="mb"
            label={props.t("IFSC Code") as string}
            value={props.ifscData.data}
            onChange={props.onIFSCChange}
            onBlur={props.onIFSCBlur}
            errorMessage={props.ifscData.errorMessage}
          />
          <Input
            className="mb"
            label={props.t("Account Number") as string}
            value={props.bankcardNoData.data}
            onChange={props.onAccountNumberChange}
            onBlur={props.onAccountNumberBlur}
            errorMessage={props.bankcardNoData.errorMessage}
          />
          <Input
            className="mb"
            label={props.t("Confirm Account Number") as string}
            value={props.confirmedBankcardNoData.data}
            onChange={props.onConfirmAccountNumberChange}
            onBlur={props.onConfirmAccountNumberBlur}
            errorMessage={props.confirmedBankcardNoData.errorMessage}
          />
          <Input
            className="mb"
            label={props.t("UPI ID") as string}
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
        }}>{props.t("Save")}</Button>
      </>
    );
  }
)
