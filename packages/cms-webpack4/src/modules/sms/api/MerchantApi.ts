import { API } from "../../../api";
import { PostMerchantCreateRequestBody } from "./postMerchantCreate";
import { PutMerchantProps } from "./putMerchant";

const MerchantApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
       
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
    usePostMerchantCreateMutation,
    usePutMerchantEditMutation
} = MerchantApi;
