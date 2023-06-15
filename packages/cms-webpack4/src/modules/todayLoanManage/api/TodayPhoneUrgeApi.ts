import { API } from "../../shared/api";
import {
    GetTodayPhoneUrgeListQueryString,
    GetTodayPhoneUrgeListResponse,
} from "./types/getTodayPhoneUrgeList";
import {PostTodayPhoneUrgeRecordRequest} from "./types/postTodayPhoneUrgeRecord";


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
        }),
        // [POST] 新增當日催收紀錄
        postTodayPhoneUrgeRecord: builder.mutation<{}, PostTodayPhoneUrgeRecordRequest>({
            query: (requestBody: PostTodayPhoneUrgeRecordRequest) => ({
                url: '',
                method: 'post',
                data: requestBody
            })
        })
    })
})

export const {
    useLazyGetTodayPhoneUrgeListQuery,
    usePostTodayPhoneUrgeRecordMutation
} = TodayPhoneUrgeApi;
