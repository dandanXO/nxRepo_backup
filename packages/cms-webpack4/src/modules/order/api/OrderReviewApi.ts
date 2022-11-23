import { API } from "../../../api";
import { GetOrderReviewListRequestQuerystring, GetOrderReviewListProps } from "./types/OrderReviewTypes/getOrderReviewList";
import { UserId } from "../../../types/UserId";
import { PostOrderReviewErrorReponse, PostOrderReviewRequestQuerystring } from "./types/OrderReviewTypes/postOrderReview";

const OrderReviewApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs​/admin​/order-review​/final 獲取待终审訂單列表
        getUOrderReviewList: builder.query<GetOrderReviewListProps, GetOrderReviewListRequestQuerystring>({
            query: (requestBody: GetOrderReviewListRequestQuerystring) => ({
                url: `/order-review/final`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTE: POST /hs​/admin​/user-review​/final 终审
        postOrderReview: builder.mutation<PostOrderReviewErrorReponse, PostOrderReviewRequestQuerystring>({
            query: (requestBody: PostOrderReviewRequestQuerystring) => ({
                url: `/user-review/final`,
                method: "post",
                data: requestBody,
            }),
        }),
    })
})
export const {
    useLazyGetUOrderReviewListQuery,
    usePostOrderReviewMutation
} = OrderReviewApi;
