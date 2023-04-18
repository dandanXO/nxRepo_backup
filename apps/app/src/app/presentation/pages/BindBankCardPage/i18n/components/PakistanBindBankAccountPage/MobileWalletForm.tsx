import {Form} from "../../../components/Form";
import {Button, Input, InputValue, Select} from "@frontend/mobile/shared/ui";
import React from "react";
import {Label} from "../../../components/Label";
import {useTranslation, WithTranslation, withTranslation} from "react-i18next";
import {i18nBankBindAccountPage} from "../../translations";
import styled from "styled-components";

const WalletDiscountHint = styled.div`
  line-height: 23px;
  background: #fff3b2;
  color: #31a843;
  font-size: 16px;
  padding: 4px 12px;
  margin-bottom: 17px;
`

type IMobileWalletForm = {
  // Wallet List
  walletDropList: any;
  walletValue: number;
  setWalletValue: any;
  // Wallet Account
  mobileData: InputValue<string>;
  onMobileDataChange: (event: any) => void;
  validateMobileWalletAccount: (event: any) => void;
  // Form
  isFormPending: boolean;
  confirm: () => void;
  iBanData: InputValue<string>;
  onIBanChange: (event: any) => void;
  onIbanBlur: (event: any) => void;
};

export const MobileWalletForm = (props: IMobileWalletForm) => {
  const {t} = useTranslation(i18nBankBindAccountPage.namespace);
  return (
    <Form>
      <Label>{t("Please select the of your mobile wallet")}</Label>
      <Select
        className="mb"
        fixButtonWidth={"calc(100vw - 36px)"}
        dataSource={props.walletDropList}
        defaultIndex={props.walletValue}
        // FIXME: to controlled component
        onSelect={(index:number) => {
          props.setWalletValue(index);
        }}
      />
      <WalletDiscountHint>NEWS : Faster arrival & better discount by using Jazzcash!</WalletDiscountHint>
      <Label>{t("Select a mobile wallet")}</Label>
      <Label>{t('Your IBAN Number (24 digits)')}</Label>
        <Input
          className="mb"
          labelType={'none'}
          placeholder={'Ex. PK36FTBK0000111123456702'}
          value={props.iBanData.data}
          onChange={props.onIBanChange}
          onBlur={props.onIbanBlur}
          errorMessage={props.iBanData.errorMessage}
        />
      <Input
        className="mb"
        labelType={"left"}
        label={"+92"}
        placeholder={t("Wallet Account Number") as string}
        value={props.mobileData.data}
        onChange={props.onMobileDataChange}
        onBlur={props.validateMobileWalletAccount}
        errorMessage={props.mobileData.errorMessage}
      />
      {/*<Button onClick={() => !props.isFormPending && props.confirm()}>Submit</Button>*/}
      <Button
        onClick={() => props.confirm()}
      >
        {t("Save")}
      </Button>
    </Form>
  );
}

