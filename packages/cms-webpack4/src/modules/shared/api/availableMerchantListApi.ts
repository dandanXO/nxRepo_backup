import { API } from "../../../api";
import { GetAvailableMerchantResponse } from "./types/getAvailableMerchantList";

const AvailableMerchantListApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/merchant-manage/available 可用商户
        getAvailableMerchantList: builder.query<GetAvailableMerchantResponse[], null>({
            query: () => ({
                url: `/merchant-manage/available`,
                method: "get",
            }),
        }),
    })
})
export const {
    useGetAvailableMerchantListQuery
} = AvailableMerchantListApi;
