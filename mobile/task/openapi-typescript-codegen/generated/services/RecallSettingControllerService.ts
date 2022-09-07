/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddRecallSettingRequest } from "../models/AddRecallSettingRequest";
import type { DeleteRecallSettingRequest } from "../models/DeleteRecallSettingRequest";
import type { RecallSettingResponse } from "../models/RecallSettingResponse";
import type { UpdateEnableRecallSettingRequest } from "../models/UpdateEnableRecallSettingRequest";
import type { UpdateRecallSettingRequest } from "../models/UpdateRecallSettingRequest";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class RecallSettingControllerService {
    /**
     * 查詢單個召回設定
     * @param id 召回設定ID
     * @returns RecallSettingResponse OK
     * @throws ApiError
     */
    public static getOneUsingGet(
        id?: number
    ): CancelablePromise<RecallSettingResponse> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/recallSetting",
            query: {
                id: id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 添加
     * @param req req
     * @returns any OK
     * @throws ApiError
     */
    public static addUsingPost14(
        req: AddRecallSettingRequest
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/recallSetting",
            body: req,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 更新
     * @param req req
     * @returns any OK
     * @throws ApiError
     */
    public static updateUsingPut2(
        req: UpdateRecallSettingRequest
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "PUT",
            url: "/hs/admin/recallSetting",
            body: req,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 移除
     * @param req req
     * @returns any OK
     * @throws ApiError
     */
    public static deleteUsingDelete2(
        req: DeleteRecallSettingRequest
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "DELETE",
            url: "/hs/admin/recallSetting",
            body: req,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * 查詢所有召回設定
     * @returns RecallSettingResponse OK
     * @throws ApiError
     */
    public static getAllUsingGet(): CancelablePromise<
        Array<RecallSettingResponse>
    > {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/recallSetting/all",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 更新狀態
     * @param req req
     * @returns any OK
     * @throws ApiError
     */
    public static updateEnableUsingPut(
        req: UpdateEnableRecallSettingRequest
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "PUT",
            url: "/hs/admin/recallSetting/enable",
            body: req,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
