/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseRs } from "../models/BaseRs";
import type { ChannelStatisticsRq } from "../models/ChannelStatisticsRq";
import type { MssChannel } from "../models/MssChannel";
import type { MssChannelUser } from "../models/MssChannelUser";
import type { Page_Statistics2Response_ } from "../models/Page_Statistics2Response_";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminChannelActionService {
    /**
     * 添加渠道
     * 添加渠道
     * @param mssChannel {"url":"www.baidu.com","name":"百度","appId":"","mobileNo":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUsingPost1(
        mssChannel: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/channel/add",
            body: mssChannel,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 添加渠道用户
     * 添加渠道用户
     * @param channelUser channelUser
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static addChannelUserUsingPost(
        channelUser: MssChannelUser
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/channel/addChannelUser",
            body: channelUser,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 渠道推广统计导出
     * 渠道推广统计导出
     * @param json json
     * @returns any OK
     * @throws ApiError
     */
    public static downLoadStatisticsUsingPost(
        json: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/channel/downLoadStatistics",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 渠道推广统计2导出
     * 渠道推广统计2导出
     * @param json json
     * @returns any OK
     * @throws ApiError
     */
    public static downLoadStatistics2UsingPost(
        json: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/channel/downLoadStatistics2",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 查询渠道列表
     * 查询渠道列表
     * @param json {"pageNum":1,"pageSize":10,"name":"","url":"","startTime":"","endTime":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getChannelListUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/channel/getChannelList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 查询渠道Url
     * 查询渠道Url
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getChannelUrlUsingPost(): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/channel/getChannelUrl",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * id获取渠道用户
     * id获取渠道用户
     * @param channel channel
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getChannelUserUsingPost(
        channel: MssChannel
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/channel/getChannelUser",
            body: channel,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 查询渠道用户列表
     * 查询渠道用户列表
     * @param json {"pageNum":1,"pageSize":10,"userName":"","userPhone":"","channelName":"","state":"","startTime":"","endTime":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getChannelUserListUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/channel/getChannelUserList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取风控模块列表
     * 获取风控模块列表
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getModelListUsingPost(): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/channel/getModelList",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 渠道推广统计
     * 渠道推广统计
     * @param channelId 渠道id
     * @param sortField 排序名
     * @param sortOrder 排序方向
     * @param timeEnd 结束时间
     * @param timeStart 开始时间
     * @returns BaseRs OK
     * @throws ApiError
     */
    public static statisticsUsingGet(
        channelId?: string,
        sortField?: string,
        sortOrder?: string,
        timeEnd?: string,
        timeStart?: string
    ): CancelablePromise<BaseRs> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/channel/statistics",
            query: {
                channelId: channelId,
                sortField: sortField,
                sortOrder: sortOrder,
                timeEnd: timeEnd,
                timeStart: timeStart,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 渠道推广统计2
     * 渠道推广统计2
     * @param channelId 渠道id
     * @param sortField 排序名
     * @param sortOrder 排序方向
     * @param timeEnd 结束时间
     * @param timeStart 开始时间
     * @param offset
     * @param pageNumber
     * @param pageSize
     * @param paged
     * @param sortSorted
     * @param sortUnsorted
     * @param unpaged
     * @returns Page_Statistics2Response_ OK
     * @throws ApiError
     */
    public static statistics2UsingGet(
        channelId?: string,
        sortField?: string,
        sortOrder?: string,
        timeEnd?: string,
        timeStart?: string,
        offset?: number,
        pageNumber?: number,
        pageSize?: number,
        paged?: boolean,
        sortSorted?: boolean,
        sortUnsorted?: boolean,
        unpaged?: boolean
    ): CancelablePromise<Page_Statistics2Response_> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/channel/statistics2",
            query: {
                channelId: channelId,
                sortField: sortField,
                sortOrder: sortOrder,
                timeEnd: timeEnd,
                timeStart: timeStart,
                offset: offset,
                pageNumber: pageNumber,
                pageSize: pageSize,
                paged: paged,
                "sort.sorted": sortSorted,
                "sort.unsorted": sortUnsorted,
                unpaged: unpaged,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 渠道推广统计2
     * 渠道推广统计2
     * @param channelStatisticsRq channelStatisticsRq
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static statistics2UsingPost(
        channelStatisticsRq: ChannelStatisticsRq
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/channel/statistics2",
            body: channelStatisticsRq,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 修改渠道
     * 修改渠道
     * @param mssChannel {"id":"1","url":"www.baidu.com","name":"百度","appId":"","mobileNo":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUsingPost(
        mssChannel: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/channel/update",
            body: mssChannel,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 修改渠道用户信息
     * 修改渠道用户信息
     * @param mssChannelUser mssChannelUser
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateChannelUserUsingPost(
        mssChannelUser: MssChannelUser
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/channel/updateChannelUser",
            body: mssChannelUser,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
