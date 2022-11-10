import UploadingFileModal from "../../../modal/UploadingFileModal";
import {Button, Input} from "@frontend/mobile/shared/ui";
import I18CameraSvgIcon from "../../I18CameraSvgIcon";
import React from "react";
import {
  CameraSvgIconWrapper,
  CustomPage,
  Title,
  UploadSection,
  UploadSectionImg,
  UploadSectionTitle
} from "../../common/components";

import {I18UploadPaymentReceiptPageProps} from "../I18UploadPaymentReceiptPageProps";

export const PakistanUploadPaymentReceiptPage = (props: Omit<I18UploadPaymentReceiptPageProps, "utr" | "setURT" | "validateUtr">) => {
  return (
    <CustomPage>
      {props.isUploading && <UploadingFileModal/>}

      <Title>Upload your repayment receipt(optional)</Title>

      <UploadSection>
        {!props.formFile ? (
          <div>
            <CameraSvgIconWrapper>
              <I18CameraSvgIcon/>
            </CameraSvgIconWrapper>
            <UploadSectionTitle>
              Upload from Photo Album
            </UploadSectionTitle>
            <Input
              type="file"
              id="file"
              style={{display: "none"}}
              value={props.formFile}
              onInput={(event) => props.onFileChange(event)}
            />
          </div>
        ) : (
          <UploadSectionImg imageURL={props.imageSrc ? props.imageSrc : ""}/>
        )}
      </UploadSection>
      <Button onClick={() => props.confirm()}>Confirm</Button>
    </CustomPage>
  );
}
