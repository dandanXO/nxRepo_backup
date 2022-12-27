import { API } from "../../../api";
import { GetOrderListRequestQuerystring, GetOrderListProps } from "./types/getOrderList";

const OrderApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs​/admin​/order/list 訂單列表查詢
        getOrderList: builder.query<GetOrderListProps, GetOrderListRequestQuerystring>({
            query: (requestBody: GetOrderListRequestQuerystring) => ({
                url: `/order/list`,
                params: requestBody,
                method: "get",
            }),
        }),
    })
})
export const {
    useLazyGetOrderListQuery
} = OrderApi;
