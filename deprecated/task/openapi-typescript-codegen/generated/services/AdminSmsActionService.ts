/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseRs } from "../models/BaseRs";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminSmsActionService {
    /**
     * 当日订单生成
     * 当日订单生成
     * @param token token
     * @returns BaseRs OK
     * @throws ApiError
     */
    public static addTodayOrderTaskUsingGet(
        token?: string
    ): CancelablePromise<BaseRs> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/sms/AddTodayOrderTask",
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
     * 逾期7天以上拉黑处理
     * 逾期7天以上拉黑处理
     * @param token token
     * @returns BaseRs OK
     * @throws ApiError
     */
    public static overdueToBlackUsingGet(
        token?: string
    ): CancelablePromise<BaseRs> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/sms/overdueToBlack",
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
     * 逾期5天以上拉黑上报报RcRisk黑名单
     * 逾期5天以上拉黑上报报RcRisk黑名单
     * @param token token
     * @returns BaseRs OK
     * @throws ApiError
     */
    public static overdueToRcRiskBlackUsingGet(
        token?: string
    ): CancelablePromise<BaseRs> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/sms/overdueToRcRiskBlack",
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
     * 白名单推送
     * 白名单推送
     * @param token token
     * @returns BaseRs OK
     * @throws ApiError
     */
    public static pushOrderStatisticListToCenterUsingGet(
        token?: string
    ): CancelablePromise<BaseRs> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/sms/pushOrderStatisticListToCenter",
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
     * t1-t4 每天第一次发送时带上默认手机号码
     * t1-t4 每天第一次发送时带上默认手机号码
     * @param token token
     * @returns BaseRs OK
     * @throws ApiError
     */
    public static t0AfterMsgUsingGet(
        token?: string
    ): CancelablePromise<BaseRs> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/sms/t0AfterMsg",
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
     * 还款提当天通知(T-0)
     * 还款提当天通知(T-0)
     * @param token token
     * @returns BaseRs OK
     * @throws ApiError
     */
    public static t0TenMsgUsingGet(token?: string): CancelablePromise<BaseRs> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/sms/t0TenMsg",
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
     * 还款提前一天通知(T-1)
     * 还款提前一天通知(T-1)
     * @param token token
     * @returns BaseRs OK
     * @throws ApiError
     */
    public static t1BeforeMsgUsingGet(
        token?: string
    ): CancelablePromise<BaseRs> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/sms/t1BeforeMsg",
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
}
