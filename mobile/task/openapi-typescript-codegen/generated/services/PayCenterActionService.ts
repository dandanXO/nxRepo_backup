/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class PayCenterActionService {
    /**
     * 资金明细导出
     * 资金明细导出
     * @param json json
     * @returns any OK
     * @throws ApiError
     */
    public static downLoadAssetDetailUsingPost(
        json: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/payCenter/downLoadAssetDetail",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 支付订单导出
     * 支付订单导出
     * @param json json
     * @returns any OK
     * @throws ApiError
     */
    public static downLoadPayOrderUsingPost(
        json: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/payCenter/downLoadPayOrder",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 代付订单导出
     * 代付订单导出
     * @param json json
     * @returns any OK
     * @throws ApiError
     */
    public static downLoadSettleOrderUsingPost(
        json: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/payCenter/downLoadSettleOrder",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 支付相关管理接口
     * 支付相关管理接口，统一提交到 PAY-CENTER-SERVICE 处理，此处做网关用
     * @param json {}
     * @param tar tar
     * @returns any OK
     * @throws ApiError
     */
    public static jsonGateWayUsingGet(
        json: string,
        tar?: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/payCenter/jsonGateWay",
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
     * 支付相关管理接口
     * 支付相关管理接口，统一提交到 PAY-CENTER-SERVICE 处理，此处做网关用
     * @param json {}
     * @param tar tar
     * @returns any OK
     * @throws ApiError
     */
    public static jsonGateWayUsingPost(
        json: string,
        tar?: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/payCenter/jsonGateWay",
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
