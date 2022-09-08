/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class IntlControllerService {
    /**
     * 转换语言
     * 转换语言
     * @param json {"lang" : "en"}
     * @param creationTime
     * @param id
     * @param lastAccessedTime
     * @param maxInactiveInterval
     * @param _new
     * @param valueNames
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static changeLanguageUsingPost(
        json: string,
        creationTime?: number,
        id?: string,
        lastAccessedTime?: number,
        maxInactiveInterval?: number,
        _new?: boolean,
        valueNames?: Array<string>
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/intl/i18n",
            query: {
                creationTime: creationTime,
                id: id,
                lastAccessedTime: lastAccessedTime,
                maxInactiveInterval: maxInactiveInterval,
                new: _new,
                valueNames: valueNames,
            },
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
