/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OcrLicenseResponse = {
    /**
     * 失效时间
     */
    expireTime?: OcrLicenseResponse.expireTime;
    /**
     * 凭证
     */
    license?: string;
};

export namespace OcrLicenseResponse {
    /**
     * 失效时间
     */
    export enum expireTime {
        _2022_04_15_14_14_14 = "2022-04-15 14:14:14",
    }
}
