import { API } from "../../shared/api";
import { GetOrderReviewListRequestQuerystring, GetOrderReviewListProps } from "./types/getOrderReviewList";
import { PostOrderReviewErrorReponse, PostOrderReviewRequestQuerystring } from "./types/postOrderReview";

const OrderReviewApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/order-review/first 獲取待複審訂單列表
        getOrderReviewList: builder.query<GetOrderReviewListProps, GetOrderReviewListRequestQuerystring>({
            query: (requestBody: GetOrderReviewListRequestQuerystring) => ({
                url: `/order-review/first`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTE: POST /hs/admin/order-review/first-batch 批次訂單初審
        postOrderReview: builder.mutation<PostOrderReviewErrorReponse, PostOrderReviewRequestQuerystring>({
            query: (requestBody: PostOrderReviewRequestQuerystring) => ({
                url: `/order-review/first-batch`,
                method: "post",
                data: requestBody,
            }),
        }),
    })
});
export const {
    useLazyGetOrderReviewListQuery,
    usePostOrderReviewMutation
} = OrderReviewApi;
