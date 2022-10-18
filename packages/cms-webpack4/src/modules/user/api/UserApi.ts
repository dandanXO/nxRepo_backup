import { API } from "../../../api";
import { GetUerListProps,GetUserListRequestQuerystring } from "./types/userTypes/getUserList";
import { PostBlackListRequestBody } from "./types/userTypes/postBlackList";
import { UserId } from "../../../types/UserId";
import { PostTelSaleRequestQuerystring } from './types/userTypes/postTelSale';
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
        // NOTE: POST /hs/admin/user-manage/black-list/add 添加用户至黑名单
        postBlackListAdd: builder.mutation<{}, PostBlackListRequestBody>({
            query: (requestBody: PostBlackListRequestBody) => ({
                url: `/user-manage/black-list/add`,
                method: "post",
                data: requestBody,
            }),
        }),
        // NOTE: DELTETE /hs​/admin​/user-manage​/user 根据用户id移除
        deleteUser: builder.mutation<{}, UserId>({
            query: (requestBody: UserId) => ({
                url: `/user-manage/user`,
                method: "delete",
                data: requestBody,
            }),
        }),
        // NOTE: POST ​/hs​/admin​/user-manage​/user-ban 根据用户id永久禁止登陆app
        postUserBan: builder.mutation<{}, UserId>({
            query: (requestBody: UserId) => ({
                url: `/user-manage/user-ban`,
                method: "post",
                data: requestBody,
            }),
        }),
        // NOTE: POST ​/hs​/admin​/user-manage​/tel-sale 批次加入到電銷名單
        postTelSale: builder.mutation<{}, PostTelSaleRequestQuerystring>({
            query: (requestBody: PostTelSaleRequestQuerystring) => ({
                url: `/user-manage/tel-sale`,
                method: "post",
                data: requestBody,
            }),
        }),
    })
})
export const {
    useLazyGetUserManageListQuery,
    usePostBlackListAddMutation,
    useDeleteUserMutation,
    usePostUserBanMutation,
    usePostTelSaleMutation
} = UserApi;
