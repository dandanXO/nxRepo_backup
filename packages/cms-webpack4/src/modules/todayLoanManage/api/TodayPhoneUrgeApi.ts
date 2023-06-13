import { API } from "../../shared/api";
import {
    GetTodayPhoneUrgeListQueryString,
    GetTodayPhoneUrgeListResponse,
} from "./types/getTodayPhoneUrgeList";


const TodayPhoneUrgeApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // [GET] 當日電催列表
        getTodayPhoneUrgeList: builder.query<GetTodayPhoneUrgeListResponse, GetTodayPhoneUrgeListQueryString>({
            query: (requestBody: GetTodayPhoneUrgeListQueryString) => ({
                url: '/collect-today/phone-urge/list',
                params: requestBody,
                method: 'get'
            })
        })
    })
})

export const {
    useLazyGetTodayPhoneUrgeListQuery
} = TodayPhoneUrgeApi;
