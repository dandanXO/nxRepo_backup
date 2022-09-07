/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {  } from '../models';
import type { ADJUST_ } from '../models/ADJUST_';
import type { AppVersionResponse } from '../models/AppVersionResponse';
import type { IQA_ } from '../models/IQA_';
import type { IQC_ } from '../models/IQC_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AppGlobalService {

    /**
     * 获取app版本接口
     * /getInfo
     * @param channelId channelId
     * @param os os
     * @returns AppVersionResponse OK
     * @throws ApiError
     */
    public static getAppversionUsingGet(
        channelId: string,
        os: string,
    ): CancelablePromise<AppVersionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/app-version',
            query: {
                'channelId': channelId,
                'os': os,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * log上传
     * log上传
     * @param message message
     * @returns any Created
     * @throws ApiError
     */
    public static getFakeKeyUsingPost(
        message: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/log',
            body: message,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * IQA收费
     * @param request request
     * @returns any Created
     * @throws ApiError
     */
    public static advIqaChargeUsingPost(
        request: IQA_,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/usage-charge/adv/iqa',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * IQC收费
     * @param request request
     * @returns any Created
     * @throws ApiError
     */
    public static advIqcChargeUsingPost(
        request: IQC_,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/usage-charge/adv/iqc',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 活体收费
     * @param request request
     * @returns any Created
     * @throws ApiError
     */
    public static advLivenessChargeUsingPost(
        request: ,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/usage-charge/adv/liveness',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * ADJUST设定/参数
     * ADJUST设定/参数
     * @returns ADJUST_ OK
     * @throws ApiError
     */
    public static getAdjustParamUsingGet(): CancelablePromise<ADJUST_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/user-event/adjust/params',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
