import { API } from "../../../../shared/api";
import { GetConfigListResponse } from "./getConfigList";

const ConfigListApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/system-conf/group-by 参数配置设定列表
        getConfigList: builder.query<GetConfigListResponse, null>({
            query: () => ({
                url: `/system-conf/group-by`,
                params: {},
                method: "get",
            }),
        }),
    })
})
export const {
    useLazyGetConfigListQuery
} = ConfigListApi;
