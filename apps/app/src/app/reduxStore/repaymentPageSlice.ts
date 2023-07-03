import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GetLoanRecordListReponse } from "../api/loanService/GetLoanRecordListReponse";
import { GetLoanRecord } from "../api/loanService/GetLoanRecord";

export type RepaymentPageActionPayload = {
    paymentType: string;
    scrollPosition: number;
    
}
type InitialStateType = {
    paymentType: string;
    scrollPosition: number;
    repaymentRecord:GetLoanRecord[]
}
export type RepaymentRecordActionPayload={
    repaymentRecord:GetLoanRecord[]
}
const initialState: InitialStateType = {
    paymentType: 'Unpaid',
    scrollPosition: 0,
    repaymentRecord: []
}

export const repaymentPageSlice = createSlice({
    name: 'repaymentPage',
    initialState,
    reducers: {
        updateRepaymentPage: (state, action: PayloadAction<RepaymentPageActionPayload>) => {
            state.paymentType = action.payload.paymentType;
            state.scrollPosition = action.payload.scrollPosition;
           
        },
        updateRepaymentRecord: (state, action) => {
            state.repaymentRecord = action.payload;
        }
    }
})

