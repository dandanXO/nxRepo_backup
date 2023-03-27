import { Button, Input } from "@frontend/mobile/shared/ui";
import React from "react";
import { IIndiaBankAccountForm } from "../../types/IBankAccountForm";
import { Form } from "../../../components/Form";
import { Paragraph } from "../../../components/Paragraph";
import { useTranslation } from "react-i18next";
import { i18nBankBindAccountPage } from "../../translations";

export const BankAccountForm = (props: IIndiaBankAccountForm) => {
    const { t } = useTranslation(i18nBankBindAccountPage.namespace)
    return (
        <>
            <Form>
                <Paragraph className="text-sm">
                    {t("For KYC, your Cardholder name and Aadhaar name should be match.")}
                </Paragraph>
                <Input
                    label={t("Cardholder Name") as string}
                    value={props.cardholderName}
                    disabled
                />
                <Input
                    className="mb"
                    label={t("IFSC Code") as string}
                    value={props.ifscData.data}
                    onChange={props.onIFSCChange}
                    onBlur={props.onIFSCBlur}
                    errorMessage={props.ifscData.errorMessage}
                />
                <Input
                    className="mb"
                    label={t("Account Number") as string}
                    value={props.bankcardNoData.data}
                    onChange={props.onAccountNumberChange}
                    onBlur={props.onAccountNumberBlur}
                    errorMessage={props.bankcardNoData.errorMessage}
                />
                <Input
                    className="mb"
                    label={t("Confirm Account Number") as string}
                    value={props.confirmedBankcardNoData.data}
                    onChange={props.onConfirmAccountNumberChange}
                    onBlur={props.onConfirmAccountNumberBlur}
                    errorMessage={props.confirmedBankcardNoData.errorMessage}
                />
                <Input
                    className="mb"
                    label={t("UPI ID") as string}
                    value={props.upiData.data}
                    onChange={props.onUPIIDChange}
                />
            </Form>
            <Button onClick={() => { !props.isFormPending && props.confirm() }}>{t("Save")}</Button>
        </>
    );
}
