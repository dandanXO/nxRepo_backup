import React from "react";

import Advertisement from "./Advertisement";
import {CustomPage} from "../BindBankAccountPage/components/CustomPage";
import PureLoanDetails, {PureLoanDetailsPageProps} from "../../atoms/PureLoanDetails";

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
