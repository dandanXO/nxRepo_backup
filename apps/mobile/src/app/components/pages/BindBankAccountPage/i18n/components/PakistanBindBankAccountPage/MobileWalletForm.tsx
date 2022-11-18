import {Form} from "../../../components/Form";
import {Button, Input, InputValue, Modal, Select} from "@frontend/mobile/shared/ui";
import React, {useCallback, useEffect, useState} from "react";
import {Label} from "../../../components/Label";
import {z} from "zod";
import {WalletVendor} from "../../../../../../api/GetBindCardDropList";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import {i18nBankBindPageKey} from "../../translations";


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
  confirmMobileWalletCallback: () => void;
}

export const MobileWalletForm = (props: IMobileWalletForm) => {

  const {t} = useTranslation();

  return (
    <Form>
      <Label>{t("Please select the of your mobile wallet", { ns: i18nBankBindPageKey.PakistanKey })}</Label>
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

      <Label>{t("Your mobile wallet account", { ns: i18nBankBindPageKey.PakistanKey })}</Label>
      <Input
        className="mb"
        labelType={"left"}
        label={"+92"}
        placeholder={t("Wallet Account Number", { ns: i18nBankBindPageKey.PakistanKey }) as string}
        value={props.mobileData.data}
        onChange={props.onMobileDataChange}
        onBlur={props.validateMobileWalletAccount}
        errorMessage={props.mobileData.errorMessage}
      />
      {/*<Button onClick={() => !props.isFormPending && props.confirm()}>Submit</Button>*/}
      <Button
        onClick={() => !props.isFormPending && props.confirmMobileWalletCallback()}
      >
        {t("Submit", {ns: i18nBankBindPageKey.CommonKey})}
      </Button>
    </Form>
  );
}
