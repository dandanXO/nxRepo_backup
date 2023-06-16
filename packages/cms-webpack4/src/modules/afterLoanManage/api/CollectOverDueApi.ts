import { API } from "../../shared/api";
import {GetCollectOverDueCollectorListResponse} from "./types/getCollectOverDueCollectorList";
import {
    GetCollectOverDueOrderDetailQueryString,
    GetCollectOverDueOrderDetailResponse
} from "./types/getCollectOverDueOrderDetail";
import {
    GetCollectOverDueUserDetailQueryString,
    GetCollectOverDueUserDetailResponse
} from "./types/getCollectOverDueUserDetail";
import {
    GetCollectOverDueUrgeRecordQueryString,
    GetCollectOverDueUrgeRecordResponse
} from "./types/getCollectOverDueUrgeRecord";
import {
    GetCollectOverDueContactListQueryString,
    GetCollectOverDueContactListResponse
} from "./types/getCollectOverDueContactList";
import {GetCollectOverDueSMSLogsQueryString, GetCollectOverDueSMSLogsResponse} from "./types/getCollectOverDueSMSLogs";


const CollectOverDueApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // [GET] 获取催收阶段的催收员
        getCollectOverDueCollectorList: builder.query<GetCollectOverDueCollectorListResponse, null>({
            query: () => ({
                url: '/collect-overdue/collector',
                method: 'get'
            })
        }),
        // [GET] 逾期單詳情
        getCollectOverDueOrderDetail: builder.query<GetCollectOverDueOrderDetailResponse, GetCollectOverDueOrderDetailQueryString>({
            query: (requestBody: GetCollectOverDueOrderDetailQueryString) => ({
                url: `/collect-overdue/detail/${requestBody.collectId}`,
                method: 'get'
            })
        }),
        // [GET] 用戶信息
        getCollectOverDueUserDetail: builder.query<GetCollectOverDueUserDetailResponse, GetCollectOverDueUserDetailQueryString>({
            query: (requestBody: GetCollectOverDueUserDetailQueryString) => ({
                url: `/collect-overdue/user-info/${requestBody.userId}`,
                method: 'get'
            })
        }),
        // [GET] 催收紀錄列表
        getCollectOverDueUrgeRecord: builder.query<GetCollectOverDueUrgeRecordResponse, GetCollectOverDueUrgeRecordQueryString>({
            query: (requestBody: GetCollectOverDueUrgeRecordQueryString) => {
                const { collectId, ...rest} = requestBody;
                return ({
                    url: `/collect-overdue/collect-records/${collectId}`,
                    params: rest,
                    method: 'get'
                })
            }
        }),
        // [GET] 通讯录
        getCollectOverDueContactList: builder.query<GetCollectOverDueContactListResponse, GetCollectOverDueContactListQueryString>({
            query: (requestBody: GetCollectOverDueContactListQueryString) => {
                return ({
                    url: `/collect-overdue/user-contacts`,
                    params: requestBody,
                    method: 'get'
                })
            }
        }),
        // [GET] 短信记录
        getCollectOverDueSMSLog: builder.query<GetCollectOverDueSMSLogsResponse, GetCollectOverDueSMSLogsQueryString>({
            query: (requestBody: GetCollectOverDueSMSLogsQueryString) => {
                return ({
                    url: `/collect-overdue/user-sms-logs`,
                    params: requestBody,
                    method: 'get'
                })
            }
        })
    })
})

export const {
    useGetCollectOverDueCollectorListQuery,
    useGetCollectOverDueUserDetailQuery,
    useGetCollectOverDueOrderDetailQuery,
    useLazyGetCollectOverDueUrgeRecordQuery,
    useLazyGetCollectOverDueContactListQuery,
    useLazyGetCollectOverDueSMSLogQuery,
} = CollectOverDueApi;
