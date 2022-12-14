import { API } from "../../../api";
import { GetOrderReviewRecordListProps,GetOrderReviewRecordListRequestQuerystring } from "./types/orderReviewRecordTypes/getOrderReviewRecordList";
const OrderReviewRecordApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/order-review-record/list 訂單審核紀錄列表
        getOrderReviewRecordList: builder.query<GetOrderReviewRecordListProps, GetOrderReviewRecordListRequestQuerystring>({
            query: (requestBody: GetOrderReviewRecordListRequestQuerystring) => ({
                url: `/order-review-record/list`,
                params: requestBody,
                method: "get",
            }),
        }),
      
    })
})
export const {
    useLazyGetOrderReviewRecordListQuery,
} = OrderReviewRecordApi;
