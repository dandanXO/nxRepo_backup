import { API } from "./index";
import { GetUserInfoRequestQuerystring } from "./userInfoTypes/getUserInfoRequestString";
import { GetUserDetailResponse, GetUserDetailRequestQuerystring } from "./userInfoTypes/getUserDetail";
import { GetUserSmsProps } from "./userInfoTypes/getUserSms";
import { GetUserContactsProps } from "./userInfoTypes/getUserContacts";
import { GetUserOrdersProps } from "./userInfoTypes/getUserOrders";
import { GetOrderDetailResponse ,GetOrderDetailRequestQuerystring} from "./userInfoTypes/getOrderDetail";

const UserInfoApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET //hs/admin/user-manage/user-detail 用戶信息
        getUserDetail: builder.query<GetUserDetailResponse, GetUserDetailRequestQuerystring>({
            query: (requestBody: GetUserDetailRequestQuerystring) => ({
                url: `/user-manage/user-detail`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTE: GET /hs/admin/user-manage/user-sms-logs 短信记录
        getUserSMSList: builder.query<GetUserSmsProps, GetUserInfoRequestQuerystring>({
            query: (requestBody: GetUserInfoRequestQuerystring) => ({
                url: `/user-manage/user-sms-logs`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTE: GET /hs/admin/user-manage/user-contacts 通讯录
        getUserContactsList: builder.query<GetUserContactsProps, GetUserInfoRequestQuerystring>({
            query: (requestBody: GetUserInfoRequestQuerystring) => ({
                url: `/user-manage/user-contacts`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTE: GET ​/hs​/admin​/user-manage/orders 借款信息
        getUserOrdersList: builder.query<GetUserOrdersProps, GetUserInfoRequestQuerystring>({
            query: (requestBody: GetUserInfoRequestQuerystring) => ({
                url: `/user-manage/orders`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTE: GET /hs/admin/order/detail/{orderId} 訂單詳情
        getOrderDetail: builder.query<GetOrderDetailResponse, GetOrderDetailRequestQuerystring>({
            query: ({orderId}: GetOrderDetailRequestQuerystring) => ({
                url: `/order/detail/${orderId}`,
                params: {},
                method: "get",
            }),
        }),
    })
})
export const {
    useGetUserDetailQuery,
    useGetUserSMSListQuery,
    useGetUserContactsListQuery,
    useGetUserOrdersListQuery,
    useGetOrderDetailQuery,

    useLazyGetUserContactsListQuery,
    useLazyGetUserSMSListQuery,
    useLazyGetUserOrdersListQuery,
    useLazyGetOrderDetailQuery
} = UserInfoApi;
