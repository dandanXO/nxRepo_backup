export interface GetChannelListResponse extends Array<channelList> {
    data: channelList[];
}

export interface channelList {
    // 渠道Id
    channelId?: number;

    // 渠道名称
    name?: string;

}