import { API } from "../../shared/api";
import { GetReloanStatisticsListRequestQuerystring, GetReloanStatisticsListResponse } from './types/ReloanStatisticsTypes/getReloanStatisticsList';
const ReloanStatisticsApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/statistics/reloan-statistics 用户复借统计
        getReloanStatisticsList: builder.query<GetReloanStatisticsListResponse, GetReloanStatisticsListRequestQuerystring>({
            query: (requestBody: GetReloanStatisticsListRequestQuerystring) => ({
                url: `/statistics/reloan-statistics`,
                params: requestBody,
                method: "get",
            }),
        }),
    })
})
export const {
    useLazyGetReloanStatisticsListQuery
} = ReloanStatisticsApi;
