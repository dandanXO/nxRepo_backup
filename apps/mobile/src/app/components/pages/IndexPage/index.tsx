import { Link } from "react-router-dom";
import { Page } from "@frontend/mobile/shared/ui";
import {environment} from "../../../../environments/environment";
import {useTranslation} from "react-i18next";
import styled from "styled-components";

const getToken = () => {
  if(environment.country === "in") {
    return `b5f2db2c45e24edcbc49540bae862fbd`
  } else if (environment.country == "pk") {
    return `8c63e92475854c7baf2a64734a036b2b`
  } else if(environment.country == "bn") {
    return `dbb501e9b49d4a69bf8a7b3a3de85e06`
  }
};
const getOrderNo = () => {
  if(environment.country === "in") {
    return `no-3632791101642108-9`;
  } else if (environment.country == "pk") {
    return `no-1816320407159254`;
  } else if(environment.country == "bn") {
    return `no-953565457571651`
  }
}

const queryString = () => `token=${getToken()}&orderNo=${getOrderNo()}`;
const getCardholderName = () => `cardholderName=C I Riyaz Ur Rahaman`;

const IndexPage = styled(Page)`
  user-select: text;
`;
export default () => {
    const { t } = useTranslation();
    return (
        <IndexPage>
            <p>
              <div>{t('Welcome to Mobile', {ns: "common"})}</div>

              <hr/>

              <div>
                <div>App Info</div>
                <div>Commit Hash: {appInfo.COMMITHASH}</div>
                <div>Version: {appInfo.VERSION}</div>
                <div>BRANCH: {appInfo.BRANCH}</div>
              </div>

              <hr/>

              <div>Country: {environment.countryName}</div>
              <div>Environment: {environment.production ? "正式機" : "測試機"}</div>
              <div>Language: {environment.language}</div>

              <hr/>

              <div>開發模式的 Proxy 得由 project.json 進行設定。</div>
              <div>"proxyConfig": "apps/mobile/proxy.config.pk.json"</div>

            </p>
            <button onClick={() => {
              window.open("http://localhost:4003/?showtranslations", "_blank");
            }}>showtranslations</button>

            <li>
              <Link to={"/activity-list"}>ActivityAdList</Link>
            </li>

            <li>
              <Link to={"/activity-list-dev"}>(DEV)ActivityAdList</Link>
            </li>

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
        </IndexPage>
    );
};
