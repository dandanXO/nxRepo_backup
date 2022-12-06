import { API } from "../../../api";
import { GetUserReviewRecordListResponse,GetUserReviewRecordListRequestQuerystring } from "./types/userReviewRecordTypes/getUserReviewRecordList";
const UserReviewRecordApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/black-list 获取全部黑名单列表
        getUserReviewRecordList: builder.query<GetUserReviewRecordListResponse, GetUserReviewRecordListRequestQuerystring>({
            query: (requestBody: GetUserReviewRecordListRequestQuerystring) => ({
                url: `/black-list`,
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
