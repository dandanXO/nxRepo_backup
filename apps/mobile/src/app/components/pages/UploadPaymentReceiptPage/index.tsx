import React, {useCallback} from "react";

import {useLocationOrderQueryString} from "@frontend/mobile/shared/ui";
import {useNavigate} from "react-router-dom";
import {usePostRepayReceiptMutation} from "../../../api";
import {PostRepayReceiptResponse} from "../../../api/postRepayReceipt";
import {useUploadPaymentReceipt} from "./hooks/useUploadPaymentReceipt";
import {WithTranslation, withTranslation} from "react-i18next";
import {i18nUploadPaymentReceiptPage} from "./i18n/translations";
import {IndiaCountry} from "../../../../environments/config/countries/IndiaCountry";
import {IndiaUploadPaymentReceiptPage} from "./i18n/components/IndiaUploadPaymentReceiptPage";
import {PakistanCountry} from "../../../../environments/config/countries/PakistanCountry";
import {PakistanUploadPaymentReceiptPage} from "./i18n/components/PakistanUploadPaymentReceiptPage";
import {renderByCountry} from "../../../i18n";
import * as Sentry from "@sentry/react";

export interface PostRepayReceiptRequestProps {
    formFile: any;
    orderNo: string;
    receipt: string;
    setIsUploading: any;
}

type UploadPaymentReceiptPageProps = WithTranslation;

const UploadPaymentReceiptPage = (props: UploadPaymentReceiptPageProps) => {
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
                .catch((error) => {
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

export default withTranslation(i18nUploadPaymentReceiptPage.namespace)(UploadPaymentReceiptPage);
