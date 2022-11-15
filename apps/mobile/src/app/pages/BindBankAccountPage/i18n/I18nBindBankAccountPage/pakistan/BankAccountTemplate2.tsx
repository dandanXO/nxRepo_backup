import {Form} from "../../../components/Form";
import {Button, Input, Select} from "@frontend/mobile/shared/ui";
import React, {useEffect, useState} from "react";
import {IPakistanPageLayoutTypeProps} from "../../../types/IGeneralPageLayoutTypeProps";
import {Label} from "../../../components/Label";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {BankVendor, WalletVendor} from "../../../../../api/GetBindCardDropList";

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
export const BankAccountTemplate2 = (props: IPakistanPageLayoutTypeProps) => {
  const {t} = useTranslation();

  return (
    <>
      <Form>
        <Label>{t("Cardholder Name", {ns: "bank-bind"})}</Label>

        <Input
          className="mb"
          labelType={"none"}
          placeholder={t("Cardholder Name", {ns: "bank-bind"}) as string}
          value={props.cardholderName}
          disabled
        />

        <Label>{t("IFSC Code", {ns: "bank-bind"})}</Label>
        <Select
          className="mb"
          fixButtonWidth={"calc(100vw - 36px)"}
          dataSource={props.bankDropList}
          defaultIndex={props.bankAccountValue}
          // FIXME: to controlled component
          onSelect={(index: number) => props.onIFSCDropSelect(index)}
          maxItemCount={5.5}
        />

        <Label>{t("Account Number", {ns: "bank-bind"})}</Label>
        <Input
          className="mb"
          labelType={"none"}
          placeholder={t("Account Number", {ns: "bank-bind"}) as string}
          value={props.bankcardNoData.data}
          onChange={props.onAccountNumberChange}
          onBlur={props.onAccountNumberBlur}
          errorMessage={props.bankcardNoData.errorMessage}
        />

        <Label>{t("Confirm Account Number", {ns: "bank-bind"})}</Label>
        <Input
          className="mb"
          labelType={"none"}
          placeholder={t("Confirm Account Number", {ns: "bank-bind"}) as string}
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

        <Warning>{t("Unchangeable after linked, please check before submission.", {ns: "bank-bind"})}</Warning>
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
