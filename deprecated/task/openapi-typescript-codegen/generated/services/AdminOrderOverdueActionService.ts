/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseRs } from "../models/BaseRs";
import type { BaseRs_object_ } from "../models/BaseRs_object_";
import type { OrderOverdueDistributionRq } from "../models/OrderOverdueDistributionRq";
import type { OrderOverdueRq } from "../models/OrderOverdueRq";
import type { OverduePayOrderListRq } from "../models/OverduePayOrderListRq";
import type { OverdueRepaymentRequest } from "../models/OverdueRepaymentRequest";
import type { PageRs } from "../models/PageRs";
import type { PartialRepaymentOverdueRequest } from "../models/PartialRepaymentOverdueRequest";
import type { PartialRepaymentOverdueResponse } from "../models/PartialRepaymentOverdueResponse";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminOrderOverdueActionService {
    /**
     * 电催列表记录导出
     * 电催列表记录导出
     * @param input input
     * @returns any OK
     * @throws ApiError
     */
    public static dcListDownloadUsingPost(
        input: OrderOverdueRq
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderOverdue/dcListDownload",
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
    public static dclistUsingPost(
        input: OrderOverdueRq
    ): CancelablePromise<PageRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderOverdue/dclist",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 逾期单详情
     * 逾期单详情
     * @param overdueId overdueId
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static detailUsingPost(
        overdueId: string
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderOverdue/detail",
            body: overdueId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 逾期单分配
     * 逾期单分配
     * @param input input
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static distributionUsingPost(
        input: OrderOverdueDistributionRq
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderOverdue/distribution",
            body: input,
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
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static getDisPerOrGroupUsingPost(): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderOverdue/getDisPerOrGroup",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 逾期档案列表
     * 逾期档案列表
     * @param input input
     * @returns PageRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUsingPost3(
        input: OrderOverdueRq
    ): CancelablePromise<PageRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderOverdue/list",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 逾期档案列表导出
     * 逾期档案列表导出
     * @param input input
     * @returns any OK
     * @throws ApiError
     */
    public static overDueListDownLoadUsingPost(
        input: OrderOverdueRq
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderOverdue/overDueListDownLoad",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 逾期档案列表导出
     * 逾期档案列表导出
     * @param taskId taskId
     * @returns any OK
     * @throws ApiError
     */
    public static overDueListDownLoad2UsingPost(
        taskId: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderOverdue/overDueListDownLoad2",
            body: taskId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 逾期档案列表导出
     * 逾期档案列表导出
     * @param taskId taskId
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static overDueListDownLoadCheckUsingPost(
        taskId: string
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderOverdue/overDueListDownLoadCheck",
            body: taskId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 逾期档案列表导出
     * 逾期档案列表导出
     * @param input input
     * @returns BaseRs_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static overDueListDownLoadPrepareUsingPost(
        input: OrderOverdueRq
    ): CancelablePromise<BaseRs_object_ | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderOverdue/overDueListDownLoadPrepare",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 逾期还款记录导出
     * 逾期还款记录导出
     * @param json json
     * @returns any OK
     * @throws ApiError
     */
    public static downloadUsingPost1(json: string): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderOverdue/overduePayOrderDownload",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 逾期还款记录
     * 逾期还款记录
     * @param input input
     * @returns PageRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static overduePayOrderListUsingPost(
        input: OverduePayOrderListRq
    ): CancelablePromise<PageRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderOverdue/overduePayOrderList",
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
     * @returns PartialRepaymentOverdueResponse OK
     * @returns any Created
     * @throws ApiError
     */
    public static partialRepaymentUsingPost(
        request: PartialRepaymentOverdueRequest
    ): CancelablePromise<PartialRepaymentOverdueResponse | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderOverdue/partial-repayment",
            body: request,
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
     * @param repaymentRequest repaymentRequest
     * @returns BaseRs_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static sendPaymentLinksUsingPost(
        repaymentRequest: OverdueRepaymentRequest
    ): CancelablePromise<BaseRs_object_ | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderOverdue/sendPaymentLinks",
            body: repaymentRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 待分配逾期单列表
     * 待分配逾期单列表
     * @param input input
     * @returns PageRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static unDislistUsingPost(
        input: OrderOverdueRq
    ): CancelablePromise<PageRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderOverdue/unDislist",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 逾期单详情里的逾期记录
     * 逾期单详情里的逾期记录
     * @param userId userId
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static getUserOverdueListUsingPost(
        userId: string
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderOverdue/userOverdueList",
            body: userId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
