import { API } from '../../shared/api';
import { PostTelSaleTeamRequest } from './types/postTelSaleTeam';

const TelTeamManageApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // [GET] 查詢電銷團隊
        getTelSaleTeam: builder.query({
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

export const { usePostTelSaleTeamMutation } = TelTeamManageApi;
