import { API } from '../../shared/api';
import {
    GetUserReviewRecordListRequestQuerystring,
    GetUserReviewRecordListResponse,
} from './types/userReviewRecordTypes/getUserReviewRecordList';

const UserReviewRecordApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET ​/hs​/admin​/user-review-record​/list 獲取用戶審核紀錄列表
        getUserReviewRecordList: builder.query<
            GetUserReviewRecordListResponse,
            GetUserReviewRecordListRequestQuerystring
        >({
            query: (requestBody: GetUserReviewRecordListRequestQuerystring) => ({
                url: `/user-review-record/list`,
                params: requestBody,
                method: 'get',
            }),
        }),
    }),
});
export const { useLazyGetUserReviewRecordListQuery } = UserReviewRecordApi;
