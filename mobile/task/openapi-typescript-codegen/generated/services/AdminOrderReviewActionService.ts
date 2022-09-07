/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminOrderReviewActionService {
    /**
     * 复审获取订单（订单分配）
     * 复审获取订单（订单分配）
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static allocationOrder1UsingPost(): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderReview/allocationOrder1",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 终审获取订单（订单分配）
     * 终审获取订单（订单分配）
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static allocationOrder2UsingPost(): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderReview/allocationOrder2",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 批量复审
     * 批量复审
     * @param json {"orderNrs":"订单ID数组","status":"状态(0驳回，1通过,2黑名单)","reason":"理由/原因／说明","remark":"备注"}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static batchReview1UsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderReview/batchReview1",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取订单详情
     * 获取订单详情
     * @param json {orderId:订单ID}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getOrderInfoUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderReview/getOrderInfo",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取icloud截图上传token
     * 获取icloud截图上传token
     * @param json {"orderNo":"订单号"}
     * @returns string 操作成功,data中的ossType=aliyunOss表示使用aliyunOss存储图片，其余默认为七牛
     * @returns any Created
     * @throws ApiError
     */
    public static getUploadTokenIcloudUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderReview/getUploadTokenIcloud",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                501: `登录信息(token)已失效`,
            },
        });
    }

    /**
     * 获取运营商详情
     * 获取运营商详情
     * @param json {userId:用户ID}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getUserYYsInfoUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderReview/getUserYYsInfo",
            body: json,
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
     * @param json {"orderId":"订单ID","status":"状态(0驳回，1通过,2黑名单)","reason":"理由/原因／说明","remark":"备注"}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static review1UsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderReview/review1",
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
     * @param json {"orderId":"订单ID","status":"状态(0驳回，1通过)","reason":"理由/原因／说明","remark":"备注"}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static review2YeeUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderReview/review2yee",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 手动提交机审
     * 手动提交机审
     * @param json {"orderId":0}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static submitMachineReviewUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/orderReview/submitMachineReview",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
