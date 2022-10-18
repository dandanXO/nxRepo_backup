import { API } from "../../../api";
import { GetUerReviewListProps,GetUserReviewListRequestQuerystring } from "./types/userReviewTypes/getUserReviewList";
import { UserId } from "../../../types/UserId";

const UserReviewApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs​/admin​/user-review​/final 终审审核用户列表
        getUserReviewList: builder.query<GetUerReviewListProps, GetUserReviewListRequestQuerystring>({
            query: (requestBody: GetUserReviewListRequestQuerystring) => ({
                url: `/user-review/final`,
                params: requestBody,
                method: "get",
            }),
        }),
      
    })
})
export const {
    useLazyGetUserReviewListQuery,
 
} = UserReviewApi;
