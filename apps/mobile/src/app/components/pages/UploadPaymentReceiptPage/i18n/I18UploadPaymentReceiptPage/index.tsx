import React from "react";
import {IndiaCountry} from "../../../../../../environments/countries/IndiaCountry";
import {PakistanCountry} from "../../../../../../environments/countries/PakistanCountry";
import {environment} from "../../../../../../environments/environment";
import {IndiaUploadPaymentReceiptPage} from "./india/IndiaUploadPaymentReceiptPage";
import {PakistanUploadPaymentReceiptPage} from "./pakistan/PakistanUploadPaymentReceiptPage";
import {I18UploadPaymentReceiptPageProps} from "./I18UploadPaymentReceiptPageProps";

const renderComponentByCountry = (props: {
  [country: string]: React.ReactElement
}) => {
  const countryComponentKey = Object.keys(props).filter(item => item === environment.country)[0];
  return props[countryComponentKey];
}

export const I18UploadPaymentReceiptPage = (props: I18UploadPaymentReceiptPageProps) => {
  return renderComponentByCountry({
    [IndiaCountry.country]: <IndiaUploadPaymentReceiptPage {...props}/>,
    [PakistanCountry.country]: <PakistanUploadPaymentReceiptPage {...props}/>,
  })
}
