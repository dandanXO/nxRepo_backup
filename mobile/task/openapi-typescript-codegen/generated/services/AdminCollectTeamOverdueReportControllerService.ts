/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CollectTeamReportResponse } from "../models/CollectTeamReportResponse";
import type { CollectTeamReportResponseV2 } from "../models/CollectTeamReportResponseV2";
import type { TeamAvailableResponse } from "../models/TeamAvailableResponse";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminCollectTeamOverdueReportControllerService {
    /**
     * 逾期催收團隊達成率報表
     * @param collectTeamId 團隊ID
     * @param endDate 逾期结束日 ex: 2022-03-14
     * @param leng 是否统计展期
     * @param startDate 逾期开始日 ex: 2022-03-14
     * @returns CollectTeamReportResponse OK
     * @throws ApiError
     */
    public static getReportUsingGet(
        collectTeamId?: number,
        endDate?: string,
        leng?: "''" | "true" | "false",
        startDate?: string
    ): CancelablePromise<Array<CollectTeamReportResponse>> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/collect-team-report/overdue",
            query: {
                collectTeamId: collectTeamId,
                endDate: endDate,
                leng: leng,
                startDate: startDate,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 催收團隊下拉選單
     * @returns TeamAvailableResponse OK
     * @throws ApiError
     */
    public static getAvailableUsingGet(): CancelablePromise<
        Array<TeamAvailableResponse>
    > {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/collect-team-report/overdue/available",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 逾期催收團隊達成率報表下载
     * @param collectTeamId 團隊ID
     * @param endDate 逾期结束日 ex: 2022-03-14
     * @param leng 是否统计展期
     * @param startDate 逾期开始日 ex: 2022-03-14
     * @returns any OK
     * @throws ApiError
     */
    public static downloadUsingGet(
        collectTeamId?: number,
        endDate?: string,
        leng?: "''" | "true" | "false",
        startDate?: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/collect-team-report/overdue/download",
            query: {
                collectTeamId: collectTeamId,
                endDate: endDate,
                leng: leng,
                startDate: startDate,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 逾期催收團隊達成率報表V2
     * @param collectTeamId 團隊ID
     * @param endDate 统计结束日 ex: 2022-03-14
     * @param leng 是否统计展期
     * @param startDate 统计开始日 ex: 2022-03-14
     * @returns CollectTeamReportResponseV2 OK
     * @throws ApiError
     */
    public static getReportV2UsingGet(
        collectTeamId?: number,
        endDate?: string,
        leng?: "''" | "true" | "false",
        startDate?: string
    ): CancelablePromise<Array<CollectTeamReportResponseV2>> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/collect-team-report/overdue/v2",
            query: {
                collectTeamId: collectTeamId,
                endDate: endDate,
                leng: leng,
                startDate: startDate,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 逾期催收團隊達成率報表下载
     * @param collectTeamId 團隊ID
     * @param endDate 统计结束日 ex: 2022-03-14
     * @param leng 是否统计展期
     * @param startDate 统计开始日 ex: 2022-03-14
     * @returns any OK
     * @throws ApiError
     */
    public static downloadV2UsingGet(
        collectTeamId?: number,
        endDate?: string,
        leng?: "''" | "true" | "false",
        startDate?: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/collect-team-report/overdue/v2/download",
            query: {
                collectTeamId: collectTeamId,
                endDate: endDate,
                leng: leng,
                startDate: startDate,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
