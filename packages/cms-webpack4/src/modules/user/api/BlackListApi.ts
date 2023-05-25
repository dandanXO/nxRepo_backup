import { API } from "../../shared/api";
import { GetBlackListProps,GetBlackListRequestQuerystring } from "./types/blackListTypes/getBlackList";
import { PostBlackListRequestBody } from "./types/userTypes/postBlackList";
const BlackListApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/black-list 获取全部黑名单列表
        getBlackList: builder.query<GetBlackListProps, GetBlackListRequestQuerystring>({
            query: (requestBody: GetBlackListRequestQuerystring) => ({
                url: `/black-list`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTE: POST /hs/admin/black-list/batch 批次新增黑名單
        postBlackList: builder.mutation<null, PostBlackListRequestBody>({
            query: (requestBody: PostBlackListRequestBody) => ({
                url: `/black-list/batch`,
                method: "post",
                data: requestBody,
            }),
        }),

    })
});
export const {
    useLazyGetBlackListQuery,
    usePostBlackListMutation

} = BlackListApi;
