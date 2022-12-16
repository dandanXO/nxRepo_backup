import {API} from "../../../api";
import { GetOperatorListResponse ,GetOrderReviewRecordOperatorListResponse} from "./types/getOperatorList";

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
        getOrderReveiwRecordOperatorList: builder.query<GetOrderReviewRecordOperatorListResponse[], null>({
            query: () => ({
                url: `/order-review-record/operator-option`,
                params: {},
                method: "get",
            }),
        }),
    })
})
export const {
    useLazyGetOperatorListQuery,
    useGetOperatorListQuery,
    useLazyGetOrderReveiwRecordOperatorListQuery
} = OperatorListApi;
