import React from "react";
import useLoanDetailStory from "../../../hooks/useLoanDetailStory";
import { Page } from "@frontend/mobile/shared/ui";
import PureLoanDetails from "../../components/PureLoanDetails";

const ExtendDetailsPage = () => {
    const {
        currentData,
        navigateToUploadPaymentReceiptPage,
        handlePostRepayCreate,
        isRepayTypesFetching,
        paymentMethodList,
        setPayType,
    } = useLoanDetailStory();
    return (
        <Page>
            <PureLoanDetails
                currentData={currentData}
                navigateToUploadPaymentReceiptPage={
                    navigateToUploadPaymentReceiptPage
                }
                handlePostRepayCreate={handlePostRepayCreate}
                isRepayTypesFetching={isRepayTypesFetching}
                paymentMethodList={paymentMethodList}
                setPayType={setPayType}
            />
        </Page>
    );
};

export default ExtendDetailsPage;
