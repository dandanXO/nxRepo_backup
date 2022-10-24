export interface MssChannelCreateRequest {
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

export interface GetAllChannelQuery {
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


export interface MssChannelListItem {
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
export type MssChannelListResponse = MssChannelListItem[];

export interface ChannelDropMenuResponse {
    channelId: number;
    // 渠道Id

    name: string;
    // 渠道名称
}
