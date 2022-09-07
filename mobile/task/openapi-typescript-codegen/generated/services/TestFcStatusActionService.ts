/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseRs } from "../models/BaseRs";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class TestFcStatusActionService {
    /**
     * 导出逾期名单
     * 导出逾期名单
     * @param json {"startTime":"起始时间固定格式2018-05-16","endTime":"结束时间固定格式2018-05-22"}
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static dueInfoDownLoadUsingPost(
        json?: string
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/TestFCStatusAction/dueInfoDownLoad",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 手工对账
     * 线下还款手工对账
     * @param json {"orderNo":"hs-1070213636643746","nameTrue":"张敏","phoneNo":"15881003352","payType":"1还款2展期","totalMoney":"638","payName":"支付宝或微信支付","payTime":"2018-05-18 17:07:52","payTradeNo":"20180518200040011100990085016135"}
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static manualCheckBillUsingPost(
        json: string
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/TestFCStatusAction/manualCheckBill",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
