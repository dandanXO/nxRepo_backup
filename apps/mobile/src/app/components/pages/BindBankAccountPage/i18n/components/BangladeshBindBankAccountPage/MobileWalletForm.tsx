import { Form } from "../../../components/Form";
import { Button, Input, InputValue, Select } from "@frontend/mobile/shared/ui";
import React from "react";
import { Label } from "../../../components/Label";
import {
    useTranslation,
    WithTranslation,
    withTranslation,
} from "react-i18next";
import { i18nBankBindAccountPage } from "../../translations";

type IMobileWalletForm = {
    // Mobile
    mobileData: InputValue<string>;
    onMobileDataChange: (event: any) => void;
    validateMobileWalletAccount: (event: any) => void;

    // confirmedMobileData
    confirmedMobileData: InputValue<string>;
    onConfirmedMobileDataChange: (event: any) => void;
    onConfirmedMobileDataBlur: (event: any) => void;

    // Form
    isFormPending: boolean;
    confirm: () => void;
};

export const MobileWalletForm = (props: IMobileWalletForm) => {
    const { t } = useTranslation(i18nBankBindAccountPage.namespace);
    return (
        <Form>
            <Label>{t("Your mobile wallet number")}</Label>
            <Input
                className="mb"
                labelType={"left"}
                label={"+880"}
                placeholder={t("Wallet Account Number") as string}
                value={props.mobileData.data}
                onChange={props.onMobileDataChange}
                onBlur={props.validateMobileWalletAccount}
                errorMessage={props.mobileData.errorMessage}
            />

            <Label>{t("Confirm your number")}</Label>
            <Input
                className="mb"
                labelType={"left"}
                label={"+880"}
                placeholder={t("Wallet Account Number") as string}
                value={props.confirmedMobileData.data}
                onChange={props.onConfirmedMobileDataChange}
                onBlur={props.onConfirmedMobileDataBlur}
                errorMessage={props.confirmedMobileData.errorMessage}
            />

            {/*<Button onClick={() => !props.isFormPending && props.confirm()}>Submit</Button>*/}
            <Button onClick={() => !props.isFormPending && props.confirm()}>
                {t("Save")}
            </Button>
        </Form>
    );
};
