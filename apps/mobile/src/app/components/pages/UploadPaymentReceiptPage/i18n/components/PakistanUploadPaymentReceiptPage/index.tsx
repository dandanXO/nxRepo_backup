import UploadingFileModal from "../../../modal/UploadingFileModal";
import { Button, Input } from "@frontend/mobile/shared/ui";
import I18CameraSvgIcon from "../I18CameraSvgIcon";
import React from "react";
import {
    CameraSvgIconWrapper,
    CustomPage,
    Title,
    UploadSection,
    UploadSectionImg,
    UploadSectionTitle,
} from "../common";

import { I18UploadPaymentReceiptPageProps } from "../../types/I18UploadPaymentReceiptPageProps";
import { withTranslation } from "react-i18next";
import { i18nUploadPaymentReceiptPage } from "../../translations";

export const PakistanUploadPaymentReceiptPage = withTranslation(
    i18nUploadPaymentReceiptPage.namespace
)(
    (
        props: Omit<
            I18UploadPaymentReceiptPageProps,
            "utr" | "setURT" | "validateUtr"
        >
    ) => {
        return (
            <CustomPage>
                {props.isUploading && <UploadingFileModal />}

                <Title>
                    {props.t("Upload your repayment receipt(optional)")}
                </Title>

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
    }
);
