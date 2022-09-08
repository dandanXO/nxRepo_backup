/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MssAdminConf } from "../models/MssAdminConf";
import type { MssSystemConf } from "../models/MssSystemConf";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminSystemConfActionService {
    /**
     * 获取参数配置列表
     * 获取参数配置列表
     * @param json {"status":1,"pageNum":1,"pageSize":10,"phoneNo":"","startTime":"","endTime":"","userName":"","orderNo":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static configListUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/systemConf/configList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取风控参数配置列表
     * 获取风控参数配置列表
     * @param json {"status":1,"pageNum":1,"pageSize":10,"phoneNo":"","startTime":"","endTime":"","userName":"","orderNo":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static riskListUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/systemConf/riskList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取开关参数配置列表
     * 获取开关参数配置列表
     * @param json {"status":1,"pageNum":1,"pageSize":10,"phoneNo":"","startTime":"","endTime":"","userName":"","orderNo":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static riskSwitchListUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/systemConf/riskSwitchList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取渠道服务费率配置列表
     * 获取渠道服务费率配置列表
     * @param json {"status":1,"pageNum":1,"pageSize":10,"phoneNo":"","startTime":"","endTime":"","userName":"","orderNo":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static serviceFeeListUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/systemConf/serviceFeeList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 更新系统配置
     * 更新系统配置
     * @param mssSystemConf mssSystemConf
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateConfigUsingPost(
        mssSystemConf: MssSystemConf
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/systemConf/updateConfig",
            body: mssSystemConf,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 更新YYS系统配置
     * 更新YYS系统配置
     * @param mssAdminConf mssAdminConf
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateYysConfigUsingPost(
        mssAdminConf: MssAdminConf
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/systemConf/updateYysConfig",
            body: mssAdminConf,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取YYS参数配置列表
     * 获取YYS参数配置列表
     * @param json {"status":1,"pageNum":1,"pageSize":10,"phoneNo":"","startTime":"","endTime":"","userName":"","orderNo":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static yysListUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/systemConf/yysList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
