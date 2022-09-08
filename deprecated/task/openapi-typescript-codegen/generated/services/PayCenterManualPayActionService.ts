/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class PayCenterManualPayActionService {
    /**
     * 手动下单接口
     * 手动下单接口，统一提交到 PAY-CENTER-SERVICE 处理，此处做网关用
     * @param json {}
     * @param tar tar
     * @returns any OK
     * @throws ApiError
     */
    public static createManualPayUsingGet(
        json: string,
        tar?: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/payCenterPayManual/createManualPay",
            query: {
                tar: tar,
            },
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 手动下单接口
     * 手动下单接口，统一提交到 PAY-CENTER-SERVICE 处理，此处做网关用
     * @param json {}
     * @param tar tar
     * @returns any OK
     * @throws ApiError
     */
    public static createManualPayUsingPost(
        json: string,
        tar?: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/payCenterPayManual/createManualPay",
            query: {
                tar: tar,
            },
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
