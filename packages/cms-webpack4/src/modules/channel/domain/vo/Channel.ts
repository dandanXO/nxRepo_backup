export interface Channel {
    addTime: number;
    // 添加时间

    appName: string;
    // 包名

    campaign: string;

    downloadLink: string;

    enabled: number;
    // 是否启用

    encryptUrl: string;

    id: number;
    // 渠道 ID

    modelId: number;
    // 风控模块名ID

    name: string;
    // 渠道名称

    operatorId: number;

    packageId: string;
    // app的 package id, 配置標籤

    publishId: string;
    // 配置標籤ID

    updateTime: number;
    // 異動时间

    url: string;
    // 下載鏈結
}
