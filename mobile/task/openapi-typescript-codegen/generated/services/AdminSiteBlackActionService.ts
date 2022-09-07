/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseRs } from "../models/BaseRs";
import type { HsSiteBlack } from "../models/HsSiteBlack";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminSiteBlackActionService {
    /**
     * 添加撸贷记录
     * 添加撸贷记录
     * @param hsSiteBlack hsSiteBlack
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUsingPost11(
        hsSiteBlack: HsSiteBlack
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/siteBlack/add",
            body: hsSiteBlack,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 删除撸贷记录
     * 删除撸贷记录
     * @param hsSiteBlack hsSiteBlack
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static delUsingPost5(
        hsSiteBlack: HsSiteBlack
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/siteBlack/del",
            body: hsSiteBlack,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 撸贷库列表
     * 撸贷库列表
     * @param json {"status":1,"pageNum":1,"pageSize":10,"siteName":"","status":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static scheduleJobListUsingPost1(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/siteBlack/list",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 更新撸贷记录
     * 更新撸贷记录
     * @param hsSiteBlack hsSiteBlack
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUsingPost6(
        hsSiteBlack: HsSiteBlack
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/siteBlack/update",
            body: hsSiteBlack,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
