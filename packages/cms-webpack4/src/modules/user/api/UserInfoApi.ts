import { API } from "../../../api";
import { GetUserInfoRequestQuerystring } from "./types/userInfoTypes/getUserInfoRequestString";
import { GetUserDetailResponse, GetUserDetailRequestQuerystring } from "./types/userInfoTypes/getUserDetail";
import { GetUserSmsProps } from "./types/userInfoTypes/getUserSms";
import { GetUserContactsProps } from "./types/userInfoTypes/getUserContacts";
import { GetUserOrdersProps } from "./types/userInfoTypes/getUserOrders";


const UserInfoApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/userDetails/user-detail 用戶信息
        getUserDetail: builder.query<GetUserDetailResponse, GetUserDetailRequestQuerystring>({
            query: (requestBody: GetUserDetailRequestQuerystring) => ({
                url: `/userDetails/user-detail`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTE: GET /hs/admin/userDetails/find-user-sms-logs 短信记录
        getUserSMSList: builder.query<GetUserSmsProps, GetUserInfoRequestQuerystring>({
            query: (requestBody: GetUserInfoRequestQuerystring) => ({
                url: `/userDetails/find-user-sms-logs`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTE: GET /hs/admin/userDetails/user-contacts 通讯录
        getUserContactsList: builder.query<GetUserContactsProps, GetUserInfoRequestQuerystring>({
            query: (requestBody: GetUserInfoRequestQuerystring) => ({
                url: `/userDetails/user-contacts`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTE: GET ​/hs​/admin​/userDetails​/orders 借款信息
        getUserOrdersList: builder.query<GetUserOrdersProps, GetUserInfoRequestQuerystring>({
            query: (requestBody: GetUserInfoRequestQuerystring) => ({
                url: `/userDetails/orders`,
                params: requestBody,
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
} = UserInfoApi;
