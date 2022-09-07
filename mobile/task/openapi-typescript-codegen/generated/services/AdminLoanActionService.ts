/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderLoanQueryCondition } from "../models/OrderLoanQueryCondition";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminLoanActionService {
    /**
     * 获取放款记录
     * 获取放款记录
     * @param request request
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getLoanListUsingPost(
        request: OrderLoanQueryCondition
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/loan/getLoanList",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取放款记录报告
     * 获取放款记录报告
     * @param json {"startTime":"","endTime":""}
     * @returns any OK
     * @throws ApiError
     */
    public static exportLoanDataUsingPost(
        json: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/loan/getLoanReport",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取放款记录报告
     * 获取放款记录报告
     * @param endTime endTime
     * @param startTime startTime
     * @returns any OK
     * @throws ApiError
     */
    public static exportLoanData1UsingGet(
        endTime: string,
        startTime: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/loan/getLoanReport1",
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
     * 获取还款记录
     * 获取还款记录
     * @param json {"status":1,"pageNum":1,"pageSize":10,"phoneNo":"","startTime":"","endTime":"","userName":"","orderNo":"","payTradeNo":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getRepaymentListUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/loan/getRepaymentList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取还款记录报告
     * 获取还款记录报告
     * @param json {"startTime":"","endTime":""}
     * @returns any OK
     * @throws ApiError
     */
    public static exportRepaymentDataUsingPost(
        json: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/loan/getRepaymentReport",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取还款记录报告
     * 获取还款记录报告
     * @param endTime endTime
     * @param startTime startTime
     * @returns any OK
     * @throws ApiError
     */
    public static exportRepaymentData1UsingGet(
        endTime: string,
        startTime: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/loan/getRepaymentReport1",
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
     * 导出放款记录
     * 导出放款记录
     * @param condition condition
     * @returns any OK
     * @throws ApiError
     */
    public static loanListDownloadUsingPost(
        condition: OrderLoanQueryCondition
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/loan/loanListDownload",
            body: condition,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 导出还款记录
     * 导出还款记录
     * @param json json
     * @returns any OK
     * @throws ApiError
     */
    public static repaymentistDownloadUsingPost(
        json: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/loan/repaymentistDownload",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
