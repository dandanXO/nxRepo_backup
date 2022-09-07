/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseRs_HsRiskFeeBalance_ } from "../models/BaseRs_HsRiskFeeBalance_";
import type { BaseRs_Map_string_object_ } from "../models/BaseRs_Map_string_object_";
import type { BaseRs_Page_HsRiskFeeBalance_ } from "../models/BaseRs_Page_HsRiskFeeBalance_";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class HsRiskFeeBalanceActionService {
    /**
     * @deprecated
     * 风控费用充值
     * 风控费用充值
     * @returns BaseRs_HsRiskFeeBalance_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static depositUsingPost(): CancelablePromise<
        BaseRs_HsRiskFeeBalance_ | any
    > {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/riskFee/deposit",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 导出风控费用清单
     * 导出风控费用清单
     * @param json {"resonType":1,"phoneNo":"15845632145","nameTrue":"张三","nameNick":"小李飞刀","yStartTime":"yyyy-MM-dd HH:mm:ss","yEndTime":"yyyy-MM-dd HH:mm:ss"}
     * @returns any OK
     * @throws ApiError
     */
    public static downloadUsingGet2(json: string): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/riskFee/download",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 导出风控费用清单
     * 导出风控费用清单
     * @param json {"resonType":1,"phoneNo":"15845632145","nameTrue":"张三","nameNick":"小李飞刀","yStartTime":"yyyy-MM-dd HH:mm:ss","yEndTime":"yyyy-MM-dd HH:mm:ss"}
     * @returns any OK
     * @throws ApiError
     */
    public static downloadUsingPost2(json: string): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/riskFee/download",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取风控费用余额信息
     * 获取风控费用余额信息
     * @returns BaseRs_Map_string_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getBalanceUsingPost(): CancelablePromise<
        BaseRs_Map_string_object_ | any
    > {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/riskFee/getBalance",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 分页获取风控费用列表
     * 获取全部风控费用列表
     * @param json {"pageNum":1,"pageSize":10,"resonType":1,"phoneNo":"15845632145","nameTrue":"张三","nameNick":"小李飞刀","yStartTime":"yyyy-MM-dd HH:mm:ss","yEndTime":"yyyy-MM-dd HH:mm:ss"}
     * @returns BaseRs_Page_HsRiskFeeBalance_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getListUsingPost(
        json: string
    ): CancelablePromise<BaseRs_Page_HsRiskFeeBalance_ | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/riskFee/getList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
