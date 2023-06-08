import { API } from "../../shared/api";
import { GetOverDuePhoneUrgeListQueryString, GetOverDuePhoneUrgeListResponse } from "./types/getOverDuePhoneUrgeList";



const OverDuePhoneUrgeApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // [GET] 逾期電催列表
        getOverDuePhoneUrgeList: builder.query<GetOverDuePhoneUrgeListResponse, GetOverDuePhoneUrgeListQueryString>({
            query: (requestBody: GetOverDuePhoneUrgeListQueryString) => ({
                url: '/collect-overdue/phone-urge/list',
                params: requestBody,
                method: 'get'
            })
        })
    })
})

export const {
    useLazyGetOverDuePhoneUrgeListQuery
} = OverDuePhoneUrgeApi;
