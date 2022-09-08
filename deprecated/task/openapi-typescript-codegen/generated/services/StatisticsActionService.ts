/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseRs } from "../models/BaseRs";
import type { OverdueStatistic2OverdueTimingDistributionResponse } from "../models/OverdueStatistic2OverdueTimingDistributionResponse";
import type { OverdueStatisticRq } from "../models/OverdueStatisticRq";
import type { Page_ChannelVisitorResponse_ } from "../models/Page_ChannelVisitorResponse_";
import type { Page_OverdueStatistic2Response_ } from "../models/Page_OverdueStatistic2Response_";
import type { Page_OverdueStatisticResponse_ } from "../models/Page_OverdueStatisticResponse_";
import type { Page_RefusedReasonResponse_ } from "../models/Page_RefusedReasonResponse_";
import type { Page_RegisterStatisticResponse_ } from "../models/Page_RegisterStatisticResponse_";
import type { Statistic1Rq } from "../models/Statistic1Rq";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class StatisticsActionService {
    /**
     * A2S统计
     * A2S统计
     * @param input input
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static s3UsingPost(
        input: Statistic1Rq
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/statistics/atosStatistic",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * A2S统计导出
     * A2S统计导出
     * @param input input
     * @returns any OK
     * @throws ApiError
     */
    public static s3DownLoadUsingPost(
        input: Statistic1Rq
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/statistics/atosStatisticDownLoad",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 取得渠道訪客紀錄
     * @param end
     * @param start
     * @param channelId
     * @param offset
     * @param pageNumber
     * @param pageSize
     * @param paged
     * @param sortSorted
     * @param sortUnsorted
     * @param unpaged
     * @returns Page_ChannelVisitorResponse_ OK
     * @throws ApiError
     */
    public static findChannelVisitorPageUsingGet(
        end: string,
        start: string,
        channelId?: string,
        offset?: number,
        pageNumber?: number,
        pageSize?: number,
        paged?: boolean,
        sortSorted?: boolean,
        sortUnsorted?: boolean,
        unpaged?: boolean
    ): CancelablePromise<Page_ChannelVisitorResponse_> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/statistics/channel-visitor-page",
            query: {
                channelId: channelId,
                end: end,
                offset: offset,
                pageNumber: pageNumber,
                pageSize: pageSize,
                paged: paged,
                "sort.sorted": sortSorted,
                "sort.unsorted": sortUnsorted,
                start: start,
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
     * 新客日统计转化率
     * 新客日统计转化率
     * @param channelId 渠道Id
     * @param endTime 结束时间
     * @param startTime 开始时间
     * @param offset
     * @param pageNumber
     * @param pageSize
     * @param paged
     * @param sortSorted
     * @param sortUnsorted
     * @param unpaged
     * @returns Page_RegisterStatisticResponse_ OK
     * @throws ApiError
     */
    public static registerStatisticUsingGet(
        channelId?: string,
        endTime?: string,
        startTime?: string,
        offset?: number,
        pageNumber?: number,
        pageSize?: number,
        paged?: boolean,
        sortSorted?: boolean,
        sortUnsorted?: boolean,
        unpaged?: boolean
    ): CancelablePromise<Page_RegisterStatisticResponse_> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/statistics/day-register-page",
            query: {
                channelId: channelId,
                endTime: endTime,
                startTime: startTime,
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
     * 新客日统计转化率导出
     * 新客日统计转化率导出
     * @param input input
     * @returns any OK
     * @throws ApiError
     */
    public static registerStatisticDownLoadUsingPost(
        input: Statistic1Rq
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/statistics/dayRegisterStatisticDownLoad",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 財務報表
     * @param endTime 结束时间
     * @param startTime 开始时间
     * @returns any OK
     * @throws ApiError
     */
    public static downLoadFnancialStatementUsingGet(
        endTime?: string,
        startTime?: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/statistics/financial-statements/download",
            query: {
                endTime: endTime,
                startTime: startTime,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 首页统计
     * 首页统计
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static firstStatisticUsingPost(): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/statistics/firstStatistic",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 运营日报
     * @returns any OK
     * @throws ApiError
     */
    public static downLoadOperationDailyUsingGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/statistics/operation-daily/download",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 逾期统计
     * @param days 催收天數
     * @param endTime 结束时间
     * @param startTime 开始时间
     * @param offset
     * @param pageNumber
     * @param pageSize
     * @param paged
     * @param sortSorted
     * @param sortUnsorted
     * @param unpaged
     * @returns Page_OverdueStatisticResponse_ OK
     * @throws ApiError
     */
    public static overdueStatisticUsingGet(
        days?: string,
        endTime?: string,
        startTime?: string,
        offset?: number,
        pageNumber?: number,
        pageSize?: number,
        paged?: boolean,
        sortSorted?: boolean,
        sortUnsorted?: boolean,
        unpaged?: boolean
    ): CancelablePromise<Page_OverdueStatisticResponse_> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/statistics/overdueStatistic",
            query: {
                days: days,
                endTime: endTime,
                startTime: startTime,
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
     * 逾期统计二
     * @param endTime 结束时间
     * @param startTime 开始时间
     * @param offset
     * @param pageNumber
     * @param pageSize
     * @param paged
     * @param sortSorted
     * @param sortUnsorted
     * @param unpaged
     * @returns Page_OverdueStatistic2Response_ OK
     * @throws ApiError
     */
    public static overdueStatistic2UsingGet(
        endTime?: string,
        startTime?: string,
        offset?: number,
        pageNumber?: number,
        pageSize?: number,
        paged?: boolean,
        sortSorted?: boolean,
        sortUnsorted?: boolean,
        unpaged?: boolean
    ): CancelablePromise<Page_OverdueStatistic2Response_> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/statistics/overdueStatistic2",
            query: {
                endTime: endTime,
                startTime: startTime,
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
     * 逾期報表次數分布
     * @param endTime 放款時間結束
     * @param startTime 放款時間開始
     * @returns OverdueStatistic2OverdueTimingDistributionResponse OK
     * @throws ApiError
     */
    public static overdueStatistic2OverdueTimingDistributionUsingGet(
        endTime?: string,
        startTime?: string
    ): CancelablePromise<
        Array<OverdueStatistic2OverdueTimingDistributionResponse>
    > {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/statistics/overdueStatistic2overdueTimingDistribution",
            query: {
                endTime: endTime,
                startTime: startTime,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 逾期统计下载
     * 逾期统计下载
     * @param input input
     * @returns any OK
     * @throws ApiError
     */
    public static overdueStatisticDownLoadUsingPost1(
        input: OverdueStatisticRq
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/statistics/overdueStatisticDownLoad",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 风控拒绝原因统计
     * 风控拒绝原因统计
     * @param channelId
     * @param endTime
     * @param offset
     * @param pageNumber
     * @param pageSize
     * @param paged
     * @param sortSorted
     * @param sortUnsorted
     * @param startTime
     * @param unpaged
     * @returns Page_RefusedReasonResponse_ OK
     * @throws ApiError
     */
    public static refusedReasonStatisticUsingGet(
        channelId?: number,
        endTime?: string,
        offset?: number,
        pageNumber?: number,
        pageSize?: number,
        paged?: boolean,
        sortSorted?: boolean,
        sortUnsorted?: boolean,
        startTime?: string,
        unpaged?: boolean
    ): CancelablePromise<Page_RefusedReasonResponse_> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/statistics/refusedReason",
            query: {
                channelId: channelId,
                endTime: endTime,
                offset: offset,
                pageNumber: pageNumber,
                pageSize: pageSize,
                paged: paged,
                "sort.sorted": sortSorted,
                "sort.unsorted": sortUnsorted,
                startTime: startTime,
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
     * 风控拒绝原因统计
     * 风控拒绝原因统计
     * @param json json
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static refusedReasonStatisticUsingPost(
        json: string
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/statistics/refusedReasonStatistic",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 风控拒绝原因统计下载
     * 风控拒绝原因统计下载
     * @param json json
     * @returns any OK
     * @throws ApiError
     */
    public static refusedReasonStatisticDownLoadUsingPost(
        json: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/statistics/refusedReasonStatisticDownLoad",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 回款统计
     * 回款统计
     * @param input input
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static s1UsingPost(
        input: Statistic1Rq
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/statistics/s1",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 回款统计统计下载
     * 回款统计下载
     * @param input input
     * @returns any OK
     * @throws ApiError
     */
    public static s1DownloadUsingPost(
        input: Statistic1Rq
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/statistics/s1Download",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 统计通用excel导出
     * 统计通用excel导出
     * @param endTime endTime
     * @param startTime startTime
     * @param type type
     * @returns any OK
     * @throws ApiError
     */
    public static statisticReportByGetUsingGet(
        endTime: string,
        startTime: string,
        type: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/statistics/statisticReportByGet",
            query: {
                endTime: endTime,
                startTime: startTime,
                type: type,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 汇总统计
     * 汇总统计
     * @param input input
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static summaryStatisticUsingPost(
        input: Statistic1Rq
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/statistics/summaryStatistic",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 汇总统计excel
     * 汇总统计excel
     * @param input input
     * @returns any OK
     * @throws ApiError
     */
    public static summaryStatisticReportUsingPost(
        input: Statistic1Rq
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/statistics/summaryStatisticReport",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 汇总统计excel
     * 汇总统计excel
     * @param endTime endTime
     * @param startTime startTime
     * @returns any OK
     * @throws ApiError
     */
    public static summaryStatisticReportByGetUsingGet(
        endTime: string,
        startTime: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/statistics/summaryStatisticReportByGet",
            query: {
                endTime: endTime,
                startTime: startTime,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
