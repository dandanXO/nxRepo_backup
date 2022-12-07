import { API } from "../../../api";
import { GetUserReviewRecordListResponse,GetUserReviewRecordListRequestQuerystring } from "./types/userReviewRecordTypes/getUserReviewRecordList";
const UserReviewRecordApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/riskReview/getUserRiskReviewList 获取用戶審核紀錄
        getUserReviewRecordList: builder.query<GetUserReviewRecordListResponse, GetUserReviewRecordListRequestQuerystring>({
            query: (requestBody: GetUserReviewRecordListRequestQuerystring) => ({
                url: `/riskReview/getUserRiskReviewList`,
                params: requestBody,
                method: "get",
            }),
        }),
        postUserReviewRecordList: builder.mutation<GetUserReviewRecordListResponse, GetUserReviewRecordListRequestQuerystring>({
            query: (requestBody: GetUserReviewRecordListRequestQuerystring) => ({
                url: `/riskReview/getUserRiskReviewList`,
                data: requestBody,
                method: "post",
            }),
        }),

    })
})
export const {
    useLazyGetUserReviewRecordListQuery,
    usePostUserReviewRecordListMutation
} = UserReviewRecordApi;
