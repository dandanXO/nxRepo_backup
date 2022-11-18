import React from "react";
import useLoanDetailStory from "../../hooks/useLoanDetailStory";
import PureLoanDetails from "../../components/PureLoanDetails";
import { Page } from "@frontend/mobile/shared/ui";

const ExtendDetailsPage = () => {
    const {
        currentData,
        navigateToUploadPaymentReceiptPage,
        handlePostRepayCreate,
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
                paymentMethodList={paymentMethodList}
                setPayType={setPayType}
            />
        </Page>
    );
};

export default ExtendDetailsPage;
