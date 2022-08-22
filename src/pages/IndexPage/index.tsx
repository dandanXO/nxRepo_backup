import {Link} from "react-router-dom";
import Page from "../../core/components/Page";

const queryString = "token=b5f2db2c45e24edcbc49540bae862fbd&orderNo=no-7864747613693247";
export default () => {
    return (
        <Page>
            <div>
                <Link to="/demo">demoPage</Link>
            </div>
            <div>
                <Link to={"/loan-details?" + queryString}>loanDetailsPage</Link>
            </div>
            <div>
                <Link to="/extend-details">extendDetailsPage</Link>
            </div>
            <div>
                <Link to="/bank-bind">bank-bind</Link>
            </div>
            <div>
                <Link to={"/upload-payment-receipt?" + queryString}>UploadPaymentReceiptPage</Link>
            </div>
            <div>
                <Link to="/uploaded-payment-receipt">UploadedPaymentReceiptPage</Link>
            </div>
        </Page>
    )
}
