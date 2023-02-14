import {API} from "../../shared/api";
import {
    CollectDistributionQueryRequest,
    CollectDistributionQueryResponse,
    CollectDistributionSummaryResponse, DistributeCollectByStageResponse,
    Page,
    ProductNameOptions,
    SelectedDistributionRequest,
    StageDistributionRequest
} from "../types";

export const TodayDistributionAPI = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: 获取全部催收數據
        getSummary: builder.query<CollectDistributionSummaryResponse, null>({
            query: () => ({
                url: `/collect-today/distribution/summary`,
                params: null,
                method: "get",
            }),
        }),
        // NOTICE: REFACTOR ME : it will be moved to shared module
        // NOTE: 产品列表下拉选单
        getProductNames: builder.query<ProductNameOptions[], null>({
            query: () => ({
                url: `/commons/product-names`,
                method: "get",
            }),
        }),
        // NOTE: 查詢未分配的訂單
        getDistribution: builder.query<Page<CollectDistributionQueryResponse>, CollectDistributionQueryRequest>({
            query: (requestBody: CollectDistributionQueryRequest) => ({
                url: `/collect-today/distribution`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTE: 催收人員列表 - 获取催收阶段的催收员(依照催收階段)
        getCollector: builder.query<DistributeCollectByStageResponse[], null>({
            query: () => ({
                url: `/collect-today/stage`,
                method: "get",
            }),
        }),
        // NOTE: 自選訂單分配
        postDistributionSelected: builder.mutation<null, SelectedDistributionRequest>({
            query: (requestBody: SelectedDistributionRequest) => ({
                url: `/collect-today/distribution-selected`,
                method: "post",
                data: requestBody,
            }),
        }),
        // NOTE: 依催收階段分配訂單
        postDistributionStage: builder.mutation<null, StageDistributionRequest>({
            query: (requestBody: StageDistributionRequest) => ({
                url: `/collect-today/distribution-stage`,
                method: "post",
                data: requestBody,
            }),
        }),

    })
})


export const {
    useLazyGetSummaryQuery,
    useLazyGetDistributionQuery,
    useGetProductNamesQuery,
    useLazyGetCollectorQuery,
    usePostDistributionSelectedMutation,
    usePostDistributionStageMutation,
} = TodayDistributionAPI
