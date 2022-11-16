import React from "react";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {Form} from "../../../components/Form";
import {Label} from "../../../components/Label";
import {i18nBankBindPageKey} from "../../translations";
import {Button, Input, Select} from "@frontend/mobile/shared/ui";
import {IPakistanBankAccountForm} from "../../types/IBankAccountForm";

const Warning = styled.div`
  margin: 0 auto;
  width: 284px;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.42;
  letter-spacing: normal;
  text-align: center;
  color: #f82626;
`;

export const BankAccountForm = (props: IPakistanBankAccountForm)  => {
  const {t} = useTranslation();

  return (
    <>
      <Form>
        <Label>{t("Cardholder Name", {ns: i18nBankBindPageKey.CommonKey})}</Label>

        <Input
          className="mb"
          labelType={"none"}
          placeholder={t("Cardholder Name", {ns: i18nBankBindPageKey.CommonKey}) as string}
          value={props.cardholderName}
          disabled
        />

        <Label>{t("Please select your bank name", {ns: i18nBankBindPageKey.PakistanKey})}</Label>
        <Select
          className="mb"
          fixButtonWidth={"calc(100vw - 36px)"}
          dataSource={props.bankDropList}
          defaultIndex={props.bankAccountValue}
          // FIXME: to controlled component
          onSelect={(index: number) => props.onIFSCDropSelect(index)}
          maxItemCount={5.5}
        />

        <Label>{t("Account Number", {ns: i18nBankBindPageKey.CommonKey})}</Label>
        <Input
          className="mb"
          labelType={"none"}
          placeholder={t("Account Number", {ns: i18nBankBindPageKey.CommonKey}) as string}
          value={props.bankcardNoData.data}
          onChange={props.onAccountNumberChange}
          onBlur={props.onAccountNumberBlur}
          errorMessage={props.bankcardNoData.errorMessage}
        />

        <Label>{t("Confirm Account Number", {ns: i18nBankBindPageKey.CommonKey})}</Label>
        <Input
          className="mb"
          labelType={"none"}
          placeholder={t("Confirm Account Number", {ns: i18nBankBindPageKey.CommonKey}) as string}
          value={props.confirmedBankcardNoData.data}
          onChange={props.onConfirmAccountNumberChange}
          onBlur={props.onConfirmAccountNumberBlur}
          errorMessage={props.confirmedBankcardNoData.errorMessage}
        />

        <Warning>{t("Unchangeable after linked, please check before submission.", {ns: i18nBankBindPageKey.CommonKey })}</Warning>
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
