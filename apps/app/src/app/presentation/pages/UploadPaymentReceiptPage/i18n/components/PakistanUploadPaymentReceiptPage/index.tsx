import UploadingFileModal from "../../../modal/UploadingFileModal";
import {Button, Input} from "@frontend/mobile/shared/ui";
import I18CameraSvgIcon from "../I18CameraSvgIcon";
import React from "react";
import {
  CameraSvgIconWrapper,
  CustomPage,
  Title,
  UploadSection,
  UploadSectionImg,
  UploadSectionTitle
} from "../common";

import {I18UploadPaymentReceiptPageProps} from "../../types/I18UploadPaymentReceiptPageProps";
import {withTranslation} from "react-i18next";
import {i18nUploadPaymentReceiptPage} from "../../translations";

export const PakistanUploadPaymentReceiptPage = withTranslation(i18nUploadPaymentReceiptPage.namespace)((props: Omit<I18UploadPaymentReceiptPageProps, "utr" | "setURT" | "validateUtr">) => {

    return (
      <CustomPage>
        {props.isUploading && <UploadingFileModal/>}

        <div className="text-sm text-left mb-2">{props.t("Upload your repayment receipt(optional)")}</div>

        <div className="bg-[#F8F8F8] border-dashed border border-[#B7BBC5] h-[183px] flex justify-center items-center rounded-lg mb-4">
          {!props.formFile ? (
            <div className="flex flex-col justify-center items-center">
              <div>
                <I18CameraSvgIcon/>
              </div>
              <div className="text-sm mt-2 text-[#6B738A]">
                {props.t("Click to upload")}
              </div>
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
        </div>
        <Button onClick={() => props.confirm()}>{props.t("Confirm")}</Button>
      </CustomPage>
    );
  }
)
