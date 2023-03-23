import React from "react";
import { PureLoanDetailsAdvertisementPage } from "./PureLoanDetailsAdvertisementPage";
import useLoanDetailStory from "../../../../../mobile/src/app/hooks/useLoanDetailStory";
import {usePostLoanSubmitOrderMutation} from "../../../../../mobile/src/app/api";

export const STATE_REPAYMENT_STEPS = "STATE_REPAYMENT_STEPS";

export const LoanRecordDetailPage = () => {
    const {
        currentData,
        navigateToUploadPaymentReceiptPage,
        handlePostRepayCreate,
        isRepayTypesFetching,
        paymentMethodList,
        setPayType,
    } = useLoanDetailStory();


  const [postLoanSubmitOrder, { isLoading: isPostLoanSubmitOrderLoading, }] = usePostLoanSubmitOrderMutation();
  // console.log("isPostLoanSubmitOrderLoading", isPostLoanSubmitOrderLoading);
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
