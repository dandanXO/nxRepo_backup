/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseRs } from "../models/BaseRs";
import type { OverdueCollectionAddRq } from "../models/OverdueCollectionAddRq";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminOverdueCollectionActionService {
    /**
     * 添加催收记录
     * 添加催收记录
     * @param input input
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUsingPost8(
        input: OverdueCollectionAddRq
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/overdueCollection/add",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 催收记录列表
     * 催收记录列表
     * @param overdueId overdueId
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUsingPost6(
        overdueId: string
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/overdueCollection/list",
            body: overdueId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
