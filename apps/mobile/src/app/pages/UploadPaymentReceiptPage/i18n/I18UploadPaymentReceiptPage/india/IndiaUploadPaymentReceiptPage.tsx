import UploadingFileModal from "../../../modal/UploadingFileModal";
import {Button, Input} from "@frontend/mobile/shared/ui";
import I18CameraSvgIcon from "../../I18CameraSvgIcon";
import React from "react";
import {
  CameraSvgIconWrapper,
  CustomPage,
  Section,
  Title,
  UploadSection,
  UploadSectionImg,
  UploadSectionTitle
} from "../../common/components";

import {I18UploadPaymentReceiptPageProps} from "../I18UploadPaymentReceiptPageProps";


export const IndiaUploadPaymentReceiptPage = (props: I18UploadPaymentReceiptPageProps) => {
  return (
    <CustomPage>
      {props.isUploading && <UploadingFileModal/>}
      <Section>
        <Input
          inputWidth={"200px"}
          className="mb"
          value={props.utr.data}
          labelType="left"
          label="UTR"
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
              // onChange={(event) => onFileChange(event)}
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
