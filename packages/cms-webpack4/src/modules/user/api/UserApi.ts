import { API } from "../../../api";
import { GetUerListProps, GetUserListRequestQuerystring } from "./types/getUserList";
import { GetChannelListResponse } from "./types/getChannelList";
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
        // NOTE: GET /hs/admin/channel/drop-menu 渠道列表下拉選單
        getChannelList: builder.query<GetChannelListResponse, null>({
            query: () => ({
                url: `/channel/drop-menu`,
                params: {},
                method: "get",
            }),
        }),
    })
})
export const {
    useLazyGetUserManageListQuery,
    useGetChannelListQuery
} = UserApi;
