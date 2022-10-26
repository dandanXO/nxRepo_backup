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

    modelName: string;
    // 風控方案

    name: string;
    // 渠道名称

    operatorId: number;

    packageId: string;
    // app的 package id, 配置標籤

    publishName: string;
    // 配置標籤

    updateTime: number;
    // 異動时间

    url: string;
    // 下載鏈結
}
