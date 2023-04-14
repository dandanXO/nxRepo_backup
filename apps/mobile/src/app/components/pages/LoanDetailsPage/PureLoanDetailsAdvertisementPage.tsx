import React from "react";

import Advertisement from "./Advertisement";
import {CustomPage} from "../BindBankAccountPage/components/CustomPage";
import PureLoanDetails, {PureLoanDetailsPageProps} from "../../components/PureLoanDetails";
import {AppFlag} from "../../../App";

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

            {/* NOTE: V55隱藏產品推薦列表*/}

            <Advertisement
              recommendProducts={props?.currentData?.recommendProducts}
              isPostLoanSubmitOrderLoading={props.isPostLoanSubmitOrderLoading}
              postLoanSubmitOrder={props.postLoanSubmitOrder}
            />

        </CustomPage>
    );
};
