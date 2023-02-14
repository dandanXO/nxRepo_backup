import { API } from "../../shared/api";


export type GetNewCustomerRiskPaymentRateListRequest = {
    endTime: string;
    // 結束時間
    isOldUser: number;
    // 新老客 0:新客 , 1:老客
    riskControlModel: string;
    // 风控名稱
    riskRank: string;
    // 風控標籤
    startTime: string;
    // 開始時間
}
export type GetNewCustomerRiskPaymentRateListResponse = RiskPaymentRateResponseRiskPaymentRateResponse[];

export type RiskPaymentRateResponseRiskPaymentRateResponse = {
    finishCount: number;
    loanDate: string;
    overdueCount: number;
    pendingRepaymentCount: number;
    riskRank: string;
    totalCount: number;
}

const NewCustomerRepaymentRateApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTICE: 新客風控回款率報表
        getNewCustomerRiskPaymentRateList: builder.query<GetNewCustomerRiskPaymentRateListResponse, GetNewCustomerRiskPaymentRateListRequest>({
            query: (requestBody: GetNewCustomerRiskPaymentRateListRequest) => ({
                url: `statistics/new-customer-risk-payment-rate`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTICE: 新客風控回款率報表下載
        downloadNewCustomerRiskPaymentRateList: builder.query<null, GetNewCustomerRiskPaymentRateListRequest>({
            query: (requestBody: GetNewCustomerRiskPaymentRateListRequest) => ({
                url: `statistics/new-customer-risk-payment-rate`,
                params: requestBody,
                method: "get",
        }),
}),
    })
})

export const {
    useLazyGetNewCustomerRiskPaymentRateListQuery,
} = NewCustomerRepaymentRateApi;
