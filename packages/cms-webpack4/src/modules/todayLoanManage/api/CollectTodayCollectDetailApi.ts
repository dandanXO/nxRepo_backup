import { API } from '../../shared/api';
import {
    GetCollectTodayCollectDetailQueryString,
    GetCollectTodayCollectDetailResponse,
} from './types/getCollectTodayCollectDetail';

const CollectTodayCollectDetailApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // [GET] 當日催收明細
        getCollectTodayCollectDetail: builder.query<
            GetCollectTodayCollectDetailResponse,
            GetCollectTodayCollectDetailQueryString
        >({
            query: (requestBody: GetCollectTodayCollectDetailQueryString) => ({
                url: '/collect-today/collect-detail',
                params: requestBody,
                method: 'get',
            }),
        }),
    }),
});

export const { useLazyGetCollectTodayCollectDetailQuery } = CollectTodayCollectDetailApi;
