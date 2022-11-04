import React from "react";
import useLoanDetailStory from "../../components/useLoanDetailStory";
import { PureLoanDetailsAdvertisementPage } from "./PureLoanDetailsAdvertisementPage";
import {usePostLoanSubmitOrderMutation} from "../../api";

const LoanDetailsPage = () => {
    const {
        currentData,
        navigateToUploadPaymentReceiptPage,
        handlePostRepayCreate,
    } = useLoanDetailStory();

  const [postLoanSubmitOrder, { isLoading }] =
    usePostLoanSubmitOrderMutation();

    return (
        <PureLoanDetailsAdvertisementPage
            currentData={currentData}
            navigateToUploadPaymentReceiptPage={
                navigateToUploadPaymentReceiptPage
            }
            handlePostRepayCreate={handlePostRepayCreate}
            postLoanSubmitOrder={postLoanSubmitOrder}
        />
    );
};

export default LoanDetailsPage;
