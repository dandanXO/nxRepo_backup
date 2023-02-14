import {API} from "../../shared/api";
import {
    CollectDistributionQueryRequest,
    CollectDistributionQueryResponse,
    CollectDistributionSummaryResponse, DistributeCollectByStageResponse,
    Page,
    ProductNameOptions, SelectedDistributionRequest, StageDistributionRequest
} from "../types/index";

export const OverdueDistributionAPI = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: 获取全部催收數據
        getOverdueSummary: builder.query<CollectDistributionSummaryResponse, null>({
            query: () => ({
                url: `/collect-overdue/distribution/summary`,
                params: null,
                method: "get",
            }),
        }),
        // NOTICE: REFACTOR ME : it will be moved to shared module
        // NOTE: 产品列表下拉选单
        getOverdueProductNames: builder.query<ProductNameOptions[], null>({
            query: () => ({
                url: `/commons/product-names`,
                method: "get",
            }),
        }),
        // NOTE: 查詢未分配的訂單
        getOverdueDistribution: builder.query<Page<CollectDistributionQueryResponse>, CollectDistributionQueryRequest>({
            query: (requestBody: CollectDistributionQueryRequest) => ({
                url: `/collect-overdue/distribution`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTE: 催收人員列表 - 获取催收阶段的催收员(依照催收階段)
        getOverdueCollector: builder.query<DistributeCollectByStageResponse[], null>({
            query: () => ({
                url: `/collect-overdue/stage`,
                method: "get",
            }),
        }),
        // NOTE: 依催收階段分配訂單
        postOverdueDistributionStage: builder.mutation<null, StageDistributionRequest>({
            query: (requestBody: StageDistributionRequest ) => ({
                url: `/collect-overdue/distribution-stage`,
                method: "post",
                data: requestBody,
            }),
        }),
        // NOTE: 自選訂單分配
        postOverdueDistributionSelected: builder.mutation<null, SelectedDistributionRequest>({
            query: (requestBody: SelectedDistributionRequest ) => ({
                url: `/collect-overdue/distribution-selected`,
                method: "post",
                data: requestBody,
            }),
        }),

    })
})

export const {
    useLazyGetOverdueSummaryQuery,
    useLazyGetOverdueDistributionQuery,
    useGetOverdueProductNamesQuery,
    usePostOverdueDistributionSelectedMutation,
    usePostOverdueDistributionStageMutation,
    useLazyGetOverdueCollectorQuery,
} = OverdueDistributionAPI
