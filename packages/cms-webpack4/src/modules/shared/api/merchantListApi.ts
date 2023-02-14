import { API } from "./index";
import { GetAvailableMerchantResponse } from "./types/getAvailableMerchantList";

const MerchantListApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/merchant-manage/available 可用商户
        getMerchantList: builder.query<GetAvailableMerchantResponse[], null>({
            query: () => ({
                url: `/merchant-manage/available`,
                method: "get",
            }),
        }),
    })
})
export const {
    useLazyGetMerchantListQuery,
    useGetMerchantListQuery
} = MerchantListApi;
