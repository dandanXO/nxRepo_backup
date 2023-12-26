import { API } from '../../shared/api';
import {
    GetCollectOverdueCollectDetailQueryString,
    GetCollectOverdueCollectDetailResponse,
} from './types/getCollectOverdueCollectDetail';

const CollectOverdueCollectDetailApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // [GET] 逾期催收明細
        getCollectOverdueCollectDetail: builder.query<
            GetCollectOverdueCollectDetailResponse,
            GetCollectOverdueCollectDetailQueryString
        >({
            query: (requestBody: GetCollectOverdueCollectDetailQueryString) => ({
                url: '/collect-overdue/collect-detail',
                params: requestBody,
                method: 'get',
            }),
        }),
    }),
});

export const { useLazyGetCollectOverdueCollectDetailQuery } = CollectOverdueCollectDetailApi;
