import React from "react";
import useLoanDetailStory from "../../../hooks/useLoanDetailStory";
import { PureLoanDetailsAdvertisementPage } from "./PureLoanDetailsAdvertisementPage";
import {usePostLoanSubmitOrderMutation} from "../../../api";

const LoanDetailsPage = () => {
    const {
        currentData,
        navigateToUploadPaymentReceiptPage,
        handlePostRepayCreate,
        isRepayTypesFetching,
        paymentMethodList,
        setPayType,
    } = useLoanDetailStory();

  const [postLoanSubmitOrder, { isLoading: isPostLoanSubmitOrderLoading, }] = usePostLoanSubmitOrderMutation();
  console.log("isPostLoanSubmitOrderLoading", isPostLoanSubmitOrderLoading);

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
