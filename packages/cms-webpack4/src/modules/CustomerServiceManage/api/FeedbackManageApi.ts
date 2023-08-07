import { API } from '../../shared/api';
import { GetFeedbackCategories } from './types/getFeedbackCategories';
import { GetFeedbackListQueryString, GetFeedbackListResponse } from './types/getFeedbackList';
import { PostFeedbackModifyStatusRequestBody } from './types/postFeedbackModifyStatus';

const FeedbackManageApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // [GET] 取得問題種類
        getFeedbackCategories: builder.query<GetFeedbackCategories, null>({
            query: () => ({
                url: '/feedback/categories',
                method: 'get',
            }),
        }),

        // [GET] 取得用户反馈列表
        getFeedbackList: builder.query<GetFeedbackListResponse, GetFeedbackListQueryString>({
            query: (params: GetFeedbackListQueryString) => ({
                url: '/feedback',
                method: 'get',
                params,
            }),
        }),

        // [POST] 修改反馈状态
        postFeedbackModifyStatus: builder.mutation<null, PostFeedbackModifyStatusRequestBody>({
            query: (data: PostFeedbackModifyStatusRequestBody) => ({
                url: '/feedback/modify-status',
                method: 'post',
                data,
            }),
        }),
    }),
});

export const { usePostFeedbackModifyStatusMutation, useGetFeedbackCategoriesQuery, useLazyGetFeedbackListQuery } =
    FeedbackManageApi;
