export interface CreateChannelRequest {
    appName: string;
    // 包名

    enabled: number;
    // 是否启用

    modelName: string;
    // 风控方案

    name: string;
    // minLength: 0
    // maxLength: 16
    // 渠道名称

    packageId: string;
    // packageId

    publishId: number;
    // 配置標籤ID

    url: string;
    // 渠道鏈接

}
