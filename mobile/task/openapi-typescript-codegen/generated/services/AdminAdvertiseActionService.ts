/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdLogoUploadResponse } from "../models/AdLogoUploadResponse";
import type { AdvertiseCreateRequest } from "../models/AdvertiseCreateRequest";
import type { AdvertiseEnabledRequest } from "../models/AdvertiseEnabledRequest";
import type { AdvertiseManagementResponse } from "../models/AdvertiseManagementResponse";
import type { AdvertiseRecords } from "../models/AdvertiseRecords";
import type { AdvertiseSwitchRequest } from "../models/AdvertiseSwitchRequest";
import type { AdvertiseUpdateRequest } from "../models/AdvertiseUpdateRequest";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminAdvertiseActionService {
    /**
     * createAd
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static createAdUsingPost(
        request: AdvertiseCreateRequest
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/ad-manage/add",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteAd
     * @param id id
     * @returns any OK
     * @throws ApiError
     */
    public static deleteAdUsingDelete(id: number): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "DELETE",
            url: "/hs/admin/ad-manage/delete",
            query: {
                id: id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * adDisplaySwitch
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static adDisplaySwitchUsingPost(
        request: AdvertiseSwitchRequest
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/ad-manage/display-switch",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * adEnabled
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static adEnabledUsingPost(
        request: AdvertiseEnabledRequest
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/ad-manage/enabled",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 平台廣告列表
     * @param page 页数
     * @param size 每页数量
     * @param sort 排序
     * @returns AdvertiseRecords OK
     * @throws ApiError
     */
    public static advertiseRecordsUsingGet(
        page?: number,
        size: number = 10,
        sort: string = "sort,asc"
    ): CancelablePromise<AdvertiseRecords> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/ad-manage/list",
            query: {
                page: page,
                size: size,
                sort: sort,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 广告图标上传
     * 广告图标上传
     * @param file 上传的文件
     * @returns AdLogoUploadResponse OK
     * @returns any Created
     * @throws ApiError
     */
    public static uploadImgUsingPost(
        file: Blob
    ): CancelablePromise<AdLogoUploadResponse | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/ad-manage/logo/upload",
            body: file,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 广告管理
     * @param page 页数
     * @param size 每页数量
     * @param sort 排序
     * @returns AdvertiseManagementResponse OK
     * @throws ApiError
     */
    public static managementUsingGet(
        page?: number,
        size: number = 10,
        sort: string = "sort,asc"
    ): CancelablePromise<AdvertiseManagementResponse> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/ad-manage/management",
            query: {
                page: page,
                size: size,
                sort: sort,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * modifyAd
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static modifyAdUsingPut(
        request: AdvertiseUpdateRequest
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "PUT",
            url: "/hs/admin/ad-manage/modify",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
