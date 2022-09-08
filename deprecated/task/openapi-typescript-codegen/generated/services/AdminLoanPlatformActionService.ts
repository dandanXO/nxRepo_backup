/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseRs } from "../models/BaseRs";
import type { LoanPlatformAddRq } from "../models/LoanPlatformAddRq";
import type { LoanPlatformSortRq } from "../models/LoanPlatformSortRq";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminLoanPlatformActionService {
    /**
     * 添加贷超
     * 添加贷超
     * @param input input
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUsingPost5(
        input: LoanPlatformAddRq
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/loanPlatform/add",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 删除贷超
     * 删除贷超
     * @param param param
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static delUsingPost1(
        param: string
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/loanPlatform/del",
            body: param,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 添加/修改贷超图标上传token获取
     * 添加/修改贷超图标上传token获取
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static getTokenUsingPost(): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/loanPlatform/getUploadImgToken",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 贷超列表
     * 贷超列表
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUsingPost1(): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/loanPlatform/list",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 贷超列表
     * 贷超列表
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static newlistUsingPost(): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/loanPlatform/newlist",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * oss贷超图标上传
     * oss贷超图标上传
     * @param file file
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static ossUploadImgUsingPost(
        file?: Blob
    ): CancelablePromise<Record<string, string> | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/loanPlatform/ossUploadImg",
            body: file,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 更新排序
     * 更新排序
     * @param sortList sortList
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static sortUsingPost(
        sortList: Array<LoanPlatformSortRq>
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/loanPlatform/sort",
            body: sortList,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 更新贷超
     * 更新贷超
     * @param input input
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUsingPost2(
        input: LoanPlatformAddRq
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/loanPlatform/update",
            body: input,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
