import React from "react";
import useLoanDetailStory from "../../components/useLoanDetailStory";
import PureLoanDetails from "../../components/PureLoanDetails";
import { Page } from "@frontend/mobile/shared/ui";

const ExtendDetailsPage = () => {
    const {
        currentData,
        navigateToUploadPaymentReceiptPage,
        handlePostRepayCreate,
    } = useLoanDetailStory();
    return (
        <Page>
            <PureLoanDetails
                currentData={currentData}
                navigateToUploadPaymentReceiptPage={
                    navigateToUploadPaymentReceiptPage
                }
                handlePostRepayCreate={handlePostRepayCreate}
            />
        </Page>
    );
};

export default ExtendDetailsPage;
