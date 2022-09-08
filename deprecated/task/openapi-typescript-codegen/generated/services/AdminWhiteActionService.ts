/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminUserDelRq } from "../models/AdminUserDelRq";
import type { BaseRs } from "../models/BaseRs";
import type { HsWhite } from "../models/HsWhite";
import type { WhiteListRemoveRequest } from "../models/WhiteListRemoveRequest";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminWhiteActionService {
    /**
     * 添加名单
     * 添加名单
     * @param white white
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUsingPost13(
        white: HsWhite
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/white/add",
            body: white,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 删除
     * 删除
     * @param input input
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteUsingPost1(
        input: AdminUserDelRq
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/white/delete",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 清空所有
     * 清空所有
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteAllUsingPost(): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/white/deleteAll",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取全部白名单列表
     * 获取全部白名单单列表
     * @param json {"pageNum":1,"pageSize":10,"yStartTime":"","yEndTime":"","idcardNo":"","userPhone":"","userTrueName":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getWhiteListUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/white/getWhiteList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 移除(多笔)
     * 移除(多笔)
     * @param request request
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static removeBatchUsingPost(
        request: WhiteListRemoveRequest
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/white/remove-batch",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 修改
     * 修改
     * @param white white
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUsingPost8(
        white: HsWhite
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/white/update",
            body: white,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 白名单信息导出订单
     * 白名单信息导出订单
     * @param json json
     * @returns any OK
     * @throws ApiError
     */
    public static whiteDownloadUsingPost(json: string): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/white/whiteDownload",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
