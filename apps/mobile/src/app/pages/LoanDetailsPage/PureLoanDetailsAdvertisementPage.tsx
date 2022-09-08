import React from "react";
import Page from "../../core/components/Page";
import Advertisement from "../../components/Advertisement";
import PureLoanDetails, {
    PureLoanDetailsPageProps,
} from "../../components/PureLoanDetails";

type PureLoanDetailsAdvertisementPage = PureLoanDetailsPageProps;

export const PureLoanDetailsAdvertisementPage = (
    props: PureLoanDetailsAdvertisementPage
) => {
    return (
        <Page>
            <PureLoanDetails
                currentData={props.currentData}
                navigateToUploadPaymentReceiptPage={
                    props.navigateToUploadPaymentReceiptPage
                }
                handlePostRepayCreate={props.handlePostRepayCreate}
            />
            <Advertisement
                recommendProducts={props?.currentData?.recommendProducts}
            />
        </Page>
    );
};
