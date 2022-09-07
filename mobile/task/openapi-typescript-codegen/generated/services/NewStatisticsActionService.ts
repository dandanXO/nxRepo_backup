/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {  } from '../models';
import type { BaseRs } from '../models/BaseRs';
import type { BaseRs_Page_Map_string_Serializable_ } from '../models/BaseRs_Page_Map_string_Serializable_';
import type { OverdueStatisticRq } from '../models/OverdueStatisticRq';
import type { Page_Map_string_object_ } from '../models/Page_Map_string_object_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NewStatisticsActionService {

    /**
     * 代扣统计
     * 代扣统计
     * @param json {"pageNum":1,"pageSize":10,"startTime":"2018-11-30","endTime":"2018-12-03"}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static autoDeductionsStatisticUsingPost(
        json: string,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/newStatistics/autoDeductionsStatistic',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 代扣统计下载
     * 代扣统计下载
     * @param json json
     * @returns any OK
     * @throws ApiError
     */
    public static autoDeductionsStatisticDownLoadUsingPost(
        json: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/newStatistics/autoDeductionsStatisticDownLoad',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 渠道来源UV统计
     * 渠道来源UV统计
     * @param json json
     * @returns BaseRs_Page_Map_string_Serializable_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getChannelSourceUvStatisticUsingPost(
        json: string,
    ): CancelablePromise<BaseRs_Page_Map_string_Serializable_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/newStatistics/getChannelSourceUVStatistic',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 渠道来源UV统计
     * 渠道来源UV统计
     * @param json json
     * @returns any OK
     * @throws ApiError
     */
    public static getChannelSourceUvStatisticDownloadUsingPost(
        json: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/newStatistics/getChannelSourceUVStatisticDownload',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取逾期催收分配人员
     * 获取逾期催收分配人员
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static getOverdueOrderDisCollectorListUsingPost(): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/newStatistics/getOverdueOrderDisCollectorList',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取逾期催收分配部门
     * 获取逾期催收分配部门
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static getOverdueOrderDisDepartmentListUsingPost(): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/newStatistics/getOverdueOrderDisDepartmentList',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取分配人员
     * 获取分配人员
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static getOverdueOrderDisManagerListUsingPost(): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/newStatistics/getOverdueOrderDisManagerList',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 订单情况统计
     * 订单情况统计
     * @param json json
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static orderStatisticUsingPost(
        json: string,
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/newStatistics/orderStatistic',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 订单情况统计下载
     * 订单情况统计下载
     * @param json json
     * @returns any OK
     * @throws ApiError
     */
    public static orderStatisticDownLoadUsingPost(
        json: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/newStatistics/orderStatisticDownLoad',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 逾期催收统计一下载
     * 逾期催收统计一下载
     * @param req req
     * @returns any OK
     * @throws ApiError
     */
    public static overdueCollectionDownLoad1UsingPost(
        req: ,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/newStatistics/overdueCollectionDownLoad1',
            body: req,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 逾期催收统计二下载
     * 逾期催收统计二下载
     * @param req req
     * @returns any OK
     * @throws ApiError
     */
    public static overdueCollectionDownLoad2UsingPost(
        req: ,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/newStatistics/overdueCollectionDownLoad2',
            body: req,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 逾期催收统计一
     * 逾期催收统计一
     * @param disId 分配人員
     * @param endTime 分配時間結束
     * @param queryId 人員名稱
     * @param startTime 分配時間開始
     * @param offset
     * @param pageNumber
     * @param pageSize
     * @param paged
     * @param sortSorted
     * @param sortUnsorted
     * @param unpaged
     * @returns Page_Map_string_object_ OK
     * @throws ApiError
     */
    public static overdueCollectionStatistics1UsingGet(
        disId?: string,
        endTime?: string,
        queryId?: string,
        startTime?: string,
        offset?: number,
        pageNumber?: number,
        pageSize?: number,
        paged?: boolean,
        sortSorted?: boolean,
        sortUnsorted?: boolean,
        unpaged?: boolean,
    ): CancelablePromise<Page_Map_string_object_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hs/admin/newStatistics/overdueCollectionStatistics1',
            query: {
                'disId': disId,
                'endTime': endTime,
                'queryId': queryId,
                'startTime': startTime,
                'offset': offset,
                'pageNumber': pageNumber,
                'pageSize': pageSize,
                'paged': paged,
                'sort.sorted': sortSorted,
                'sort.unsorted': sortUnsorted,
                'unpaged': unpaged,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 逾期催收统计二
     * 逾期催收统计二
     * @param disId 分配人員id
     * @param endTime 分配時間結束
     * @param queryId 部門id
     * @param startTime 分配時間開始
     * @param offset
     * @param pageNumber
     * @param pageSize
     * @param paged
     * @param sortSorted
     * @param sortUnsorted
     * @param unpaged
     * @returns Page_Map_string_object_ OK
     * @throws ApiError
     */
    public static overdueCollectionStatistics2UsingGet(
        disId?: string,
        endTime?: string,
        queryId?: string,
        startTime?: string,
        offset?: number,
        pageNumber?: number,
        pageSize?: number,
        paged?: boolean,
        sortSorted?: boolean,
        sortUnsorted?: boolean,
        unpaged?: boolean,
    ): CancelablePromise<Page_Map_string_object_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hs/admin/newStatistics/overdueCollectionStatistics2',
            query: {
                'disId': disId,
                'endTime': endTime,
                'queryId': queryId,
                'startTime': startTime,
                'offset': offset,
                'pageNumber': pageNumber,
                'pageSize': pageSize,
                'paged': paged,
                'sort.sorted': sortSorted,
                'sort.unsorted': sortUnsorted,
                'unpaged': unpaged,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 回款统计二
     * 回款统计二
     * @param input input
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static overdueStatisticUsingPost(
        input: OverdueStatisticRq,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/newStatistics/overdueStatistic',
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 回款统计二下载
     * 回款统计二下载
     * @param input input
     * @returns any OK
     * @throws ApiError
     */
    public static overdueStatisticDownLoadUsingPost(
        input: OverdueStatisticRq,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/newStatistics/overdueStatisticDownLoad',
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
