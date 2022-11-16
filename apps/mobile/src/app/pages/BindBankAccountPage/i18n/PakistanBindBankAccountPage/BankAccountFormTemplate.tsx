import React from "react";
import {
  IUseBindBankAccountPage,
} from "../types/IUseBindBankAccountPage";
import {useBindBankAccountPage} from "../hooks/useBindBankAccountPage";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {Form} from "../../components/Form";
import {Label} from "../../components/Label";
import {i18nBankBindPageKey} from "../i18nTranslations";
import {Button, Input, Select} from "@frontend/mobile/shared/ui";

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


export const BankAccountFormTemplate = (props: IUseBindBankAccountPage & {
  disable: boolean;
  bindCardDropListData: any;
}) => {
  const {t} = useTranslation();

  // NOTICE: REFACTOR ME
  const {
    // ifscData,
    // onIFSCChange,
    // onIFSCBlur,
    bankcardNoData,
    bankDropList,
    bankAccountValue,
    onIFSCDropSelect,
    onAccountNumberChange,
    onAccountNumberBlur,
    confirmedBankcardNoData,
    onConfirmAccountNumberChange,
    onConfirmAccountNumberBlur,
    // upiData,
    // onUPIIDChange,
    isFormPending,
    confirm
  } = useBindBankAccountPage(props);

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
          dataSource={bankDropList}
          defaultIndex={bankAccountValue}
          // FIXME: to controlled component
          onSelect={(index: number) => onIFSCDropSelect(index)}
          maxItemCount={5.5}
        />

        <Label>{t("Account Number", {ns: i18nBankBindPageKey.CommonKey})}</Label>
        <Input
          className="mb"
          labelType={"none"}
          placeholder={t("Account Number", {ns: i18nBankBindPageKey.CommonKey}) as string}
          value={bankcardNoData.data}
          onChange={onAccountNumberChange}
          onBlur={onAccountNumberBlur}
          errorMessage={bankcardNoData.errorMessage}
        />

        <Label>{t("Confirm Account Number", {ns: i18nBankBindPageKey.CommonKey})}</Label>
        <Input
          className="mb"
          labelType={"none"}
          placeholder={t("Confirm Account Number", {ns: i18nBankBindPageKey.CommonKey}) as string}
          value={confirmedBankcardNoData.data}
          onChange={onConfirmAccountNumberChange}
          onBlur={onConfirmAccountNumberBlur}
          errorMessage={confirmedBankcardNoData.errorMessage}
        />

        <Warning>{t("Unchangeable after linked, please check before submission.", {ns: i18nBankBindPageKey.CommonKey })}</Warning>
      </Form>

      <Button onClick={() => {
        // if(!props.isFormPending && props.confirm) {
        //   console.log("request")
        confirm && confirm()
        // } else {
        //   console.log("request2")
        // }
      }}>Submit</Button>
    </>
  );
}
