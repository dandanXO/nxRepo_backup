/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Page_RiskControlModelResponse_ } from "../models/Page_RiskControlModelResponse_";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class RiskControlModelControllerService {
    /**
     * 风控模型分数据
     * 风控模型分数据
     * @param endTime
     * @param offset
     * @param pageNumber
     * @param pageSize
     * @param paged
     * @param sortSorted
     * @param sortUnsorted
     * @param startTime
     * @param unpaged
     * @returns Page_RiskControlModelResponse_ OK
     * @throws ApiError
     */
    public static riskControlAndRePaymentUsingGet(
        endTime?: string,
        offset?: number,
        pageNumber?: number,
        pageSize?: number,
        paged?: boolean,
        sortSorted?: boolean,
        sortUnsorted?: boolean,
        startTime?: string,
        unpaged?: boolean
    ): CancelablePromise<Page_RiskControlModelResponse_> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/risk/control-repayment",
            query: {
                endTime: endTime,
                offset: offset,
                pageNumber: pageNumber,
                pageSize: pageSize,
                paged: paged,
                "sort.sorted": sortSorted,
                "sort.unsorted": sortUnsorted,
                startTime: startTime,
                unpaged: unpaged,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
