import { API } from "./index";
import { AvailableMerchantSelect } from "./commonSelectTypes/getAvailableMerchantSelect";

const MerchantListApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/merchant-manage/available 可用商户
        getMerchantList: builder.query<AvailableMerchantSelect, null>({
            query: () => ({
                url: `/merchant-manage/available`,
                method: "get",
            }),
        }),
    })
});
export const {
    useLazyGetMerchantListQuery,
    useGetMerchantListQuery
} = MerchantListApi;
