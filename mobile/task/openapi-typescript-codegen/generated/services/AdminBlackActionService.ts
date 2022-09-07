/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddBlackListRequest } from "../models/AddBlackListRequest";
import type { AddBlackListResponse } from "../models/AddBlackListResponse";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminBlackActionService {
    /**
     * 添加名单
     * 添加名单
     * @param request request
     * @returns AddBlackListResponse OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUsingPost(
        request: AddBlackListRequest
    ): CancelablePromise<AddBlackListResponse | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/black/add",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 根据用户id永久禁止登陆app’
     * 根据用户id永久禁止登陆app’
     * @param json {"userId":1,"refundReason":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static banUserByIdUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/black/banUserById",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取全部黑名单列表
     * 获取全部黑名单列表
     * @param json {"pageNum":1,"pageSize":10,"yStartTime":"","yEndTime":"","idcardNo":"","userPhone":"","userTrueName":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getBlackListUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/black/getBlackList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取手动添加黑名单并上传总控开关
     * 获取手动添加黑名单并上传总控开关
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getPushRcConfigUsingPost(): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/black/getPushRcConfig",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 手动拉黑用户并上传至黑名单总控
     * 手动拉黑用户并上传至黑名单总控
     * @param json {"userPhone":1,"userTrueName":1,"userIdCard":1,"refundReason":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static pushBlackUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/black/pushBlack",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @deprecated
     * 根据用户id移除’
     * 根据用户id移除’
     * @param json {"userId":1,"refundReason":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static removeUserByIdUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/black/removeUserById",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 手动拉黑用户
     * 手动拉黑用户接口
     * @param json {"userId":1,"refundReason":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static setBlackUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/black/setBlack",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
