import { API } from "../../../../api";
import { GetMerchantListResponseData } from "./types/getMerchantList";
import { PostMerchantCreateRequestBody } from "./types/postMerchantCreate";
import { PutMerchantProps } from "./types/putMerchant";

const MerchantApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/merchant-manage/list 商戶管理列表
        getMerchantManageList: builder.query<GetMerchantListResponseData, null>({
            query: () => ({
                url: `/merchant-manage/list`,
                params: {},
                method: "get",
            }),
        }),
        // NOTE: POST /hs/admin/merchant-manage/merchant 创建商戶
        postMerchantCreate: builder.mutation<{}, PostMerchantCreateRequestBody>({
            query: (requestBody: PostMerchantCreateRequestBody) => ({
                url: `/merchant-manage/merchant`,
                method: "post",
                data: requestBody,
            }),
        }),
        // NOTE: PUT /hs/admin/merchant-manage/merchant/{merchantId} 异动商戶
        putMerchantEdit: builder.mutation<{}, PutMerchantProps>({
            query: ({ merchantId, ...requestBody }: PutMerchantProps) => ({
                url: `/merchant-manage/merchant/${merchantId}`,
                method: "put",
                data: requestBody,
            }),
        }),
    })
})
export const {
    useLazyGetMerchantManageListQuery,
    usePostMerchantCreateMutation,
    usePutMerchantEditMutation
} = MerchantApi;
