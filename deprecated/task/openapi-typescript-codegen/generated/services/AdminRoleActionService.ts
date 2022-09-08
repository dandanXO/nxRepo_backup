/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseRs } from "../models/BaseRs";
import type { RoleAddRq } from "../models/RoleAddRq";
import type { RoleDelRq } from "../models/RoleDelRq";
import type { RoleUpdateRq } from "../models/RoleUpdateRq";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminRoleActionService {
    /**
     * 添加角色
     * 添加角色
     * @param input input
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUsingPost9(
        input: RoleAddRq
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/role/add",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 可分配角色列表
     * 可分配角色列表
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static assignListUsingPost(): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/role/assignList",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 删除角色
     * 删除角色
     * @param input input
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static delUsingPost3(
        input: RoleDelRq
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/role/del",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 角色列表
     * 角色列表
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUsingPost7(): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/role/list",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 更新角色
     * 更新角色
     * @param input input
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUsingPost4(
        input: RoleUpdateRq
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/role/update",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
