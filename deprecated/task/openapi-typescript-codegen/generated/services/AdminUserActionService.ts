/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {} from "../models";
import type { AdminUserAddRq } from "../models/AdminUserAddRq";
import type { AdminUserDelRq } from "../models/AdminUserDelRq";
import type { AdminUserRq } from "../models/AdminUserRq";
import type { AdminUserUpdateRq } from "../models/AdminUserUpdateRq";
import type { BaseRs } from "../models/BaseRs";
import type { PageRs } from "../models/PageRs";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminUserActionService {
    /**
     * 添加用户
     * 添加用户
     * @param input input
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUsingPost12(
        input: AdminUserAddRq
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/user/add",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 催收组别列表
     * @param collectTeamId 團隊ID
     * @returns  OK
     * @throws ApiError
     */
    public static collectGroupsUsingGet(
        collectTeamId?: number
    ): CancelablePromise<Array<>> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/user/collect-groups",
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
     * 催收团队列表
     * @returns  OK
     * @throws ApiError
     */
    public static collectTeamsUsingGet(): CancelablePromise<Array<>> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/user/collect-teams",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 查询用户通讯录
     * 查询用户通讯录
     * @param userId userId
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static getUserContactsUsingPost(
        userId: string
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/user/contacts",
            body: userId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 查询指定角色id管理员列表
     * 查询指定角色id管理员列表
     * @param roleId roleId
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static getCsUserListUsingPost(
        roleId: string
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/user/cslist",
            body: roleId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 删除用户
     * 删除用户
     * @param input input
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteUsingPost(
        input: AdminUserDelRq
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/user/del",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 查询用户
     * 查询用户
     * @param input input
     * @returns PageRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static selectUsingPost(
        input: AdminUserRq
    ): CancelablePromise<PageRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/user/list",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 修改用户
     * 修改用户
     * @param input input
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUsingPost7(
        input: AdminUserUpdateRq
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/user/update",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
