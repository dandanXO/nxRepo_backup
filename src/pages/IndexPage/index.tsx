import { Link } from "react-router-dom";
import Page from "../../core/components/Page";

const getToken = () => `token=b5f2db2c45e24edcbc49540bae862fbd`;
const getOrderNo = () => `orderNo=no-3632791101642108-9`;
const queryString = () => `${getToken()}&${getOrderNo()}`;
const getCardholderName = () => `cardholderName=C I Riyaz Ur Rahaman`;

export default () => {
    return (
        <Page>
            <div>
                <Link
                    to={"/bank-bind?" + getToken() + "&" + getCardholderName()}
                >
                    bank-bind
                </Link>
            </div>
            <div>
                <Link to={"/loan-details?" + queryString()}>
                    loanDetailsPage
                </Link>
            </div>
            <div>
                <Link to={"/extend-details?" + queryString()}>
                    extendDetailsPage
                </Link>
            </div>
            <div>
                <Link to={"/upload-payment-receipt?" + queryString()}>
                    UploadPaymentReceiptPage
                </Link>
            </div>
            <div>
                <Link to="/uploaded-payment-receipt">
                    UploadedPaymentReceiptPage
                </Link>
            </div>
        </Page>
    );
};
