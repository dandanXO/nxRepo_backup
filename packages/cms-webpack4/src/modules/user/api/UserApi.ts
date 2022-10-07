import { API } from "../../../api";
import { GetUerListProps, GetUserListRequestQuerystring } from "./types/getUserList";
import { GetChannelListResponse } from "./types/getChannelList";
import { GetUserInfoRequestQuerystring, GetUserSmsProps, GetUserContactsProps, GetUserOrdersProps } from "./types/getUserInfo";
import { GetUserDetailResponse, GetUserDetailRequestQuerystring } from "./types/getUserDetail";
import { PostBlackListRequestBody } from "./types/postBlackList";

const UserApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET ​/hs​/admin​/user-manage​/user-list 获取用户列表
        getUserManageList: builder.query<GetUerListProps, GetUserListRequestQuerystring>({
            query: (requestBody: GetUserListRequestQuerystring) => ({
                url: `/user-manage/user-list`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTE: GET /hs/admin/userDetails/user-detail 用戶信息
        getUserDetail: builder.query<GetUserDetailResponse, GetUserDetailRequestQuerystring>({
            query: (requestBody: GetUserDetailRequestQuerystring) => ({
                url: `/userDetails/user-detail`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTE: GET /hs/admin/channel/drop-menu 渠道列表下拉選單
        getChannelList: builder.query<GetChannelListResponse, null>({
            query: () => ({
                url: `/channel/drop-menu`,
                params: {},
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
        // NOTE: POST /hs/admin/user-manage/black-list/add 添加用户至黑名单
        postBlackListAdd: builder.mutation<{}, PostBlackListRequestBody>({
            query: (requestBody: PostBlackListRequestBody) => ({
                url: `/user-manage/black-list/add`,
                method: "post",
                data: requestBody,
            }),
        }),
    })
})
export const {
    useLazyGetUserManageListQuery,
    useGetUserDetailQuery,
    useGetChannelListQuery,
    useGetUserSMSListQuery,
    useGetUserContactsListQuery,
    useGetUserOrdersListQuery,
    usePostBlackListAddMutation
} = UserApi;
