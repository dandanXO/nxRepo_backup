/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ID_Card_OCR_ } from "../models/ID_Card_OCR_";
import type { IDCard_ } from "../models/IDCard_";
import type { IDCardIQCScanRequest } from "../models/IDCardIQCScanRequest";
import type { OcrLicenseResponse } from "../models/OcrLicenseResponse";
import type { PAN_Card_OCR_ } from "../models/PAN_Card_OCR_";
import type { PanCard_ } from "../models/PanCard_";
import type { PanIQCScanRequest } from "../models/PanIQCScanRequest";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AppV1Service {
    /**
     * AADHR身份证扫描提交 (IQC)
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static idCardIqcScanUsingPost1(
        request: IDCardIQCScanRequest
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/api/v1/ocr/id-card/iqc",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * AADHAR身份证扫描结果确认
     * AADHAR身份证扫描结果确认
     * @returns ID_Card_OCR_ OK
     * @throws ApiError
     */
    public static idCardOcrReviewUsingGet1(): CancelablePromise<ID_Card_OCR_> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/api/v1/ocr/id-card/review",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * AADHR身份证扫描提交
     * AADHAR身份证扫描提交
     * @param files
     * @param ocrType
     * @returns any OK
     * @throws ApiError
     */
    public static idCardUploadScanUsingPost1(
        files?: Array<Blob>,
        ocrType?: "advance" | "gct" | "mobi"
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/api/v1/ocr/id-card/scan",
            query: {
                files: files,
                ocrType: ocrType,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * AADHAR身份证扫描提交结果确认
     * AADHAR身份证扫描提交结果确认
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static idCardOcrSubmitUsingPost1(
        request: IDCard_
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/api/v1/ocr/id-card/submit",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * OCR授權密鑰
     * @returns OcrLicenseResponse OK
     * @returns any Created
     * @throws ApiError
     */
    public static getLicenseUsingPost1(): CancelablePromise<
        OcrLicenseResponse | any
    > {
        return __request(OpenAPI, {
            method: "POST",
            url: "/api/v1/ocr/license",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Pan税卡扫描提交(IQC)
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static panCardIqcScanUsingPost1(
        request: PanIQCScanRequest
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/api/v1/ocr/pan-card/iqc",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Pan税卡扫描结果确认
     * Pan税卡扫描结果确认
     * @returns PAN_Card_OCR_ OK
     * @throws ApiError
     */
    public static panCardOcrReviewUsingGet1(): CancelablePromise<PAN_Card_OCR_> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/api/v1/ocr/pan-card/review",
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Pan税卡扫描提交
     * Pan税卡扫描提交
     * @param files
     * @param ocrType
     * @returns any OK
     * @throws ApiError
     */
    public static panCardUploadScanUsingPost(
        files?: Blob,
        ocrType?: "advance" | "gct" | "mobi"
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/api/v1/ocr/pan-card/scan",
            query: {
                files: files,
                ocrType: ocrType,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Pan税卡扫描结果确认
     * Pan税卡扫描结果确认
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static panCardOcrSubmitUsingPost1(
        request: PanCard_
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/api/v1/ocr/pan-card/submit",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 常用號碼檢測回調
     * 常用號碼檢測回調
     * @param json json
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static commPhoneCheckCallBackUsingPost(
        json: string
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/api/v1/callBack/commPhoneCheck",
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
