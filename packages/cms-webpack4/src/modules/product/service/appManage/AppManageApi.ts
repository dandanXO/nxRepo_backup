import { API } from "../../../../api";
import {GetAllAppConfigurationResponse} from "./request/GetAllAppConfigurationResponse";
import {GetAppConfigurationResponse} from "./response/GetAppConfigurationResponse";
import {GetAppConfigurationRequest} from "./request/GetAppConfigurationRequest";
import {CreateAppConfigurationRequest} from "./request/CreateAppConfigurationRequest";
import {UpdateAppConfigurationRequest} from "./request/UpdateAppConfigurationRequest";
import {DeleteAppConfigurationRequest} from "./request/DeleteAppConfigurationRequest";

const AppManageApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: APP 參數配置
        // 查詢 APP 参数配置
        getAllAppConfiguration: builder.query<GetAllAppConfigurationResponse, {}>({
            query: () => ({
                url: `/app-manage/all`,
                method: "get",
                params: {},
            }),
        }),
        // 取得 APP 配置
        getAppConfiguration: builder.query<GetAppConfigurationResponse, {}>({
            query: (arg: GetAppConfigurationRequest) => ({
                url: `/app-manage/${arg.id}`,
                method: "get",
            }),
        }),
        // 新增 APP 配置
        createAppConfiguration: builder.mutation<{}, CreateAppConfigurationRequest>({
            query: (arg: CreateAppConfigurationRequest) => ({
                url: `/app-manage`,
                method: "post",
                data: arg,
            })
        }),
        // 更新 APP 配置
        updateAppConfiguration: builder.mutation<{}, UpdateAppConfigurationRequest>({
            query: (arg: UpdateAppConfigurationRequest) => ({
                url: `/app-manage`,
                method: "put",
                data: arg,
            })
        }),
        // 刪除 APP 配置
        deleteAppConfiguration: builder.mutation<null, DeleteAppConfigurationRequest>({
            query: (arg: DeleteAppConfigurationRequest) => ({
                url: `/app-manage`,
                method: "delete",
                params: {},
                data: arg,
            }),
        }),
    })
})

export const {
    useLazyGetAllAppConfigurationQuery,
    useLazyGetAppConfigurationQuery,
    useCreateAppConfigurationMutation,
    useUpdateAppConfigurationMutation,
    useDeleteAppConfigurationMutation,
} = AppManageApi;
