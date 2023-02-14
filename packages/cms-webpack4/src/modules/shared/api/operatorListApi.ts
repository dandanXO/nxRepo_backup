import { API } from "./index";
import { GetOperatorListResponse } from "./getOperatorList";

export interface OperatorType {
    operatorId?: number;
    operatorName?: string;
}

const OperatorListApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET ​/hs​/admin​/whitelist​/operatorOptionList 取得操作人選項列表
        getOperatorList: builder.query<GetOperatorListResponse, null>({
            query: () => ({
                url: `/black-list/operator-option-list`,
                params: {},
                method: "get",
            }),
        }),
        // NOTE: GET ​/hs​/admin​/order-review-record​/operator-option 訂單審核紀錄操作人選單
        getOrderReveiwRecordOperatorList: builder.query<OperatorType[], null>({
            query: () => ({
                url: `/order-review-record/operator-option`,
                params: {},
                method: "get",
            }),
        }),
        // NOTE: GET /hs/admin/user-review-record/operator-option 用戶審核紀錄操作人選單
        getUserReveiwRecordOperatorList: builder.query<OperatorType[], null>({
            query: () => ({
                url: `/user-review-record/operator-option`,
                params: {},
                method: "get",
            }),
        }),
    })
})
export const {
    useLazyGetOperatorListQuery,
    useGetOperatorListQuery,
    useLazyGetOrderReveiwRecordOperatorListQuery,
    useLazyGetUserReveiwRecordOperatorListQuery
} = OperatorListApi;
