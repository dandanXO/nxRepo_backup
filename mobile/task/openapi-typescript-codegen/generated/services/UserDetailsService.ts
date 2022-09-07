/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseRs_List_UserSMSLogVO_ } from "../models/BaseRs_List_UserSMSLogVO_";
import type { GetUserSMSLogRequest } from "../models/GetUserSMSLogRequest";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class UserDetailsService {
    /**
     * 申请记录
     * 申请记录
     * @param json json格式数据
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static findOrderListUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/userDetails/findOrderList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 通讯录
     * 通讯录
     * @param json json格式数据
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static findUserContactsUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/userDetails/findUserContacts",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 用户信息
     * 用户信息
     * @param json json格式数据
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static findUserDetailsInfoUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/userDetails/findUserDetailsInfo",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 短信记录
     * 短信记录
     * @param json json格式数据
     * @param request request
     * @returns BaseRs_List_UserSMSLogVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static findUserSmsLogsUsingPost(
        json: string,
        request: GetUserSMSLogRequest
    ): CancelablePromise<BaseRs_List_UserSMSLogVO_ | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/userDetails/findUserSMSLogs",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
