/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {} from "../models";
import type { GroupCreateRequest } from "../models/GroupCreateRequest";
import type { GroupDeleteRequest } from "../models/GroupDeleteRequest";
import type { GroupUpdateRequest } from "../models/GroupUpdateRequest";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminCollectGroupControllerService {
    /**
     * 查询组别
     * @param collectTeamId 團隊ID
     * @returns  OK
     * @throws ApiError
     */
    public static findUsingGet(
        collectTeamId?: number
    ): CancelablePromise<Array<>> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/collect-group",
            query: {
                collectTeamId: collectTeamId,
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
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static addUsingPost2(
        request: GroupCreateRequest
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/collect-group",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 更新
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static updateUsingPut(
        request: GroupUpdateRequest
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "PUT",
            url: "/hs/admin/collect-group",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 移除
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static deleteUsingDelete(
        request: GroupDeleteRequest
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "DELETE",
            url: "/hs/admin/collect-group",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
}
