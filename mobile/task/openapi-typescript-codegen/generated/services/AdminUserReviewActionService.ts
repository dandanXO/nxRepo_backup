/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {  } from '../models';
import type { GetUserInfoRequest } from '../models/GetUserInfoRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AdminUserReviewActionService {

    /**
     * 复审获取用户（用户分配）
     * 复审获取用户（用户分配）
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static allocationOrder1UsingPost1(): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/userReview/allocationUser1',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 终审获取用户（用户分配）
     * 终审获取用户（用户分配）
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static allocationOrder2UsingPost1(): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/userReview/allocationUser2',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取用户详情
     * 获取用户详情
     * @param request request
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getUserInfoUsingPost(
        request: GetUserInfoRequest,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/userReview/getUserInfo',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取终审用户列表
     * 获取终审用户列表
     * @param request request
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getUserListFinalReviewUsingPost(
        request: ,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/userReview/getUserListFinalReview',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取复审用户列表
     * 获取复审用户列表
     * @param request request
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getUserListReviewUsingPost(
        request: ,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/userReview/getUserListReview',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 复审
     * 复审
     * @param json {"userId":"用户ID","status":"状态(0驳回，1通过,2黑名单)","reason":"理由/原因／说明","remark":"备注"}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static review1UsingPost1(
        json: string,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/userReview/review1',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 终审
     * 终审
     * @param json {"userId":"用户ID","status":"状态(0驳回，1通过)","reason":"理由/原因／说明","remark":"备注"}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static review2YeeUsingPost1(
        json: string,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/userReview/review2yee',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
