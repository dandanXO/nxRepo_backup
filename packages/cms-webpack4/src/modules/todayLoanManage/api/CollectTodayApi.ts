import { API } from "../../shared/api";
import { GetTodayCollectorListResponse } from "./types/getTodayCollectorList";
import {GetOrderDetailQueryString, GetOrderDetailResponse} from "./types/getOrderDetail";
import {GetUserDetailQueryString, GetUserDetailResponse} from "./types/getUserDetail";


const CollectTodayApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // [GET] 获取當日催收阶段的催收员列表
        getTodayCollectorList: builder.query<GetTodayCollectorListResponse, null>({
            query: () => ({
                url: '/collect-today/collector',
                method: 'get'
            })
        }),
        // [GET] 获取當日催收訂單詳情
        getCollectTodayOrderDetail: builder.query<GetOrderDetailResponse, GetOrderDetailQueryString>({
            query: (requestBody: GetOrderDetailQueryString) => ({
                url: `/collect-overdue/detail/${requestBody.orderId}`,
                method: 'get'
            })
        }),
        // [GET] 获取當日催收使用者詳情
        getCollectTodayUserDetail: builder.query<GetUserDetailResponse, GetUserDetailQueryString>({
            query: (requestBody: GetUserDetailQueryString) => ({
                url: '/collect-today/user-detail',
                params: requestBody,
                method: 'get'
            })
        })
    })
})

export const {
    useGetTodayCollectorListQuery,
    useGetCollectTodayUserDetailQuery,
    useGetCollectTodayOrderDetailQuery
} = CollectTodayApi;
