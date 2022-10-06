import { API } from "../../../api";
import { GetUerListProps, GetUserListRequestQuerystring } from "./types/getUserList";
import { GetChannelListResponse } from "./types/getChannelList";
import { GetUserInfoRequestQuerystring, GetUserSmsProps } from "./types/getUserInfo";
import { GetUserDetailResponse, GetUserDetailRequestQuerystring } from "./types/getUserDetail";

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
    })
})
export const {
    useLazyGetUserManageListQuery,
    useGetUserDetailQuery,
    useGetChannelListQuery,
    useGetUserSMSListQuery
} = UserApi;
