/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseRs } from "../models/BaseRs";
import type { PageRs } from "../models/PageRs";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminOperationLogActionService {
    /**
     * 操作日志列表
     * 操作日志列表
     * @param json json
     * @returns PageRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUsingPost2(
        json: string
    ): CancelablePromise<PageRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/operationLog/list",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 操作日志类型列表
     * 操作日志类型列表
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static mappingListUsingPost(): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/operationLog/mappingList",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
