import { API } from "../../shared/api";
import { GetOrderReviewListRequestQuerystring, GetOrderReviewListProps } from "./types/getOrderReviewList";
import { PostOrderReviewErrorReponse, PostOrderReviewRequestQuerystring } from "./types/postOrderReview";


const OrderFinalReviewApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs​/admin​/order-review​/final 獲取待终审訂單列表
        getOrderFinalReviewList: builder.query<GetOrderReviewListProps, GetOrderReviewListRequestQuerystring>({
            query: (requestBody: GetOrderReviewListRequestQuerystring) => ({
                url: `/order-review/final`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTE: POST /hs/admin/order-review/final-batch 批次訂單審核
        postOrderFinalReview: builder.mutation<PostOrderReviewErrorReponse, PostOrderReviewRequestQuerystring>({
            query: (requestBody: PostOrderReviewRequestQuerystring) => ({
                url: `/order-review/final-batch`,
                method: "post",
                data: requestBody,
            }),
        }),
    })
});
export const {
    useLazyGetOrderFinalReviewListQuery,
    usePostOrderFinalReviewMutation
} = OrderFinalReviewApi;
