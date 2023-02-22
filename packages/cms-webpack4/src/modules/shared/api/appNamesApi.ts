import { API } from "./index";

const AppNamesApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/commons/app-names 取得APP名稱
        getAppNames: builder.query<string[], null>({
            query: () => ({
                url: `/commons/app-names`,
                params: {},
                method: "get",
            }),
        }),
    })
})
export const {
    useLazyGetAppNamesQuery
} = AppNamesApi;
