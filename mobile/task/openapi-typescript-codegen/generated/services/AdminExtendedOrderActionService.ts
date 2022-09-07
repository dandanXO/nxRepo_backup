/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseRs } from "../models/BaseRs";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminExtendedOrderActionService {
    /**
     * 删掉展期信息记录
     * 删掉展期信息记录
     * @param json {"orderNo":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteLengRecordUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/order/deleteLengRecord",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 手动展期
     * 手动展期
     * @param json {"orderNo":"hs-1070213636643746","totalMoney":"展期费用"}
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static doManualLoanExtendUsingPost(
        json: string
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/order/doManualLoanExtend",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 导出展期记录
     * 导出展期记录
     * @param json json
     * @returns any OK
     * @throws ApiError
     */
    public static downloadExtendOrderRecordListUsingPost(
        json: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/order/downloadExtendOrderRecordList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取展期订单历史记录
     * 获取展期订单历史记录
     * @param json {"orderNo":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getExtendOrderRecordHistoryUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/order/getExtendOrderRecordHistory",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 查询展期记录
     * 查询展期记录
     * @param json {"pageNum":1,"pageSize":10,"orderNo":"","userTrueName":"","userPhone":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getExtendOrderRecordListUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/order/getExtendOrderRecordList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 线上账期获取待还款订单
     * 线上账期获取待还款订单
     * @param json {"pageNum":1,"pageSize":10,"orderNo":"","userTrueName":"","userPhone":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getManualLoanExtendListUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/order/getManualLoanExtendList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
