import { API } from "../../../api";
import { GetOrderReviewListRequestQuerystring, GetOrderReviewListProps } from "./types/OrderReviewTypes/getOrderReviewList";

const OrderReviewApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs​/admin​/order-review​/final 獲取待终审訂單列表
        getOrderList: builder.query<GetOrderReviewListProps, GetOrderReviewListRequestQuerystring>({
            query: (requestBody: GetOrderReviewListRequestQuerystring) => ({
                url: `/order-review/final`,
                params: requestBody,
                method: "get",
            }),
        }),
    })
})
export const {
    useLazyGetOrderListQuery,
} = OrderReviewApi;
