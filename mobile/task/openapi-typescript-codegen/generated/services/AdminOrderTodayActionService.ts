/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseRs } from "../models/BaseRs";
import type { BaseRs_object_ } from "../models/BaseRs_object_";
import type { OrderTodayDistributionRq } from "../models/OrderTodayDistributionRq";
import type { OrderTodayRepaymentRequest } from "../models/OrderTodayRepaymentRequest";
import type { OrderTodayRq } from "../models/OrderTodayRq";
import type { OverdueCollectionAddRq } from "../models/OverdueCollectionAddRq";
import type { Page_DayOrderCollectorReportVO_ } from "../models/Page_DayOrderCollectorReportVO_";
import type { Page_DayOrderSummaryReportVO_ } from "../models/Page_DayOrderSummaryReportVO_";
import type { PageRs } from "../models/PageRs";
import type { PartialRepaymentTodayRequest } from "../models/PartialRepaymentTodayRequest";
import type { PartialRepaymentTodayResponse } from "../models/PartialRepaymentTodayResponse";
import type { TodayPayOrderListRq } from "../models/TodayPayOrderListRq";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminOrderTodayActionService {
    /**
     * 添加催收记录
     * 添加催收记录
     * @param input input
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUsingPost7(
        input: OverdueCollectionAddRq
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderToday/addCollection",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 催收记录列表
     * 催收记录列表
     * @param overdueId overdueId
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUsingPost4(
        overdueId: string
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderToday/collectionList",
            body: overdueId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 当天单还款列表导出
     * 当天单还款列表导出
     * @param input input
     * @returns any OK
     * @throws ApiError
     */
    public static dayOrderReportDownLoadUsingPost(
        input: OrderTodayRq
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderToday/dayOrderReportDownLoad",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 电催列表记录导出
     * 电催列表记录导出
     * @param input input
     * @returns any OK
     * @throws ApiError
     */
    public static dcListDownloadUsingPost1(
        input: OrderTodayRq
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderToday/dcListDownload",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 电催列表
     * 电催列表
     * @param input input
     * @returns PageRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static dclistUsingPost1(
        input: OrderTodayRq
    ): CancelablePromise<PageRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderToday/dclist",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 当天单详情
     * 当天单详情
     * @param overdueId overdueId
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static detailUsingPost1(
        overdueId: string
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderToday/detail",
            body: overdueId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 當日催收統計個別催收員
     * @param collectorId 催收人id
     * @param endTime 到期结束时间
     * @param fendTime 分配结束时间
     * @param fstartTime 分配开始时间
     * @param startTime 到期开始时间
     * @param offset
     * @param pageNumber
     * @param pageSize
     * @param paged
     * @param sortSorted
     * @param sortUnsorted
     * @param unpaged
     * @returns Page_DayOrderCollectorReportVO_ OK
     * @throws ApiError
     */
    public static getDayOrderCollectorReportUsingGet(
        collectorId?: number,
        endTime?: string,
        fendTime?: string,
        fstartTime?: string,
        startTime?: string,
        offset?: number,
        pageNumber?: number,
        pageSize?: number,
        paged?: boolean,
        sortSorted?: boolean,
        sortUnsorted?: boolean,
        unpaged?: boolean
    ): CancelablePromise<Page_DayOrderCollectorReportVO_> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/orderToday/getDayOrderCollectorReport",
            query: {
                collectorId: collectorId,
                endTime: endTime,
                fendTime: fendTime,
                fstartTime: fstartTime,
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
     * 當日催收統計個別催收員導出
     * @param collectorId 催收人id
     * @param endTime 到期结束时间
     * @param fendTime 分配结束时间
     * @param fstartTime 分配开始时间
     * @param startTime 到期开始时间
     * @returns any OK
     * @throws ApiError
     */
    public static dayOrderCollectorReportDownloadUsingGet(
        collectorId?: number,
        endTime?: string,
        fendTime?: string,
        fstartTime?: string,
        startTime?: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/orderToday/getDayOrderCollectorReportDownload",
            query: {
                collectorId: collectorId,
                endTime: endTime,
                fendTime: fendTime,
                fstartTime: fstartTime,
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
     * 當日催收統計
     * 當日催收統計
     * @param input input
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static getDayOrderReportUsingPost(
        input: OrderTodayRq
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderToday/getDayOrderReport",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 當日催收統計Summary
     * @param endTime 到期结束时间
     * @param fendTime 分配结束时间
     * @param fstartTime 分配开始时间
     * @param startTime 到期开始时间
     * @param offset
     * @param pageNumber
     * @param pageSize
     * @param paged
     * @param sortSorted
     * @param sortUnsorted
     * @param unpaged
     * @returns Page_DayOrderSummaryReportVO_ OK
     * @throws ApiError
     */
    public static getDayOrderSummaryReportUsingGet(
        endTime?: string,
        fendTime?: string,
        fstartTime?: string,
        startTime?: string,
        offset?: number,
        pageNumber?: number,
        pageSize?: number,
        paged?: boolean,
        sortSorted?: boolean,
        sortUnsorted?: boolean,
        unpaged?: boolean
    ): CancelablePromise<Page_DayOrderSummaryReportVO_> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/orderToday/getDayOrderSummaryReport",
            query: {
                endTime: endTime,
                fendTime: fendTime,
                fstartTime: fstartTime,
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
     * 當日催收統計Summary導出
     * @param endTime 到期结束时间
     * @param fendTime 分配结束时间
     * @param fstartTime 分配开始时间
     * @param startTime 到期开始时间
     * @returns any OK
     * @throws ApiError
     */
    public static dayOrderSummaryReportDownloadUsingGet(
        endTime?: string,
        fendTime?: string,
        fstartTime?: string,
        startTime?: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/orderToday/getDayOrderSummaryReportDownload",
            query: {
                endTime: endTime,
                fendTime: fendTime,
                fstartTime: fstartTime,
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
     * 获取分配列表
     * 获取分配列表
     * @param json json
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static getDisPerOrGroupUsingPost1(
        json: string
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderToday/getDisPerOrGroup",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 当天单记录手动添加
     * handleAddTodayOrderTask
     * @param token token
     * @returns BaseRs OK
     * @throws ApiError
     */
    public static handleAddTodayOrderTaskUsingGet(
        token?: string
    ): CancelablePromise<BaseRs> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/orderToday/handleAddTodayOrderTask",
            query: {
                token: token,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 隐藏当日档案、运营商、通讯录信息
     * hidenYysAndContacts
     * @returns string OK
     * @throws ApiError
     */
    public static hidenYysAndContactsUsingGet(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/orderToday/hidenYysAndContacts",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 当天单列表
     * 当天单列表
     * @param input input
     * @returns PageRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUsingPost5(
        input: OrderTodayRq
    ): CancelablePromise<PageRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderToday/list",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 发送空單链接
     * 发送空單链接
     * @param request request
     * @returns PartialRepaymentTodayResponse OK
     * @returns any Created
     * @throws ApiError
     */
    public static partialRepaymentUsingPost1(
        request: PartialRepaymentTodayRequest
    ): CancelablePromise<PartialRepaymentTodayResponse | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderToday/partial-repayment",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 报表管理获取分配列表
     * 报表管理获取取分配列表
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static queryDisPerOrGroupUsingPost(): CancelablePromise<
        string | any
    > {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderToday/queryDisPerOrGroup",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 发送支付链接
     * 发送支付链接
     * @param orderTodayRequest orderTodayRequest
     * @returns BaseRs_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static sendPaymentLinksUsingPost1(
        orderTodayRequest: OrderTodayRepaymentRequest
    ): CancelablePromise<BaseRs_object_ | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderToday/sendPaymentLinks",
            body: orderTodayRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 手动同步订单状态
     * syncTodayOrderStatus
     * @param orderNo orderNo
     * @param token token
     * @returns BaseRs OK
     * @throws ApiError
     */
    public static syncTodayOrderStatusUsingGet(
        orderNo?: string,
        token?: string
    ): CancelablePromise<BaseRs> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/orderToday/syncTodayOrderStatus",
            query: {
                orderNo: orderNo,
                token: token,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 当天单分配
     * 当天单分配
     * @param input input
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static todayDistributionUsingPost(
        input: OrderTodayDistributionRq
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderToday/todayDistribution",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 当天单列表导出
     * 当天单列表导出
     * @param input input
     * @returns any OK
     * @throws ApiError
     */
    public static todayListDownLoadUsingPost(
        input: OrderTodayRq
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderToday/todayListDownLoad",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 当天单还款列表导出
     * 当天单还款列表导出
     * @param input input
     * @returns any OK
     * @throws ApiError
     */
    public static todayPayOrderDownLoadUsingPost(
        input: TodayPayOrderListRq
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderToday/todayPayOrderDownLoad",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 当天单还款记录
     * 当天单还款记录
     * @param input input
     * @returns PageRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static todayPayOrderListUsingPost(
        input: TodayPayOrderListRq
    ): CancelablePromise<PageRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderToday/todayPayOrderList",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 待分配当天订单列表
     * 待分当天订单列表
     * @param input input
     * @returns PageRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static unDisTodaylistUsingPost(
        input: OrderTodayRq
    ): CancelablePromise<PageRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderToday/unDisTodaylist",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
