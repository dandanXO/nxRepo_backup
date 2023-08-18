import { API } from '../../shared/api';

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
    }),
});
