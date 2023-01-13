import {API} from "../../../api";

interface Page<T> {
    currentPage: number;
    pageSize: number;
    records: T[];
    totalPage: number;
    totalRecords: number;
}

interface PageRequest {
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
}

type CollectDistributionQueryRequest  = {
    appName?: string;
    merchantId?: number;
    orderNo?: string;
    phoneNo?: string;
    productId?: number;
    stage: Stage;
    userName?: string;
} & PageRequest;

interface CollectDistributionQueryResponse {
    appName: string;
    // APP NAME

    deviceMoney: number;
    // 借款合同金額

    expireTime: string;
    // 到期時間

    id: number;
    // 催收訂單流水號

    lengNum: number;
    // 展期次數

    merchantName: string;
    // 商戶名稱

    orderId: number;
    // 訂單號ID

    orderNo: string;
    // 訂單號

    phoneNo: string;
    // 電話

    productName: string;
    // 產品名稱

    userName: string;
    // 用姓名
}

interface DistributeCollectByStageResponse {
    merchants: DistributeCollectGroupByMerchant[];
    stage: Stage;
}

interface DistributeCollectGroupByMerchant {
    merchant: string;
    // 商户名

    merchantId: number;
    // 商户ID

    teams: DistributeCollectGroupBy[];
}

interface DistributeCollectGroupBy {
    collectors: DistributionCollector;
    team: string;
}

interface DistributionCollector {
    collectGroup: string;
    // 催收颓团队组

    collectTeam: string;
    // 催收团队

    collectorId: number;
    // 催收员ID

    collectorName: string;
    // 催收员名称
}

interface CollectDistributionSummaryResponse {
    summaries: DistributionSummary[];
}

interface DistributionSummary {
    doneTotal: number;
    // 已分案数量

    stage: Stage;
    // 催收阶段
    todoTotal: number;
    // 待分案数量
}

interface CollectDistributionSummaryResponse {
    summaries: DistributionSummaryDistributionSummary[];
}

export interface DistributionSummaryDistributionSummary {
    doneTotal: number;
    stage:  Stage;
    todoTotal: number;
}

export enum Stage {
    NONE,
    S1 = "S1",
    S2 = "S2",
    S3 = "S3",
    S4 = "S4",
    T0 = "T0",
    T_1 = "T_1"
}

interface StageDistributionRequest {
    collectorIds: number[];
    stage: Stage;
}

interface SelectedDistributionRequest {
    collectorIds: number[];
    orderIds: number[];
}

interface ProductNameOptions {
    productId: number;
    productName: string;
}

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
        getCollector: builder.query<DistributeCollectByStageResponse, null>({
            query: () => ({
                url: `/collect-today/stage`,
                method: "get",
            }),
        }),
        // NOTE: 依催收階段分配訂單
        postDistributionStage: builder.query<StageDistributionRequest, null>({
            query: (requestBody: StageDistributionRequest ) => ({
                url: `/collect-today/distribution-stage`,
                method: "post",
                data: requestBody,
            }),
        }),
        // NOTE: 自選訂單分配
        postDistributionSelected: builder.query<SelectedDistributionRequest, null>({
            query: (requestBody: SelectedDistributionRequest ) => ({
                url: `/collect-today/distribution-selected`,
                method: "post",
                data: requestBody,
            }),
        }),

    })
})

export const {
    useLazyGetSummaryQuery,
    useLazyGetDistributionQuery,
    useLazyGetCollectorQuery,
    useLazyPostDistributionStageQuery,
    useLazyPostDistributionSelectedQuery,
    useLazyGetProductNamesQuery,
} = TodayDistributionAPI
