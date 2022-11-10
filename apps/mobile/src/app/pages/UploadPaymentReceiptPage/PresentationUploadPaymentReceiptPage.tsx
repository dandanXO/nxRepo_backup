import UploadingFileModal from "./modal/UploadingFileModal";
import {Button, Input, Page} from "@frontend/mobile/shared/ui";
import {CameraSvgIcon} from "./i18n";
import React from "react";
import {PresentationPageProps} from "./pureUploadPaymentReceiptPage";
import styled from "styled-components";


const Section = styled.div`
    margin-bottom: 100px;
`;
const CustomPage = styled(Page)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Title = styled.div`
    margin-bottom: 10px;
    font-weight: 400;
    text-align: center;
`;
const UploadSection = styled.label.attrs<{ for: string }>((props) => ({
  htmlFor: "file",
}))`
    height: 183px;
    background-color: #919191;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    text-align: center;
    border-radius: 8px;
    border: 2px solid #555;
    margin-bottom: 20px;
    width: 100%;
`;

const UploadSectionImg = styled.div<{
  imageURL: string;
}>`
    width: 100%;
    background-image: ${(props) => `url(${props.imageURL})`};
    background-repeat: no-repeat;
    height: 100%;
    background-position: center;
    background-size: contain;
`;

const UploadSectionTitle = styled.div``;

const CameraSvgIconWrapper = styled.div`
    margin: 0 auto 10px;
    background: #fff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
`;


export const PresentationUploadPaymentReceiptPage = (props: PresentationPageProps) => {
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
              <CameraSvgIcon/>
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
