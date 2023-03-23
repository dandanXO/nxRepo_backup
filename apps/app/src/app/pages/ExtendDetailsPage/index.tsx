import React from "react";
import { Page } from "@frontend/mobile/shared/ui";

import PureLoanDetails from "../../components/PureLoanDetails";
import useLoanDetailStory from "../../hooks/useLoanDetailStory";

export const ExtendDetailsPage = () => {
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

