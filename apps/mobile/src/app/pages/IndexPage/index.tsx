import { Link } from "react-router-dom";
import { Page } from "@frontend/mobile/shared/ui";
import {environment} from "../../../environments/environment";
const getToken = () => `token=b5f2db2c45e24edcbc49540bae862fbd`;
const getOrderNo = () => `orderNo=no-3632791101642108-9`;
const queryString = () => `${getToken()}&${getOrderNo()}`;
const getCardholderName = () => `cardholderName=C I Riyaz Ur Rahaman`;

export default () => {
    return (
        <Page>
            <p>
              <div>Country: {environment.countryName}</div>
              <div>Environment: {environment.production ? "正式機" : "測試機"}</div>
            </p>

            <li>
                <Link
                    to={"/bank-bind?" + getToken() + "&" + getCardholderName()}
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
                <Link to={"/product-ad-modal-list?" + getToken()}>
                    ProductAdModalListPage
                </Link>
            </li>
        </Page>
    );
};
