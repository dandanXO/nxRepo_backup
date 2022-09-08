/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminLoginActionService {
    /**
     * 生成google auth QR Code
     * 生成google auth QR Code
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getGoogleAuthQrCodeUsingPost(): CancelablePromise<
        string | any
    > {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/auth/getGoogleAuthQRCode",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 刷新
     * 刷新
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getInfoUsingPost(): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/auth/getInfo",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 管理员登录
     * 管理员登录
     * @param json {"phoneNo":"","code":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static loginUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/auth/login",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 发送验证码
     * 发送验证码
     * @param json {phoneNo:手机号码}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static sendVerifyCodeUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/auth/sendVerifyCode",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 校验google auth QR Code
     * 校验 google auth QR Code
     * @param code code
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static verifyGoogleAuthQrCodeUsingPost(
        code: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/auth/verifyGoogleAuthQRCode",
            body: code,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
