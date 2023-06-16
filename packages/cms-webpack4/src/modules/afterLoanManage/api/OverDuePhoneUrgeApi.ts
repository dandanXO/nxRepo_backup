import { API } from "../../shared/api";
import {
    GetCollectOverDuePhoneUrgeListQueryString,
    GetCollectOverDuePhoneUrgeListResponse
} from "./types/getCollectOverDuePhoneUrgeList";
import {
    PostCollectOverDuePhoneUrgeRecordRequest,
    PostCollectOverDuePhoneUrgeRecordResponse
} from "./types/postCollectOverDuePhoneUrgeRecord";

const CollectOverDuePhoneUrgeApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // [GET] 逾期電催列表
        getCollectOverDuePhoneUrgeList: builder.query<GetCollectOverDuePhoneUrgeListResponse, GetCollectOverDuePhoneUrgeListQueryString>({
            query: (requestBody: GetCollectOverDuePhoneUrgeListQueryString) => ({
                url: '/collect-overdue/phone-urge/list',
                params: requestBody,
                method: 'get'
            })
        }),
        // [POST] 新增逾期催收紀錄
        postCollectOverDuePhoneUrgeRecord: builder.mutation<PostCollectOverDuePhoneUrgeRecordResponse, PostCollectOverDuePhoneUrgeRecordRequest>({
            query: (requestBody: PostCollectOverDuePhoneUrgeRecordRequest) => ({
                url: '/collect-overdue/collect-records',
                method: 'post',
                data: requestBody
            })
        })
    })
})

export const {
    useLazyGetCollectOverDuePhoneUrgeListQuery,
    usePostCollectOverDuePhoneUrgeRecordMutation
} = CollectOverDuePhoneUrgeApi;
