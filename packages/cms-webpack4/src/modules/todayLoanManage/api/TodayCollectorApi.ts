import { API } from "../../shared/api";
import { GetTodayCollectorListResponse } from "./types/getTodayCollectorList";


const TodayPhoneUrgeApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // [GET] 获取催收阶段的催收员列表
        getTodayCollectorList: builder.query<GetTodayCollectorListResponse, null>({
            query: () => ({
                url: '/collect-today/collector',
                method: 'get'
            })
        })
    })
})

export const {
    useGetTodayCollectorListQuery
} = TodayPhoneUrgeApi;
