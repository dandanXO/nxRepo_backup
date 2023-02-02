import {Form} from "../../../components/Form";
import {Button, Input, InputValue, Select} from "@frontend/mobile/shared/ui";
import React from "react";
import {Label} from "../../../components/Label";
import {useTranslation, WithTranslation, withTranslation} from "react-i18next";
import {i18nBankBindAccountPage} from "../../translations";
import styled from "styled-components";

const WalletDiscountHint = styled.div`
  height: 23px;
  line-height: 23px;
  background: #fff3b2;
  color: #31a843;
  font-size: 12px;
  padding: 4px 20px;
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
      <WalletDiscountHint>Get an interest rate discount on Jazzcash!</WalletDiscountHint>
      <Label>{t("Your mobile wallet account")}</Label>
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

