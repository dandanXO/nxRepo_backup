import { API } from '../../shared/api';
import {
    GetCollectTodayPhoneUrgeListQueryString,
    GetCollectTodayPhoneUrgeListResponse,
} from './types/getCollectTodayPhoneUrgeList';
import {
    PostCollectTodayPhoneUrgeRecordRequest,
    PostCollectTodayPhoneUrgeRecordResponse,
} from './types/postCollectTodayPhoneUrgeRecord';

const CollectTodayPhoneUrgeApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // [GET] 當日電催列表
        getCollectTodayPhoneUrgeList: builder.query<
            GetCollectTodayPhoneUrgeListResponse,
            GetCollectTodayPhoneUrgeListQueryString
        >({
            query: (requestBody: GetCollectTodayPhoneUrgeListQueryString) => ({
                url: '/collect-today/phone-urge/list',
                params: requestBody,
                method: 'get',
            }),
        }),
        // [POST] 新增當日催收紀錄
        postCollectTodayPhoneUrgeRecord: builder.mutation<
            PostCollectTodayPhoneUrgeRecordResponse,
            PostCollectTodayPhoneUrgeRecordRequest
        >({
            query: (requestBody: PostCollectTodayPhoneUrgeRecordRequest) => ({
                url: '/collect-today/collect-records',
                method: 'post',
                data: requestBody,
            }),
        }),
    }),
});

export const { useLazyGetCollectTodayPhoneUrgeListQuery, usePostCollectTodayPhoneUrgeRecordMutation } =
    CollectTodayPhoneUrgeApi;
