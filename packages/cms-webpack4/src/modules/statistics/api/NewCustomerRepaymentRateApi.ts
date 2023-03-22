import { API } from "../../shared/api";


export type GetNewCustomerRiskPaymentRateListRequest = {
    endTime: string;
    // 結束時間
    // isOldUser?: number;
    // 新老客 0:新客 , 1:老客
    riskControlModel?: string;
    // 风控名稱
    riskRank: string;
    // 風控標籤
    startTime: string;
    // 開始時間
    newMember: boolean | "";
}
export type GetNewCustomerRiskPaymentRateListResponse = RiskPaymentRateResponseRiskPaymentRateResponse[];

export type RiskPaymentRateResponseRiskPaymentRateResponse = {
    finishCount: number;
    // 已結清筆數

    finishMoney: number;
    // 已結清金額

    finishUsers: number;
    // 已結清用戶數

    loanDate: string;
    // 放款日期

    overdueCount: number;
    // 已逾期筆數

    overdueMoney: number;
    // 已逾期金額

    overdueUsers: number;
    // 已逾期用戶數

    pendingRepaymentCount: number;
    // 待還款金額筆數

    pendingRepaymentMoney: number;
    // 待還款金額

    pendingRepaymentUsers: number;
    // 待還款用戶數

    totalCount: number;
    // 總筆數

    totalLendMoney: number;
    // 總放款金額

    totalLendUsers: number;
    // 放款用戶數
}

const NewCustomerRepaymentRateApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTICE: 新客風控回款率報表
        getNewCustomerRiskPaymentRateList: builder.query<GetNewCustomerRiskPaymentRateListResponse, GetNewCustomerRiskPaymentRateListRequest>({
            query: (requestBody: GetNewCustomerRiskPaymentRateListRequest) => ({
                url: `/statistics/new-customer-risk-payment-rate`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTICE: 新客風控回款率報表下載
        // downloadNewCustomerRiskPaymentRateList: builder.query<null, GetNewCustomerRiskPaymentRateListRequest>({
        //     query: (requestBody: GetNewCustomerRiskPaymentRateListRequest) => ({
        //         url: `/statistics/new-customer-risk-payment-rate`,
        //         params: requestBody,
        //         method: "get",
        //     }),
        // }),
    })
})

export const {
    useLazyGetNewCustomerRiskPaymentRateListQuery,
} = NewCustomerRepaymentRateApi;
