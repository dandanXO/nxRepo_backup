import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { BankAccount } from '../api/userService/BankAccount';
import { ReservationDetail } from '../api/loanService/PostReservationSubmitRequest';
import { ReservationProduct } from '../api/loanService/GetReservationResponse';

export type InitialStateType = {
  authorizationModal: {
    show: boolean;
    confirm: null | boolean;
  };
  quickRepaymentSummaryModal: {
    show: boolean;
    confirm: boolean;
    bankcardList?: BankAccount[];
    selectedBankcardId?: number;
  };
  loanAgreementModal: {
    show: boolean;
  };
  QRSuccessModal: {
    show: boolean;
  };
  systemCouponModal: {
    show: boolean;
    title: string;
    text: string;
    webUrl: string;
    action: string;
  };
  bindBankcardModal:{
    show: boolean;
    confirm: boolean;
    paymentMethod:number;
    cardholderName:string;
    bankName:string;
    bankAccNr:string;
    mobileWallet:boolean;
    mobileWalletAccount:string;
    walletVendor:string;
    bankCode:string;
  };
  starRatingModal: {
      show: boolean;
  },
  starRatingSuccessModal: {
    show: boolean;
  },
  noRecommendProductModal:{
    show: boolean;
  },
  paymentProgressingModal:{
    show: boolean;
  },
  reservationProductsModal:{
    show: boolean;
    confirm: boolean;
    reservationDetail: ReservationDetail[];
    availableAmount: number;
    products: ReservationProduct[]
  },
  reservationSuccessModal:{
    show: boolean;
  }
};

export const modalInitialState: InitialStateType = {
  authorizationModal: {
    show: false,
    confirm: null,
  },
  quickRepaymentSummaryModal: {
    show: false,
    confirm: false,
    bankcardList: undefined,
    selectedBankcardId: undefined,
  },
  loanAgreementModal: {
    show: false,
  },
  QRSuccessModal: {
    show: false,
  },
  systemCouponModal: {
    show: false,
    title: '',
    text: '',
    webUrl: '',
    action: '',
  },
  bindBankcardModal:{
    show: false,
    confirm: false,
    paymentMethod: 1,
    cardholderName: '',
    bankName: '',
    bankAccNr: '',
    mobileWallet: false,
    mobileWalletAccount: '',
    walletVendor: '',
    bankCode: '',
  },
  starRatingModal: {
    show: false
  },
  starRatingSuccessModal: {
    show: false
  },
  noRecommendProductModal:{
    show: false
  },
  paymentProgressingModal:{
    show: false
  },
  reservationProductsModal:{
    show: false,
    confirm: false,
    reservationDetail: [],
    availableAmount: 0,
    products: []
  },
  reservationSuccessModal:{
    show: false
  }
};

export const modalSlice = createSlice({
  name: 'model',
  initialState: modalInitialState,
  reducers: {
    updateAuthorizationModal: (state, action: PayloadAction<InitialStateType['authorizationModal']>) => {
      state.authorizationModal.show = action.payload.show;
      state.authorizationModal.confirm = action.payload.confirm;
    },
    updateQuickRepaymentSummaryModal: (
      state,
      action: PayloadAction<InitialStateType['quickRepaymentSummaryModal']>
    ) => {
      state.quickRepaymentSummaryModal.show = action.payload.show;
      state.quickRepaymentSummaryModal.confirm = action.payload.confirm;

      if (action.payload.bankcardList) {
        state.quickRepaymentSummaryModal.bankcardList = action.payload.bankcardList;
      }
      // NOTICE: 無法放在一起，會破壞監聽 confirm | cancel 的 saga
      // if(typeof action.payload.selectedBankcardId !== "undefined") {
      //   state.quickRepaymentSummaryModal.selectedBankcardId = action.payload.selectedBankcardId;
      // }
    },
    // NOTICE: refactor me
    updateQuickRepaymentSummaryModalSelectedID: (
      state,
      action: PayloadAction<{
        selectedBankcardId?: number;
      }>
    ) => {
      state.quickRepaymentSummaryModal.selectedBankcardId = action.payload.selectedBankcardId;
    },
    updateLoanAgreementModal: (state, action: PayloadAction<InitialStateType['loanAgreementModal']>) => {
      state.loanAgreementModal.show = action.payload.show;
    },
    updateQRSuccessModal: (state, action: PayloadAction<InitialStateType['QRSuccessModal']>) => {
      state.QRSuccessModal.show = action.payload.show;
    },
    updateSystemCouponModal: (state, action: PayloadAction<InitialStateType['systemCouponModal']>) => {
      state.systemCouponModal.show = action.payload.show;
      state.systemCouponModal.title = action.payload.title;
      state.systemCouponModal.text = action.payload.text;
      state.systemCouponModal.webUrl = action.payload.webUrl;
      state.systemCouponModal.action = action.payload.action;
    },
    updatebindBankcardModal: (state, action: PayloadAction<InitialStateType['bindBankcardModal']>) => {
        state.bindBankcardModal.show = action.payload.show;
        state.bindBankcardModal.confirm = action.payload.confirm;
        state.bindBankcardModal.paymentMethod = action.payload.paymentMethod;
        state.bindBankcardModal.cardholderName = action.payload.cardholderName;
        state.bindBankcardModal.bankName = action.payload.bankName;
        state.bindBankcardModal.bankAccNr = action.payload.bankAccNr;
        state.bindBankcardModal.mobileWallet = action.payload.mobileWallet;
        state.bindBankcardModal.mobileWalletAccount = action.payload.mobileWalletAccount;
        state.bindBankcardModal.walletVendor = action.payload.walletVendor;
        state.bindBankcardModal.bankCode = action.payload.bankCode;
    },
    updateStarRatingModal: (state, action: PayloadAction<InitialStateType['starRatingModal']>) => {
        state.starRatingModal.show = action.payload.show;
    },
    updateStarRatingSuccessModal: (state, action: PayloadAction<InitialStateType['starRatingSuccessModal']>) => {
        state.starRatingSuccessModal.show = action.payload.show;
    },
    updateNoRecommendProductModal: (state, action: PayloadAction<InitialStateType['noRecommendProductModal']>) => {
        state.noRecommendProductModal.show = action.payload.show;
    },
    updatepaymentProgressingModal: (state, action: PayloadAction<InitialStateType['noRecommendProductModal']>) => {
        state.paymentProgressingModal.show = action.payload.show;
    },
    updateReservationProductsModal: (state, action: PayloadAction<InitialStateType['reservationProductsModal']>) => {
        state.reservationProductsModal.show = action.payload.show;
        state.reservationProductsModal.confirm = action.payload.confirm;
        state.reservationProductsModal.reservationDetail = action.payload.reservationDetail;
        state.reservationProductsModal.availableAmount = action.payload.availableAmount;
        state.reservationProductsModal.products = action.payload.products;
    },
    updateReservationSuccessModal: (state, action: PayloadAction<InitialStateType['reservationSuccessModal']>) => {
        state.reservationSuccessModal.show = action.payload.show;
    },
  },
});
