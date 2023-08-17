import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GetLoanDetailResponse } from "../api/loanService/GetLoanDetailResponse";
import { GetCouponApplicableList } from "../api/userService/GetCouponApplicableListResponse";

export type repaymentDetailPageInitialStateType = {
    repaymentDetail: GetLoanDetailResponse | undefined,
    repaymentData: {
        orderNo?: string;
        payType?: string;
        extend?: boolean;
        repayAmount?: number;
        coupon?: GetCouponApplicableList | undefined;
    }
}

export const repaymentDetailPageInitialState: repaymentDetailPageInitialStateType = {
    repaymentDetail: undefined,
    repaymentData: {
        orderNo: '',
        payType: '',
        extend: false,
        repayAmount: 0,
        coupon: undefined,
    }
}

export const repaymentDetailPageSlice = createSlice({
    name: 'repaymentDetailPage',
    initialState: repaymentDetailPageInitialState,
    reducers: {
        updateRepaymentDetail: (state, action: PayloadAction<repaymentDetailPageInitialStateType['repaymentDetail']>) => {
            state.repaymentDetail = action.payload;
        },
        updateRepaymentData: (state, action:PayloadAction<repaymentDetailPageInitialStateType['repaymentData']>) => {
            state.repaymentData = action.payload;
        }
    }
})

