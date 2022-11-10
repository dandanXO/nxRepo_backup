import React, {useCallback} from "react";
import styled from "styled-components";
import {Page, useLocationOrderQueryString} from "@frontend/mobile/shared/ui";
import {useNavigate} from "react-router-dom";
import {usePostRepayReceiptMutation} from "../../api";
import {PostRepayReceiptResponse} from "../../api/postRepayReceipt";
import {usePureUploadPaymentReceiptPage} from "./pureUploadPaymentReceiptPage";
import {PresentationUploadPaymentReceiptPage} from "./PresentationUploadPaymentReceiptPage";


export interface PostRepayReceiptRequestProps {
    formFile: any;
    orderNo: string;
    receipt: string;
    setIsUploading: any;
}
const UploadPaymentReceiptPage = () => {
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
            formData.append("file", props.formFile);
            formData.append("orderNo", props.orderNo);
            formData.append("receipt", props.receipt);

            postRepayReceipt(formData)
                .unwrap()
                .then((data: PostRepayReceiptResponse) => {
                    goToUploadedPaymentReceiptPage();
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
  } = usePureUploadPaymentReceiptPage({
    postRepayReceiptRequest,
    token: pageQueryString.token ? pageQueryString.token : "",
    orderNo: pageQueryString.orderNo ? pageQueryString.orderNo : "",
  });
    return (
      <PresentationUploadPaymentReceiptPage isUploading={isUploading} utr={utr} setURT={setURT} validateUtr={validateUtr} formFile={formFile} onFileChange={onFileChange} imageSrc={imageSrc} confirm={confirm}/>
    );
};
export default UploadPaymentReceiptPage;
