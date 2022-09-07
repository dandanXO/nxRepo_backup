/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MssSystemConfUpdateRequest } from "../models/MssSystemConfUpdateRequest";
import type { SystemConfigGroupResponse } from "../models/SystemConfigGroupResponse";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminSystemConfControllerService {
    /**
     * 更新参数配置
     * 更新参数配置
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static updateConfigUsingPut(
        request: MssSystemConfUpdateRequest
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "PUT",
            url: "/hs/admin/system-conf/config",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 参数配置设定列表
     * 参数配置设定列表
     * @returns SystemConfigGroupResponse OK
     * @throws ApiError
     */
    public static getGroupConfigUsingGet(): CancelablePromise<
        Array<SystemConfigGroupResponse>
    > {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/system-conf/group-by",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
