import { API } from "../../../api";
import { GetOrderReviewRecordListResponse,GetOrderReviewRecordListRequestQuerystring } from "./types/orderReviewRecordTypes/getOrderReviewRecordList";
const UserReviewRecordApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/black-list 获取全部黑名单列表
        getOrderReviewRecordList: builder.query<GetOrderReviewRecordListResponse, GetOrderReviewRecordListRequestQuerystring>({
            query: (requestBody: GetOrderReviewRecordListRequestQuerystring) => ({
                url: `/black-list`,
                params: requestBody,
                method: "get",
            }),
        }),
      
    })
})
export const {
    useLazyGetOrderReviewRecordListQuery,
} = UserReviewRecordApi;
