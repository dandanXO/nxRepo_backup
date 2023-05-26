import { API } from '../../shared/api';
import { DeleteWhiteListRequestQuerystring } from './types/whiteListTypes/deleteWhiteList';
import { GetWhiteListProps, GetWhiteListRequestQuerystring } from './types/whiteListTypes/getWhtieList';
import { PostWhiteListRequestQuerystring } from './types/whiteListTypes/postWhiteList';

const WhiteListApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/whitelist/list 白名單列表
        getWhiteList: builder.query<GetWhiteListProps, GetWhiteListRequestQuerystring>({
            query: (requestBody: GetWhiteListRequestQuerystring) => ({
                url: `/whitelist/list`,
                params: requestBody,
                method: 'get',
            }),
        }),
        // NOTE: POST /hs/admin/whitelist 批次增加白名單
        postWhiteList: builder.mutation<null, PostWhiteListRequestQuerystring>({
            query: (requestBody: PostWhiteListRequestQuerystring) => ({
                url: `/whitelist`,
                method: 'post',
                data: requestBody,
            }),
        }),
        // NOTE: DELETE /hs/admin/whitelist 批次刪除白名單
        deleteWhiteList: builder.mutation<{}, DeleteWhiteListRequestQuerystring>({
            query: (requestBody: DeleteWhiteListRequestQuerystring) => ({
                url: `/whitelist`,
                method: 'delete',
                data: requestBody,
            }),
        }),
        // NOTE: DELETE /hs/admin/whitelist/all 刪除所有白名單
        deleteWhiteListAll: builder.mutation<{}, null>({
            query: () => ({
                url: `/whitelist/all`,
                method: 'delete',
                // data: requestBody,
            }),
        }),
    }),
});
export const {
    useLazyGetWhiteListQuery,
    usePostWhiteListMutation,
    useDeleteWhiteListMutation,
    useDeleteWhiteListAllMutation,
} = WhiteListApi;
