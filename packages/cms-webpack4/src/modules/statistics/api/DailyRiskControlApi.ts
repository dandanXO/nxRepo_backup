import { API } from "../../shared/api";
import { GetDailyRiskControlListRequestQuery,GetDailyRiskControlListResponse } from "./types/DailyRiskControlTypes/getDailyRiskControlList";


const DailyRiskControlApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/statistics/risk-control 風控統計
        getDailyRiskControlList: builder.query<GetDailyRiskControlListResponse, GetDailyRiskControlListRequestQuery>({
            query: (requestBody: GetDailyRiskControlListRequestQuery) => ({
                url: `/statistics/risk-control`,
                params: requestBody,
                method: "get",
            }),
        }),
    })
})
export const {
    useLazyGetDailyRiskControlListQuery
} = DailyRiskControlApi;
