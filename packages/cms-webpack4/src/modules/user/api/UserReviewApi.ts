import { API } from "../../shared/api";
import { GetUserReviewListProps,GetUserReviewListRequestQuerystring } from "./types/userReviewTypes/getUserReviewList";
import { PostUserReviewErrorReponse,PostUserReviewRequestQuerystring } from "./types/userReviewTypes/postUserReview";

const UserReviewApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/user-review/final 终审审核用户列表
        getUserReviewList: builder.query<GetUserReviewListProps, GetUserReviewListRequestQuerystring>({
            query: (requestBody: GetUserReviewListRequestQuerystring) => ({
                url: `/user-review/final`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTE: POST /hs/admin/user-review/final 终审
        postUserReview: builder.mutation<PostUserReviewErrorReponse, PostUserReviewRequestQuerystring>({
            query: (requestBody: PostUserReviewRequestQuerystring) => ({
                url: `/user-review/final`,
                method: "post",
                data: requestBody,
            }),
        }),
    })
});
export const {
    useLazyGetUserReviewListQuery,
    usePostUserReviewMutation
} = UserReviewApi;
