import { API } from "./index";
import { ProviderSelect } from "./commonSelectTypes/getProviderSelect";

const ProviderListApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs​/admin​/order-review​/provider-menu 風控配置應用下拉選單
        getProviderList: builder.query<ProviderSelect, null>({
            query: () => ({
                url: `/order-review/provider-menu`,
                params: {},
                method: "get",
            }),
        }),
    })
});
export const {
    useGetProviderListQuery,
    useLazyGetProviderListQuery
} = ProviderListApi;
