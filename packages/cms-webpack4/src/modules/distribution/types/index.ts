export interface Page<T> {
    currentPage: number;
    pageSize: number;
    records: T[];
    totalPage: number;
    totalRecords: number;
}

export interface PageRequest {
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
}

export type CollectDistributionQueryRequest  = {
    appName?: string;
    merchantId?: number;
    orderNo?: string;
    phoneNo?: string;
    productId?: number;
    stage: Stage;
    userName?: string;
    expireEndTime?: string;
    expireStartTime?: string;
} & PageRequest;

export interface CollectDistributionQueryResponse {
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

export interface DistributeCollectByStageResponse {
    merchants: DistributeCollectGroupByMerchant[];
    stage: Stage;
}

export interface DistributeCollectGroupByMerchant {
    merchant: string;
    // 商户名

    merchantId: number;
    // 商户ID

    teams: DistributeCollectGroupByTeam[];
}

export interface DistributeCollectGroupByTeam {
    collectors: DistributionCollector[];
    team: string;
}

export interface DistributionCollector {
    collectGroup: string;
    // 催收颓团队组

    collectTeam: string;
    // 催收团队

    collectorId: number;
    // 催收员ID

    collectorName: string;
    // 催收员名称
}

export interface CollectDistributionSummaryResponse {
    summaries: DistributionSummary[];
}

export interface DistributionSummary {
    doneTotal: number;
    // 已分案数量
    // stage: Stage;
    stage: string;
    // 催收阶段
    todoTotal: number;
    // 待分案数量
}

export enum Stage {
    NONE = "NONE",
    S1 = "S1",
    S2 = "S2",
    S3 = "S3",
    S4 = "S4",
    S5 = "S5",
    T0 = "T0",
    T_1 = "T_1"
}

export interface StageDistributionRequest {
    collectorIds: number[];
    stage: Stage;
}

export interface SelectedDistributionRequest {
    collectorIds: number[];
    orderIds: number[];
}

export interface ProductNameOptions {
    productId: number;
    productName: string;
}

