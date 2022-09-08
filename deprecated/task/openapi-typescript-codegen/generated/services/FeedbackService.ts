/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class FeedbackService {
    /**
     * 意见反馈列表
     * 意见反馈列表
     * @param json json格式数据
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getFeedBackListUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/feedback/getFeedBackList",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
