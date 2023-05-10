import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BankAccount } from '../api/userService/BankAccount';

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
};

const initialState: InitialStateType = {
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
};

export const modalSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    updateAuthorizationModal: (
      state,
      action: PayloadAction<InitialStateType['authorizationModal']>
    ) => {
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
        state.quickRepaymentSummaryModal.bankcardList =
          action.payload.bankcardList;
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
      state.quickRepaymentSummaryModal.selectedBankcardId =
        action.payload.selectedBankcardId;
    },
    updateLoanAgreementModal: (
      state,
      action: PayloadAction<InitialStateType['loanAgreementModal']>
    ) => {
      state.loanAgreementModal.show = action.payload.show;
    },
    updateQRSuccessModal: (
      state,
      action: PayloadAction<InitialStateType['QRSuccessModal']>
    ) => {
      state.QRSuccessModal.show = action.payload.show;
    },
  },
});
