import React, {useCallback} from "react";

import {useLocationOrderQueryString} from "@frontend/mobile/shared/ui";
import {useNavigate} from "react-router-dom";

import {useUploadPaymentReceipt} from "./hooks/useUploadPaymentReceipt";
import {WithTranslation, withTranslation} from "react-i18next";
import {i18nUploadPaymentReceiptPage} from "./i18n/translations";
import {IndiaUploadPaymentReceiptPage} from "./i18n/components/IndiaUploadPaymentReceiptPage";
import {PakistanUploadPaymentReceiptPage} from "./i18n/components/PakistanUploadPaymentReceiptPage";

import * as Sentry from "@sentry/react";
import {renderByCountry} from "../../modules/i18n";

import {IndiaCountry} from "../../modules/country/constants/IndiaCountry";
import {PakistanCountry} from "../../modules/country/constants/PakistanCountry";
import {CustomAxiosError} from "../../api/base/axiosBaseQuery";
import {PostRepayReceiptResponse} from "../../api/old/postRepayReceipt";
import {usePostRepayReceiptMutation} from "../../../../../mobile/src/app/api";

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
    const pageQueryString = useLocationOrderQueryString();
    const goToUploadedPaymentReceiptPage = useCallback(() => {
        navigate(
            `/uploaded-payment-receipt?token=${pageQueryString.token}&orderNo=${pageQueryString.orderNo}`
        );
    }, [pageQueryString.token, pageQueryString.orderNo]);
    const postRepayReceiptRequest = useCallback(
        (props: PostRepayReceiptRequestProps) => {
            // NOTICE: impure
            const formData = new FormData();
            if(props.formFile) formData.append("file", props.formFile);
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
                  if(err) error.message = JSON.stringify(err)
                  Sentry.captureException(error);
                })
                .finally(() => {
                    props.setIsUploading(false);
                });
        },
        []
    );

  const {
    isUploading,
    utr,
    setURT,
    validateUtr,
    formFile,
    onFileChange,
    imageSrc,
    confirm,
  } = useUploadPaymentReceipt({
    postRepayReceiptRequest,
    token: pageQueryString.token ? pageQueryString.token : "",
    orderNo: pageQueryString.orderNo ? pageQueryString.orderNo : "",
  });

  return renderByCountry({
    [IndiaCountry.country]: (
      <IndiaUploadPaymentReceiptPage isUploading={isUploading} utr={utr} setURT={setURT} validateUtr={validateUtr} formFile={formFile} onFileChange={onFileChange} imageSrc={imageSrc} confirm={confirm}/>
    ),
    [PakistanCountry.country]: (
      <PakistanUploadPaymentReceiptPage isUploading={isUploading} formFile={formFile} onFileChange={onFileChange} imageSrc={imageSrc} confirm={confirm}/>
    ),
  }, (
    <PakistanUploadPaymentReceiptPage isUploading={isUploading} formFile={formFile} onFileChange={onFileChange} imageSrc={imageSrc} confirm={confirm}/>
  ))
};

export const UploadPaymentReceiptPage = withTranslation(i18nUploadPaymentReceiptPage.namespace)(Uni18nUploadPaymentReceiptPage);
