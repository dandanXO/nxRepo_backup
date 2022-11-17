export interface UpdateChannelRequest {
    enabled: number;
    // 是否启用

    id: number;

    modelId: string;
    // 风控方案  ID

    name: string;
    // 渠道名称

    publishId: number;
    // 配置標籤ID
}
