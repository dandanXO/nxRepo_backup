export interface GetAllChannelQueryRequest {
    // 包名
    appName?: string;
    // 狀態 (是否啟用)
    enabled?: boolean;
    // 渠道ID
    id?: number;
    // 風控方案
    modelName?: string;
    // 渠道名稱
    name?: string;
    // 配置標籤
    publishId?: number;
}
