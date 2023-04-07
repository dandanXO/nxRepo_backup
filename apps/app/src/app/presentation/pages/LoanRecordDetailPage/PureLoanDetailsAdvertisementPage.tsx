import React from "react";

import Advertisement from "./Advertisement";
import PureLoanDetails, {PureLoanDetailsPageProps} from "../../components/PureLoanDetails";
import {CustomPage} from "../BindBankCardPage/components/CustomPage";

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
                isRepayTypesFetching={props.isRepayTypesFetching}
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
