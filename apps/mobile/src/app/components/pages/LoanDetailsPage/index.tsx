import React from "react";
import useLoanDetailStory from "../../../hooks/useLoanDetailStory";
import { PureLoanDetailsAdvertisementPage } from "./PureLoanDetailsAdvertisementPage";
import { usePostLoanSubmitOrderMutation } from "../../../api";
import { Route, Routes, useLocation } from "react-router-dom";
import { I18nRepaymentStepsModal } from "./modal/RepaymentStepsModal";
export const STATE_REPAYMENT_STEPS = "STATE_REPAYMENT_STEPS";

const LoanDetailsPage = () => {
    const {
        currentData,
        navigateToUploadPaymentReceiptPage,
        handlePostRepayCreate,
        isRepayTypesFetching,
        paymentMethodList,
        setPayType,
    } = useLoanDetailStory();

    const [postLoanSubmitOrder, { isLoading: isPostLoanSubmitOrderLoading }] =
        usePostLoanSubmitOrderMutation();
    console.log("isPostLoanSubmitOrderLoading", isPostLoanSubmitOrderLoading);
    // const location = useLocation();
    // const showRepaymentStepsModal = location.state && location.state.name === STATE_REPAYMENT_STEPS;
    // console.log("showRepaymentStepsModal", showRepaymentStepsModal);
    return (
        <PureLoanDetailsAdvertisementPage
            currentData={currentData}
            navigateToUploadPaymentReceiptPage={
                navigateToUploadPaymentReceiptPage
            }
            handlePostRepayCreate={handlePostRepayCreate}
            postLoanSubmitOrder={postLoanSubmitOrder}
            isPostLoanSubmitOrderLoading={isPostLoanSubmitOrderLoading}
            paymentMethodList={paymentMethodList}
            isRepayTypesFetching={isRepayTypesFetching}
            setPayType={setPayType}
        />
    );
};

export default LoanDetailsPage;
