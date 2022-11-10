import { AppThemeProvider } from "@frontend/mobile/shared/ui";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  PresentationPageProps,
  usePureUploadPaymentReceiptPage
} from "./pureUploadPaymentReceiptPage";
import {InputValue} from "../../core/types/InputValue";
import React from "react";
import {PresentationUploadPaymentReceiptPage} from "./PresentationUploadPaymentReceiptPage";

export default {
    title: "Page/UploadPaymentReceiptPage",
    component: PresentationUploadPaymentReceiptPage,
} as ComponentMeta<typeof PresentationUploadPaymentReceiptPage>;

export const Page: ComponentStory<typeof PresentationUploadPaymentReceiptPage> = () => {
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
    postRepayReceiptRequest: () => {
      // do nothing.
    },
    token: "",
    orderNo: "123",
  });

    return (
        <AppThemeProvider>
            <PresentationUploadPaymentReceiptPage isUploading={isUploading} utr={utr} setURT={setURT} validateUtr={validateUtr} formFile={formFile} onFileChange={onFileChange} imageSrc={imageSrc} confirm={confirm}/>
        </AppThemeProvider>
    );
};
