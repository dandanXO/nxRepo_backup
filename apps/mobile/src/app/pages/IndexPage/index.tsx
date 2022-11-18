import { Link } from "react-router-dom";
import { Page } from "@frontend/mobile/shared/ui";
import {environment} from "../../../environments/environment";
import {useTranslation} from "react-i18next";
const getToken = () => {
  if(environment.country === "in") {
    return `b5f2db2c45e24edcbc49540bae862fbd`
  } else if (environment.country == "pk") {
    return `d5f794a6f0fa419da6ae65cb85b07c1c`
  }
};
const getOrderNo = () => {
  if(environment.country === "in") {
    return `no-3632791101642108-9`;
  } else if (environment.country == "pk") {
    return `no-1816320407159254`;
  }
}

const queryString = () => `token=${getToken()}&orderNo=${getOrderNo()}`;
const getCardholderName = () => `cardholderName=C I Riyaz Ur Rahaman`;

export default () => {
    const { t } = useTranslation();
    return (
        <Page>
            <p>
              <div>{t('Welcome to Mobile', {ns: "common"})}</div>
              <div>Country: {environment.countryName}</div>
              <div>Environment: {environment.production ? "正式機" : "測試機"}</div>
            </p>
            <button onClick={() => {
              window.open("http://localhost:4003/?showtranslations", "_blank");
            }}>showtranslations</button>
            <li>
                <Link
                    to={"/bank-bind?token=" + getToken() + "&" + getCardholderName()}
                >
                    bank-bind
                </Link>
            </li>
            <li>
                <Link to={"/loan-details?" + queryString()}>
                    loanDetailsPage
                </Link>
            </li>
            <li>
                <Link to={"/extend-details?" + queryString()}>
                    extendDetailsPage
                </Link>
            </li>
            <li>
                <Link to={"/upload-payment-receipt?" + queryString()}>
                    UploadPaymentReceiptPage
                </Link>
            </li>
            <li>
                <Link to="/uploaded-payment-receipt">
                    UploadedPaymentReceiptPage
                </Link>
            </li>
            <li>
                <Link to={"/product-ad-modal-list?token=" + getToken()}>
                    ProductAdModalListPage
                </Link>
            </li>
        </Page>
    );
};
