import {Button, Input} from "@frontend/mobile/shared/ui";
import React from "react";
import {IGeneralPageLayoutTypeProps} from "../../../types/IGeneralPageLayoutTypeProps";
import {Form} from "../../../components/Form";
import { Paragraph } from "../../../components/Paragraph";
import {useTranslation} from "react-i18next";
import {i18nBankBindPageTranslationKey} from "../../i18nTranslations";

export const BankAccountTemplate1 = (props: IGeneralPageLayoutTypeProps) => {
  const {t} = useTranslation();
  return (
    <>
      <Form>
        <Input
          label={t("Cardholder Name", {ns: i18nBankBindPageTranslationKey.BankBindPageKey}) as string}
          value={props.cardholderName}
          disabled
        />
        <Paragraph>
          {t("For KYC, your Cardholder name and Aadhaar name should be match.", {ns: i18nBankBindPageTranslationKey.BankBindPageForIndiaKey })}
        </Paragraph>
        <Input
          className="mb"
          label={t("IFSC Code", {ns: i18nBankBindPageTranslationKey.BankBindPageKey}) as string}
          value={props.ifscData.data}
          onChange={props.onIFSCChange}
          onBlur={props.onIFSCBlur}
          errorMessage={props.ifscData.errorMessage}
        />
        <Input
          className="mb"
          label={t("Account Number", {ns: i18nBankBindPageTranslationKey.BankBindPageKey}) as string}
          value={props.bankcardNoData.data}
          onChange={props.onAccountNumberChange}
          onBlur={props.onAccountNumberBlur}
          errorMessage={props.bankcardNoData.errorMessage}
        />
        <Input
          className="mb"
          label={t("Confirm Account Number", {ns: i18nBankBindPageTranslationKey.BankBindPageKey}) as string}
          value={props.confirmedBankcardNoData.data}
          onChange={props.onConfirmAccountNumberChange}
          onBlur={props.onConfirmAccountNumberBlur}
          errorMessage={props.confirmedBankcardNoData.errorMessage}
        />
        <Input
          className="mb"
          label={t("UPI ID", {ns: i18nBankBindPageTranslationKey.BankBindPageForIndiaKey }) as string}
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
