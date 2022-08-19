import {Link} from "react-router-dom";
import Page from "../../core/components/Page";

export default () => {
    return (
        <Page>
            <div>
                <Link to="/demo">demoPage</Link>
            </div>
            <div>
                <Link to="/loan-details?token=b5f2db2c45e24edcbc49540bae862fbd">loanDetailsPage</Link>
            </div>
            <div>
                <Link to="/extend-details">extendDetailsPage</Link>
            </div>
            <div>
                <Link to="/bank-bink">UploadPaymentReceiptPage</Link>
            </div>
            <div>
                <Link to="/upload-payment-receipt">UploadPaymentReceiptPage</Link>
            </div>
        </Page>
    )
}
