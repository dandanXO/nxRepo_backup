import React from "react";
import useLoanDetailStory from "../../components/useLoanDetailStory";
import {PureLoanDetailsAdvertisementPage} from "./PureLoanDetailsAdvertisementPage";

const LoanDetailsPage = () => {
    const {
        currentData,
        navigateToUploadPaymentReceiptPage,
        handlePostRepayCreate,
    } = useLoanDetailStory();
    return (
        <PureLoanDetailsAdvertisementPage
            currentData={currentData}
            navigateToUploadPaymentReceiptPage={
                navigateToUploadPaymentReceiptPage
            }
            handlePostRepayCreate={handlePostRepayCreate}
        />
    );
};

export default LoanDetailsPage;
