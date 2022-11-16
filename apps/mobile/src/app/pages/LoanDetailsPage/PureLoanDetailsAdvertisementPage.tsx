import React from "react";

import Advertisement from "./Advertisement";
import PureLoanDetails, {PureLoanDetailsPageProps,} from "../../components/PureLoanDetails";
import {CustomPage} from "../BindBankAccountPage/components/CustomPage";

type PureLoanDetailsAdvertisementPage = PureLoanDetailsPageProps & {
  postLoanSubmitOrder: (obj: any) => any;
};

export const PureLoanDetailsAdvertisementPage = (
    props: PureLoanDetailsAdvertisementPage
) => {

    return (
        <CustomPage>
            <PureLoanDetails
                currentData={props.currentData}
                navigateToUploadPaymentReceiptPage={
                    props.navigateToUploadPaymentReceiptPage
                }
                handlePostRepayCreate={props.handlePostRepayCreate}
                paymentMethodList={props.paymentMethodList}
                setPayType={props.setPayType}
            />
            <Advertisement
                recommendProducts={props?.currentData?.recommendProducts}
                postLoanSubmitOrder={props.postLoanSubmitOrder}
            />
        </CustomPage>
    );
};
