import { API } from "../../shared/api";
import {
    GetCollectTodayOrderDetailQueryString,
    GetCollectTodayOrderDetailResponse
} from "./types/getCollectTodayOrderDetail";
import {
    GetCollectTodayContactListQueryString,
    GetCollectTodayContactListResponse
} from "./types/getCollectTodayContactList";
import {GetCollectTodayCollectorListResponse} from "./types/getCollectTodayCollectorList";
import {
    GetCollectTodayCollectRecordQueryString,
    GetCollectTodayCollectRecordResponse
} from "./types/getCollectTodayCollectRecord";
import {GetCollectTodaySMSLogsQueryString, GetCollectTodaySMSLogsResponse} from "./types/getCollectTodaySMSLogs";
import {
    GetCollectTodayUserDetailQueryString,
    GetCollectTodayUserDetailResponse
} from "./types/getCollectTodayUserDetail";


const CollectTodayApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // [GET] 获取當日催收阶段的催收员列表
        getTodayCollectorList: builder.query<GetCollectTodayCollectorListResponse, null>({
            query: () => ({
                url: '/collect-today/collector',
                method: 'get'
            })
        }),
        // [GET] 获取當日催收訂單詳情
        getCollectTodayOrderDetail: builder.query<GetCollectTodayOrderDetailResponse, GetCollectTodayOrderDetailQueryString>({
            query: (requestBody: GetCollectTodayOrderDetailQueryString) => ({
                url: `/collect-today/detail/${requestBody.collectId}`,
                method: 'get'
            })
        }),
        // [GET] 获取當日催收使用者詳情
        getCollectTodayUserDetail: builder.query<GetCollectTodayUserDetailResponse, GetCollectTodayUserDetailQueryString>({
            query: (requestBody: GetCollectTodayUserDetailQueryString) => ({
                url: `/collect-today/user-info/${requestBody.userId}`,
                method: 'get'
            })
        }),
        // [GET] 获取當日催收催收紀錄
        getCollectTodayCollectRecord: builder.query<GetCollectTodayCollectRecordResponse, GetCollectTodayCollectRecordQueryString>({
            query: (requestBody: GetCollectTodayCollectRecordQueryString) => {
                const { collectId, ...rest} = requestBody;
                return ({
                    url: `/collect-today/collect-records/${collectId}`,
                    params: rest,
                    method: 'get'
                })
            }
        }),
        // [GET] 获取當日催收通讯录
        getCollectTodayContactList: builder.query<GetCollectTodayContactListResponse, GetCollectTodayContactListQueryString>({
            query: (requestBody: GetCollectTodayContactListQueryString) => {
                return ({
                    url: `/collect-today/user-contacts`,
                    params: requestBody,
                    method: 'get'
                })
            }
        }),
        // [GET] 获取當日催收短信记录
        getCollectTodaySMSLog: builder.query<GetCollectTodaySMSLogsResponse, GetCollectTodaySMSLogsQueryString>({
            query: (requestBody: GetCollectTodaySMSLogsQueryString) => {
                return ({
                    url: `/collect-today/user-sms-logs`,
                    params: requestBody,
                    method: 'get'
                })
            }
        })
    })
})

export const {
    useGetTodayCollectorListQuery,
    useGetCollectTodayUserDetailQuery,
    useGetCollectTodayOrderDetailQuery,
    useLazyGetCollectTodayCollectRecordQuery,
    useLazyGetCollectTodayContactListQuery,
    useLazyGetCollectTodaySMSLogQuery
} = CollectTodayApi;
