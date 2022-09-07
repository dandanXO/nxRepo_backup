/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseRs } from "../models/BaseRs";
import type { MssScheduleJob } from "../models/MssScheduleJob";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminScheduleJobActionService {
    /**
     * 添加定时任务
     * 添加定时任务
     * @param mssScheduleJob mssScheduleJob
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUsingPost10(
        mssScheduleJob: MssScheduleJob
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/scheduleJob/add",
            body: mssScheduleJob,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 删除定时任务
     * 删除定时任务
     * @param mssScheduleJob mssScheduleJob
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static delUsingPost4(
        mssScheduleJob: MssScheduleJob
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/scheduleJob/del",
            body: mssScheduleJob,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取定时任务列表
     * 获取定时任务列表
     * @param json {"status":1,"pageNum":1,"pageSize":10,"beanName":"","status":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static scheduleJobListUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/scheduleJob/list",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 立即执行定时任务
     * 立即执行定时任务
     * @param mssScheduleJob mssScheduleJob
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static runUsingPost(
        mssScheduleJob: MssScheduleJob
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/scheduleJob/run",
            body: mssScheduleJob,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 更新定时任务
     * 更新定时任务
     * @param mssScheduleJob mssScheduleJob
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUsingPost5(
        mssScheduleJob: MssScheduleJob
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/scheduleJob/update",
            body: mssScheduleJob,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
