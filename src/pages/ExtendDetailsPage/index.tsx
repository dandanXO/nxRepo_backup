import React from "react";
import useLoanDetailStory from "../../components/useLoanDetailStory";
import PureLoanDetails, {PureLoanDetailsPageProps} from "../../components/PureLoanDetails";
import Page from "../../core/components/Page";

const ExtendDetailsPage = () => {
    const { currentData, navigateToUploadPaymentReceiptPage, handlePostRepayCreate} = useLoanDetailStory();
    return (
        <Page>
            <PureLoanDetails
                currentData={currentData}
                navigateToUploadPaymentReceiptPage={navigateToUploadPaymentReceiptPage}
                handlePostRepayCreate={handlePostRepayCreate}
            />
        </Page>
    );
};

export default ExtendDetailsPage;
