/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QueryPaymentStatisticResponse } from "../models/QueryPaymentStatisticResponse";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class PaymentStatisticControllerService {
    /**
     * 支付代付統計
     * @param endTime 结束时间
     * @param startTime 开始时间
     * @returns QueryPaymentStatisticResponse OK
     * @throws ApiError
     */
    public static queryPaymentStatisticUsingGet(
        endTime?: string,
        startTime?: string
    ): CancelablePromise<QueryPaymentStatisticResponse> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/payment/statistic",
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
