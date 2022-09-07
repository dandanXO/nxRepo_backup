/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {} from "../models";
import type { TeamCreateRequest } from "../models/TeamCreateRequest";
import type { TeamUpdateRequest } from "../models/TeamUpdateRequest";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminCollectTeamControllerService {
    /**
     * 添加催收团队
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static addUsingPost3(
        request: TeamCreateRequest
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/collect-team",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 更新催收团队
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static updateUsingPut1(
        request: TeamUpdateRequest
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "PUT",
            url: "/hs/admin/collect-team",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 移除催收团队
     * @param id 團隊ID
     * @returns any OK
     * @throws ApiError
     */
    public static deleteUsingDelete1(id?: number): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "DELETE",
            url: "/hs/admin/collect-team",
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
     * 催收团队配置设定
     * @returns  OK
     * @throws ApiError
     */
    public static teamAllUsingGet(): CancelablePromise<Array<>> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/collect-team/all",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
