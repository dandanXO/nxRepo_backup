import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {GetLoanDetailResponse} from '../externel/backend/loanService/GetLoanDetailResponse';
import {GetCouponApplicableList} from '../externel/backend/userService/GetCouponApplicableListResponse';

export type repaymentDetailPageInitialStateType = {
  repaymentDetail: GetLoanDetailResponse | undefined;
  repaymentData: {
    balance?: string;
    orderNo?: string;

    extend?: boolean;
    repayAmount?: number | string;
    coupon?: GetCouponApplicableList | null;
    radio?: string;
    payType?: string;
    repayTypeList?: { value: string; label: string }[];
    payTypeNote?: { value: string; label: string };
    payTypeNoteList?: { value: string; label: string }[];
    onlineRepayTypeList?: { value: string; label: string }[];
    offlineRepayTypeList?: { value: string; label: string }[];
    repaymentAmountForDemo?: number | string;
  };
};

export const repaymentDetailPageInitialState: repaymentDetailPageInitialStateType =
  {
    repaymentDetail: undefined,
    repaymentData: {
      balance: '',
      orderNo: '',
      payType: '',
      extend: false,
      repayAmount: 0,
      coupon: null,
      radio: 'balance',
      repayTypeList: [],
      payTypeNote: {value: '', label: ''},
      payTypeNoteList: [],
      onlineRepayTypeList: [],
      offlineRepayTypeList: [],
      repaymentAmountForDemo: 0,
    },
  };

export const repaymentDetailPageSlice = createSlice({
  name: 'repaymentDetailPage',
  initialState: repaymentDetailPageInitialState,
  reducers: {
    updateRepaymentDetail: (
      state,
      action: PayloadAction<
        repaymentDetailPageInitialStateType['repaymentDetail']
      >
    ) => {
      state.repaymentDetail = action.payload;
    },
    updateRepaymentData: (
      state,
      action: PayloadAction<
        repaymentDetailPageInitialStateType['repaymentData']
      >
    ) => {
      state.repaymentData = action.payload;
    },
  },
});
