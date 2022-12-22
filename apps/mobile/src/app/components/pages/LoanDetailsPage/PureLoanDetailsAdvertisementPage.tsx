import React from "react";

import Advertisement from "./Advertisement";
import {CustomPage} from "../BindBankAccountPage/components/CustomPage";
import PureLoanDetails, {PureLoanDetailsPageProps} from "../../components/PureLoanDetails";

type PureLoanDetailsAdvertisementPage = PureLoanDetailsPageProps & {
  isPostLoanSubmitOrderLoading: boolean;
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
                isPostLoanSubmitOrderLoading={props.isPostLoanSubmitOrderLoading}
                postLoanSubmitOrder={props.postLoanSubmitOrder}
            />
        </CustomPage>
    );
};
