import { API } from "./index";
import { UserQuotaLabelSelect } from "./commonSelectTypes/getUserQuotaLabelSelect";

const UserQuotaLabelApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs​/admin​/user-quota-label​/drop-menu 額度標籤下拉選單
        getUserQuotaLabelSelect: builder.query<UserQuotaLabelSelect, null>({
            query: () => ({
                url: `/user-quota-label/drop-menu`,
                params: {},
                method: "get",
            }),
        }),
    })
});
export const {
    useLazyGetUserQuotaLabelSelectQuery
} = UserQuotaLabelApi;
