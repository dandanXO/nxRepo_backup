/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseRs } from "../models/BaseRs";
import type { GetUserRiskReviewListRequest } from "../models/GetUserRiskReviewListRequest";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminRiskReviewActionService {
    /**
     * 获取风控相关人列表
     * 获取风控相关人列表
     * @param json {"roleId":"角色（0机审7复审8催收9终审21机审+复审+终审）"}
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static getOperatorListUsingPost(
        json: string
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/riskReview/getOperatorList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取风控审核记录列表
     * 获取风控审核记录列表
     * @param json {"pageNum":1,"pageSize":10,"reviewStatus":"1机审通过2机审拒绝3复审通过4复审拒绝5复审拉黑6终审通过","orderNo":"订单号","userName":"用户名称","userPhone":"手机号","operatorId":"角色（0机审7复审8催收9终审21机审+复审+终审）","startTime":"起始时间","endTime":"结束时间"}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getRiskReviewListUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/riskReview/getRiskReviewList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取用户风控审核记录列表
     * 获取用户风控审核记录列表
     * @param request request
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getUserRiskReviewListUsingPost(
        request: GetUserRiskReviewListRequest
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/riskReview/getUserRiskReviewList",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 导出审核记录
     * 导出审核记录
     * @param json {"reviewStatus":"1机审通过2机审拒绝3复审通过4复审拒绝5复审拉黑6终审通过","orderNo":"订单号","userName":"用户名称","userPhone":"手机号","operatorId":"角色（0机审7复审8催收9终审21机审+复审+终审）","startTime":"起始时间","endTime":"结束时间"}
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static riskReviewDownLoadUsingPost(
        json?: string
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/riskReview/riskReviewDownLoad",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 导出用户审核记录
     * 导出用户审核记录
     * @param json {"reviewStatus":"1机审通过2机审拒绝3复审通过4复审拒绝5复审拉黑6终审通过","userName":"用户名称","userPhone":"手机号","operatorId":"角色（0机审7复审8催收9终审21机审+复审+终审）","startTime":"起始时间","endTime":"结束时间"}
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static riskUserReviewDownLoadUsingPost(
        json?: string
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/riskReview/riskUserReviewDownLoad",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
