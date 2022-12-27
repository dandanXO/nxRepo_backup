import { API } from "../../../api";
import { GetOrderReviewListRequestQuerystring, GetOrderReviewListProps } from "./types/getOrderReviewList";
import { PostOrderReviewErrorReponse, PostOrderReviewRequestQuerystring } from "./types/postOrderReview";

const OrderReviewApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs​/admin​/order-review​/final 獲取待终审訂單列表
        getOrderReviewList: builder.query<GetOrderReviewListProps, GetOrderReviewListRequestQuerystring>({
            query: (requestBody: GetOrderReviewListRequestQuerystring) => ({
                url: `/order-review/final`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTE: POST /hs/admin/order-review/batch-review 批次訂單審核
        postOrderReview: builder.mutation<PostOrderReviewErrorReponse, PostOrderReviewRequestQuerystring>({
            query: (requestBody: PostOrderReviewRequestQuerystring) => ({
                url: `/order-review/batch-review`,
                method: "post",
                data: requestBody,
            }),
        }),
    })
})
export const {
    useLazyGetOrderReviewListQuery,
    usePostOrderReviewMutation
} = OrderReviewApi;
