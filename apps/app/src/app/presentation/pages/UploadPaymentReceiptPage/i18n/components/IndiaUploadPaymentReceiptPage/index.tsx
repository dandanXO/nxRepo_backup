import UploadingFileModal from "../../../modal/UploadingFileModal";
import { Button, Input } from "@frontend/mobile/shared/ui";
import I18CameraSvgIcon from "../I18CameraSvgIcon";
import React from "react";
import {
    CameraSvgIconWrapper,
    CustomPage,
    UploadSection,
    UploadSectionImg,
    UploadSectionTitle
} from "../common";

import { I18UploadPaymentReceiptPageProps } from "../../types/I18UploadPaymentReceiptPageProps";
import { withTranslation } from "react-i18next";
import { i18nUploadPaymentReceiptPage } from "../../translations";
import { Navigation } from "../../../../../components/layouts/Navigation";
import { useNavigate } from "react-router";
import {Page} from "../../../../../components/layouts/Page";
import {isInAndroid} from "../../../../../../modules/window/isInAndroid";

export const IndiaUploadPaymentReceiptPage = withTranslation(i18nUploadPaymentReceiptPage.namespace)((props: I18UploadPaymentReceiptPageProps) => {
    const navigate = useNavigate();
    return (
        <Page>
            {!isInAndroid() && <Navigation title={"Upload payment receipt"} back={() => { navigate(-1) }} />}

            {props.isUploading && <UploadingFileModal />}

            <div className={"px-4"}>
              <div className={`mb-8`}>
                <Input
                  inputWidth={"200px"}
                  className="mb"
                  value={props.utr.data}
                  labelType="left"
                  label={props.t("UTR") as string}
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
              </div>
              <div className={`text-left font-bold text-sm mb-1`}>{props.t("Upload your repayment receipt(optional)")}</div>

                <UploadSection>
                    {!props.formFile ? (
                        <div>
                            <CameraSvgIconWrapper>
                                <I18CameraSvgIcon />
                            </CameraSvgIconWrapper>
                            <UploadSectionTitle>
                                {props.t("Upload from Photo Album")}
                            </UploadSectionTitle>
                        </div>) 
                        : <img src={props.imageSrc ? props.imageSrc : ""} className={'h-[181px]'} alt="" />
                    }
                    <Input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                        value={''}
                        onInput={(event) => props.onFileChange(event)}
                    />

                </UploadSection>

              <div className="my-2 text-red-500">{props.fileErrorMessage}</div>
              <Button onClick={() => props.confirm()}>{"Confirm"}</Button>

            </div>
        </Page>
    );
})
