import UploadingFileModal from "../../../modal/UploadingFileModal";
import { Button, Input } from "@frontend/mobile/shared/ui";
import I18CameraSvgIcon from "../I18CameraSvgIcon";
import React from "react";
import {
    CameraSvgIconWrapper,
    CustomPage,
    Section,
    Title,
    UploadSection,
    UploadSectionImg,
    UploadSectionTitle,
} from "../common";

import { I18UploadPaymentReceiptPageProps } from "../../types/I18UploadPaymentReceiptPageProps";
import { withTranslation } from "react-i18next";
import { i18nUploadPaymentReceiptPage } from "../../translations";

export const IndiaUploadPaymentReceiptPage = withTranslation(
    i18nUploadPaymentReceiptPage.namespace
)((props: I18UploadPaymentReceiptPageProps) => {
    return (
        <CustomPage>
            {props.isUploading && <UploadingFileModal />}
            <Section>
                <Input
                    inputWidth={"200px"}
                    className="mb"
                    value={props.utr.data}
                    labelType="left"
                    label={props.t("UTR") as string}
                    onChange={(event) => {
                        props.setURT({
                            ...props.utr,
                            data: event.target.value,
                        });
                    }}
                    onBlur={() => {
                        props.validateUtr();
                    }}
                    errorMessage={props.utr.errorMessage}
                />
            </Section>

            <Title>{props.t("Upload your repayment receipt(optional)")}</Title>

            <UploadSection>
                {!props.formFile ? (
                    <div>
                        <CameraSvgIconWrapper>
                            <I18CameraSvgIcon />
                        </CameraSvgIconWrapper>
                        <UploadSectionTitle>
                            {props.t("Upload from Photo Album")}
                        </UploadSectionTitle>
                        <Input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            value={props.formFile}
                            onInput={(event) => props.onFileChange(event)}
                        />
                    </div>
                ) : (
                    <UploadSectionImg
                        imageURL={props.imageSrc ? props.imageSrc : ""}
                    />
                )}
            </UploadSection>
            <Button onClick={() => props.confirm()}>
                {props.t("Confirm")}
            </Button>
        </CustomPage>
    );
});
