import React, { useCallback } from "react";

import { useLocationOrderQueryString } from "@frontend/mobile/shared/ui";
import { useNavigate, useLocation } from "react-router";

import { useUploadPaymentReceipt } from "./hooks/useUploadPaymentReceipt";
import { WithTranslation, withTranslation } from "react-i18next";
import { i18nUploadPaymentReceiptPage } from "./i18n/translations";
import { IndiaUploadPaymentReceiptPage } from "./i18n/components/IndiaUploadPaymentReceiptPage";
import { PakistanUploadPaymentReceiptPage } from "./i18n/components/PakistanUploadPaymentReceiptPage";

import * as Sentry from "@sentry/react";
import { renderByCountry } from "../../../modules/i18n";

import { IndiaCountry } from "../../../../../../../libs/shared/domain/src/country/IndiaCountry";
import { PakistanCountry } from "../../../../../../../libs/shared/domain/src/country/PakistanCountry";
import { CustomAxiosError } from "../../../api/rtk/axiosBaseQuery";
import { usePostRepayReceiptMutation } from "../../../api/rtk";
import {PostRepayReceiptResponse} from "../../../api/rtk/old/PostRepayReceiptResponse";
import {AppFlag} from "../../../../environments/flag";
import {getOrderNo} from "../../../modules/location/getOrderNo";
export interface PostRepayReceiptRequestProps {
    formFile: any;
    orderNo: string;
    receipt: string;
    setIsUploading: any;
}

type UploadPaymentReceiptPageProps = WithTranslation;

const Uni18nUploadPaymentReceiptPage = (props: UploadPaymentReceiptPageProps) => {
    const [postRepayReceipt, { isLoading }] = usePostRepayReceiptMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const pageQueryString = useLocationOrderQueryString();
    console.log("pageQueryString", pageQueryString);

    const goToUploadedPaymentReceiptPage = useCallback(() => {
        navigate(
            `/v2/uploaded-payment-receipt?token=${pageQueryString.token}&orderNo=${getOrderNo()}`
        );
    }, [pageQueryString.token, location.state.orderNo]);

    const postRepayReceiptRequest = useCallback(
        (props: PostRepayReceiptRequestProps) => {
            // NOTICE: impure
            const formData = new FormData();
            if (props.formFile) formData.append("file", props.formFile);
            formData.append("orderNo", props.orderNo);
            formData.append("receipt", props.receipt);

            postRepayReceipt(formData)
                .unwrap()
                .then((data: PostRepayReceiptResponse) => {
                    goToUploadedPaymentReceiptPage();
                })
                .catch((err: CustomAxiosError) => {
                    const error = new Error();
                    error.name = "postRepayReceipt"
                    if (err) error.message = JSON.stringify(err)
                    if(AppFlag.enableSentry) {
                      Sentry.captureException(error);
                    }
                })
                .finally(() => {
                    props.setIsUploading(false);

                });
        }, []);

    const {
        isUploading,
        utr,
        setURT,
        validateUtr,
        formFile,
        onFileChange,
        imageSrc,
        confirm,
        fileErrorMessage,
    } = useUploadPaymentReceipt({
        postRepayReceiptRequest,
        token: pageQueryString.token ? pageQueryString.token : "",
        // TODO: 先兼容
        orderNo: pageQueryString.orderNo || location.state.orderNo || "",
    });

    return renderByCountry({
        [IndiaCountry.country]: (
            <IndiaUploadPaymentReceiptPage isUploading={isUploading} utr={utr} setURT={setURT} validateUtr={validateUtr} formFile={formFile} onFileChange={onFileChange} imageSrc={imageSrc} confirm={confirm} fileErrorMessage={fileErrorMessage}/>
        ),
        [PakistanCountry.country]: (
            <PakistanUploadPaymentReceiptPage isUploading={isUploading} formFile={formFile} onFileChange={onFileChange} imageSrc={imageSrc} confirm={confirm} fileErrorMessage={fileErrorMessage}/>
        ),
    }, (
        <IndiaUploadPaymentReceiptPage isUploading={isUploading} utr={utr} setURT={setURT} validateUtr={validateUtr} formFile={formFile} onFileChange={onFileChange} imageSrc={imageSrc} confirm={confirm} fileErrorMessage={fileErrorMessage}/>
        // <PakistanUploadPaymentReceiptPage isUploading={isUploading} formFile={formFile} onFileChange={onFileChange} imageSrc={imageSrc} confirm={confirm}/>
    ))
};

export default withTranslation(i18nUploadPaymentReceiptPage.namespace)(Uni18nUploadPaymentReceiptPage);
