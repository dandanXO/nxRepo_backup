import { API } from '../../shared/api';
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
    }),
});

export const {
    useGetTelSaleTeamsQuery,
    useLazyGetTelSaleTeamsQuery,
    usePostTelSaleTeamMutation,
    useDeleteTelSaleTeamMutation,
    usePutTelSaleTeamMutation,
    usePostTelSaleGroupMutation,
} = TelTeamManageApi;
