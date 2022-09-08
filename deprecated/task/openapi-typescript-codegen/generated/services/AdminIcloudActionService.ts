/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminIcloudActionService {
    /**
     * 根据激活状态分配iCloud账号
     * 根据激活状态分配iCloud账号
     * @param json {"orderId":1,"actived":"0未激活1已激活"}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static allocationActivedIcloudUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/icloud/allocationActivedIcloud",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 分配iCloud账号
     * 分配iCloud账号
     * @param json {"orderId":1}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static allocationIcloudUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/icloud/allocationIcloud",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取已结清的iCloud账号列表
     * 获取已结清的iCloud账号列表
     * @param json {"pageNum":1,"pageSize":10,"icloudNo":"icloud账号""startTime":"起始时间","endTime":"结束时间"}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getClosedIcloudListUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/icloud/getClosedIcloudList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取iCloud账号列表
     * 获取iCloud账号列表
     * @param json {"pageNum":1,"pageSize":10,"icloudNo":"icloud账号","allocationOrderNo":"订单号","state":"账号状态","actived":"激活状态""startTime":"起始时间","endTime":"结束时间"}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getIcloudListUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/icloud/getIcloudList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取新密码
     * 获取新密码
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getNewPawdUsingPost(): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/icloud/getNewPawd",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 设置新密码
     * 设置新密码
     * @param json {"icloudId":1}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static newPawdUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/icloud/newPawd",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 报错重新分配iCloud账号
     * 报错重新分配iCloud账号
     * @param json {"orderId":1}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static reAllocationIcloudUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/icloud/reAllocationIcloud",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 保存icloud图片
     * 保存icloud图片
     * @param json {"icloudId":1,"imagFileName":"图片名","orderId":,"no":1,2}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static saveIcloudImgUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/icloud/saveIcloudImg",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 保存已还清状态的icloud的新密码
     * 保存已还清状态的icloud的新密码
     * @param json {"icloudId":1,"icloudPwdNew":"新密码"}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static submitClosedNewPawdUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/icloud/submitClosedNewPawd",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 上传iCloud账号表
     * 上传iCloud账号表
     * @param json icloud账号IcloudNo    IcloudPwd    IcloudSecurityQuestion1    IcloudSecurityAnswer1    IcloudSecurityQuestion2    IcloudSecurityAnswer2    IcloudSecurityQuestion3    IcloudSecurityAnswer3    IcloudDatetime    actived
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static uploadIcloudUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/icloud/uploadIcloud",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 上传iCloud账号excel表
     * 上传iCloud账号excel表
     * @param file icloud账号
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static uploadIcloudExcelUsingPost(
        file: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/icloud/uploadIcloudExcel",
            body: file,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
