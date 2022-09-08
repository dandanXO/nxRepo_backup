/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseRs } from "../models/BaseRs";
import type { BaseRs_object_ } from "../models/BaseRs_object_";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminOrderEditActionService {
    /**
     * 导出订单
     * 导出订单
     * @param json json
     * @returns any OK
     * @throws ApiError
     */
    public static downloadResetRecordListUsingPost(
        json: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderEdit/downloadResetRecordList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取已完结订单
     * 获取已完结订单
     * @param json {"pageNum":1,"pageSize":10,"orderNo":"","userTrueName":"","userPhone":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getOverOrderListUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderEdit/getOverOrderList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取重置过的订单记录
     * 获取重置过的订单记录
     * @param json {"status":1,"pageNum":1,"pageSize":10,"phoneNo":"","startTime":"","endTime":"","userName":"","orderNo":"","payTradeNo":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getResetOrderRecordListUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderEdit/getResetOrderRecordList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 重置订单放款状态,重置后等待同步
     * 重置订单放款状态,重置后等待同步
     * @param orderNo orderNo
     * @param token token
     * @returns BaseRs OK
     * @throws ApiError
     */
    public static resetOrderLoanStatusUsingGet(
        orderNo?: string,
        token?: string
    ): CancelablePromise<BaseRs> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/orderEdit/resetOrderLoanStatus",
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
     * 手动修改完结订单
     * 手动修改完结订单
     * @param json json
     * @returns BaseRs_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateOverOrderUsingPost(
        json: string
    ): CancelablePromise<BaseRs_object_ | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderEdit/updateOverOrder",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
