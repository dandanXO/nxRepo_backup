import { Page } from "@frontend/mobile/shared/ui";
import React from "react";

import Advertisement from "../../components/Advertisement";
import PureLoanDetails, {
    PureLoanDetailsPageProps,
} from "../../components/PureLoanDetails";

type PureLoanDetailsAdvertisementPage = PureLoanDetailsPageProps & {
  postLoanSubmitOrder: (obj: any) => any;
};

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
                postLoanSubmitOrder={props.postLoanSubmitOrder}
            />
        </Page>
    );
};
