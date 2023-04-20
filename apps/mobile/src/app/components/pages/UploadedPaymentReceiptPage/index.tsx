import {useNavigate} from "react-router-dom";
import {useLocationOrderQueryString} from "@frontend/mobile/shared/ui";
import {useCallback} from "react";
import {PureUploadedPaymentReceiptPage} from "./PureUploadedPaymentReceiptPage";


const UploadedPaymentReceiptPage = () => {
    const navigate = useNavigate();
    const pageQueryString = useLocationOrderQueryString();
    const navigateToLoanDetails = useCallback(() => {
        navigate(`/loan-details?token=${pageQueryString.token}&orderNo=${pageQueryString.orderNo}`);
    }, [pageQueryString.token, pageQueryString.orderNo]);

    return (
        <PureUploadedPaymentReceiptPage
            navigateToLoanDetails={navigateToLoanDetails}
        />
    );
};

export default UploadedPaymentReceiptPage;
