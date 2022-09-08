/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseRs_object_ } from "../models/BaseRs_object_";
import type { MssMenuAddRq } from "../models/MssMenuAddRq";
import type { MssMenuUpdateRq } from "../models/MssMenuUpdateRq";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminMenuActionService {
    /**
     * 全部菜单列表,树状结构
     * 全部菜单列表,树状结构
     * @returns BaseRs_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static allListUsingPost(): CancelablePromise<BaseRs_object_ | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/menu/AllList",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 全部菜单列表,树状结构
     * 全部菜单列表,树状结构
     * @returns BaseRs_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static allListNoTreeUsingPost(): CancelablePromise<
        BaseRs_object_ | any
    > {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/menu/AllListNoTree",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 添加菜单
     * 添加菜单
     * @param input input
     * @returns BaseRs_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUsingPost6(
        input: MssMenuAddRq
    ): CancelablePromise<BaseRs_object_ | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/menu/add",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 删除菜单
     * 删除菜单
     * @param input input
     * @returns BaseRs_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static delUsingPost2(
        input: MssMenuUpdateRq
    ): CancelablePromise<BaseRs_object_ | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/menu/del",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 个人菜单列表,树状结构
     * 个人菜单列表,树状结构
     * @returns BaseRs_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static personalListUsingPost(): CancelablePromise<
        BaseRs_object_ | any
    > {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/menu/personalList",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 更新菜单
     * 更新菜单
     * @param input input
     * @returns BaseRs_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUsingPost3(
        input: MssMenuUpdateRq
    ): CancelablePromise<BaseRs_object_ | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/menu/update",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
