import { API } from "../../shared/api";
import { GetOverDueCollectorListResponse } from "./types/getOverDueCollectorList";


const OverDuePhoneUrgeApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // [GET] 获取催逾期催收阶段的催收员列表
        getOverDueCollectorList: builder.query<GetOverDueCollectorListResponse, null>({
            query: () => ({
                url: '/collect-overdue/collector',
                method: 'get'
            })
        })
    })
})

export const {
    useGetOverDueCollectorListQuery
} = OverDuePhoneUrgeApi;
