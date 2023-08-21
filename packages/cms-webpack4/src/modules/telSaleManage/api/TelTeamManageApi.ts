import { API } from '../../shared/api';
import { GetTelSaleTeamsResponse } from './types/getTelSaleTeams';
import { PostTelSaleTeamRequest } from './types/postTelSaleTeam';

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
    }),
});

export const { useLazyGetTelSaleTeamsQuery, usePostTelSaleTeamMutation } = TelTeamManageApi;
