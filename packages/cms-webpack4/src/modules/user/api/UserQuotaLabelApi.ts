import { API } from "../../shared/api";
import { GetUserQuotaLabelListProps, GetUserQuotaLabelListRequestQuerystring } from "./types/userQuotaLabelTypes/getUserQuotaLabelList";
import { PostUserQuotaLabelRequestBody } from "./types/userQuotaLabelTypes/postUserQuotaLabel";
import { PutUserQuotaLabelRequestBody } from "./types/userQuotaLabelTypes/putUserQuotaLabel";
import { DeletetUserQuotaLabelQuery } from "./types/userQuotaLabelTypes/deleteUserQuotaLabel";

const UserQuotaLabelApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/user-quota-label 查詢全部 - 額度標籤
        getUserQuotaLabelList: builder.query<GetUserQuotaLabelListProps, GetUserQuotaLabelListRequestQuerystring>({
            query: (requestBody: GetUserQuotaLabelListRequestQuerystring) => ({
                url: `/user-quota-label`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTE: POST /hs/admin/user-quota-label 新增 - 額度標籤
        postUserQuotaLabel: builder.mutation<{}, PostUserQuotaLabelRequestBody>({
            query: (requestBody: PostUserQuotaLabelRequestBody) => ({
                url: `/user-quota-label`,
                method: "post",
                data: requestBody,
            }),
        }),
        // NOTE: PUT /hs/admin/user-quota-label 修改 - 額度標籤
        putUserQuotaLabel: builder.mutation<{}, PutUserQuotaLabelRequestBody>({
            query: (requestBody: PutUserQuotaLabelRequestBody) => ({
                url: `/user-quota-label`,
                method: "put",
                data: requestBody,
            }),
        }),
        // NOTE: DELTETE /hs/admin/user-quota-label 刪除 - 額度標籤
        deleteUserQuotaLabel: builder.mutation<{}, DeletetUserQuotaLabelQuery>({
            query: ({id}: DeletetUserQuotaLabelQuery) => ({
                url: `/user-quota-label/${id}`,
                method: "delete",
                // params: arg,
            }),
        }),
    })
})
export const {
    useLazyGetUserQuotaLabelListQuery,
    usePostUserQuotaLabelMutation,
    usePutUserQuotaLabelMutation,
    useDeleteUserQuotaLabelMutation
} = UserQuotaLabelApi;
