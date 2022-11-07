import React from "react";
import useLoanDetailStory from "../../components/useLoanDetailStory";
import { PureLoanDetailsAdvertisementPage } from "./PureLoanDetailsAdvertisementPage";
import {usePostLoanSubmitOrderMutation} from "../../api";

const LoanDetailsPage = () => {
    const {
        currentData,
        navigateToUploadPaymentReceiptPage,
        handlePostRepayCreate,
        paymentMethodList,
        setPayType,
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
            paymentMethodList={paymentMethodList}
            setPayType={setPayType}
        />
    );
};

export default LoanDetailsPage;
