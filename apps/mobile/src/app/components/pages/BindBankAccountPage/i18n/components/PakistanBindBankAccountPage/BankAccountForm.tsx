import React from "react";
import styled from "styled-components";
import {withTranslation} from "react-i18next";
import {Form} from "../../../components/Form";
import {Label} from "../../../components/Label";
import {i18nBankBindAccountPage} from "../../translations";
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

export const BankAccountForm = withTranslation(i18nBankBindAccountPage.namespace)((props: IPakistanBankAccountForm)  => {
  return (
    <>
      <Form>
        <Label>{props.t("Cardholder Name")}</Label>

        <Input
          className="mb"
          labelType={"none"}
          placeholder={props.t("Cardholder Name") as string}
          value={props.cardholderName}
          disabled
        />

        <Label>{props.t("Please select your bank name")}</Label>
        <Select
          className="mb"
          fixButtonWidth={"calc(100vw - 36px)"}
          dataSource={props.bankDropList}
          defaultIndex={props.bankAccountValue}
          // FIXME: to controlled component
          onSelect={(index: number) => props.onIFSCDropSelect(index)}
          maxItemCount={5.5}
        />

        <Label>{props.t("Account Number", )}</Label>
        <Input
          className="mb"
          labelType={"none"}
          placeholder={props.t("Account Number") as string}
          value={props.bankcardNoData.data}
          onChange={props.onAccountNumberChange}
          onBlur={props.onAccountNumberBlur}
          errorMessage={props.bankcardNoData.errorMessage}
        />

        <Label>{props.t("Confirm Account Number")}</Label>
        <Input
          className="mb"
          labelType={"none"}
          placeholder={props.t("Confirm Account Number") as string}
          value={props.confirmedBankcardNoData.data}
          onChange={props.onConfirmAccountNumberChange}
          onBlur={props.onConfirmAccountNumberBlur}
          errorMessage={props.confirmedBankcardNoData.errorMessage}
        />

        <Warning>{props.t("Unchangeable after linked, please check before submission.")}</Warning>
      </Form>

      <Button onClick={() => {
        // if(!props.isFormPending && props.confirm) {
        //   console.log("request")
        props.confirm && props.confirm()
        // } else {
        //   console.log("request2")
        // }
      }}>{props.t("Save")}</Button>
    </>
  );
})
