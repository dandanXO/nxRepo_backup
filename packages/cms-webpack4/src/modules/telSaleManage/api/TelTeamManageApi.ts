import { API } from '../../shared/api';
import { GetTelSaleGroupsQueryParameters, GetTelSaleGroupsResponse } from './types/getTelSaleGroups';
import { GetTelSaleSaleRolesResponse } from './types/getTelSaleSaleRoles';
import { GetTelSaleTeamsResponse } from './types/getTelSaleTeams';
import { PostTelSaleGroupRequest } from './types/postTelSaleGroup';
import { PostTelSaleTeamRequest } from './types/postTelSaleTeam';
import { PutTelSaleTeamRequestBody } from './types/putTelSaleTeam';

const TelTeamManageApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // [GET] 查詢電銷團隊
        getTelSaleTeams: builder.query<GetTelSaleTeamsResponse, null>({
            query: () => ({
                url: '/tel-team',
                method: 'get',
            }),
        }),
        // [POST] 添加电销团队
        postTelSaleTeam: builder.mutation<null, PostTelSaleTeamRequest>({
            query: (requestBody: PostTelSaleTeamRequest) => ({
                url: '/tel-team',
                method: 'post',
                data: requestBody,
            }),
        }),
        // [DELETE] 移除电销团队
        deleteTelSaleTeam: builder.mutation<null, { id: number }>({
            query: (parameter) => ({
                url: '/tel-team',
                method: 'delete',
                params: parameter,
            }),
        }),
        // [PUT] 更新电销团队
        putTelSaleTeam: builder.mutation<null, PutTelSaleTeamRequestBody>({
            query: (body: PutTelSaleTeamRequestBody) => ({
                url: '/tel-team',
                method: 'put',
                data: body,
            }),
        }),
        // [POST] 添加电销组别
        postTelSaleGroup: builder.mutation<null, PostTelSaleGroupRequest>({
            query: (requestBody: PostTelSaleGroupRequest) => ({
                url: '/tel-group',
                method: 'post',
                data: requestBody,
            }),
        }),
        // [GET] 查詢电销组别
        getTelSaleGroups: builder.query<GetTelSaleGroupsResponse, GetTelSaleGroupsQueryParameters>({
            query: (parameters: GetTelSaleGroupsQueryParameters) => ({
                url: '/tel-group',
                method: 'get',
                params: parameters,
            }),
        }),
        // [DELETE] 移除电销组别
        deleteTelSaleGroup: builder.mutation<null, { id: number }>({
            query: (parameter) => ({
                url: '/tel-group',
                method: 'delete',
                params: parameter,
            }),
        }),
        // [PUT] 更新电销组别
        putTelSaleGroup: builder.mutation<null, { id: number; name: string; telTeamId: number }>({
            query: (body) => ({
                url: '/tel-group',
                method: 'put',
                data: body,
            }),
        }),
        // [GET] 取得電銷相關角色
        getTelSaleRoles: builder.query<GetTelSaleSaleRolesResponse, null>({
            query: () => ({
                url: '/tel-sale/role',
                method: 'get',
            }),
        }),
    }),
});

export const {
    useGetTelSaleTeamsQuery,
    useLazyGetTelSaleTeamsQuery,
    usePostTelSaleTeamMutation,
    useDeleteTelSaleTeamMutation,
    usePutTelSaleTeamMutation,
    usePostTelSaleGroupMutation,
    useLazyGetTelSaleGroupsQuery,
    useDeleteTelSaleGroupMutation,
    usePutTelSaleGroupMutation,
    useGetTelSaleRolesQuery,
} = TelTeamManageApi;
