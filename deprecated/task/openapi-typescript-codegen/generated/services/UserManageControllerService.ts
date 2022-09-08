/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Page_HsUserResponse_ } from "../models/Page_HsUserResponse_";
import type { RemoveUserByIdRequest } from "../models/RemoveUserByIdRequest";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class UserManageControllerService {
    /**
     * 根据用户id移除’
     * 清除该用户信息’
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static removeUserByIdUsingDelete(
        request: RemoveUserByIdRequest
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "DELETE",
            url: "/hs/admin/user-manage/user",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * 根据用户id永久禁止登陆app’
     * 根据用户id永久禁止登陆app’
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static banUserByIdUsingPost1(
        request: RemoveUserByIdRequest
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/hs/admin/user-manage/user-ban",
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 用户信息导出订单
     * @param addEndTime 註冊時間結束
     * @param addStartTime 註冊時間開始
     * @param channelId 渠道名稱
     * @param hasOrder 是否提單
     * @param nameTrue 姓名
     * @param noLoanAgain 結清未複借
     * @param noLoanAgainDays 結清未複借天數
     * @param phoneNo 手機號
     * @param rnStatus 是否實名
     * @param status 狀態
     * @param pageNum
     * @param pageSize
     * @param sortField
     * @param sortOrder
     * @returns any OK
     * @throws ApiError
     */
    public static userDownloadUsingGet(
        addEndTime?: string,
        addStartTime?: string,
        channelId?: string,
        hasOrder?: string,
        nameTrue?: string,
        noLoanAgain?: boolean,
        noLoanAgainDays?: number,
        phoneNo?: string,
        rnStatus?: string,
        status?: string,
        pageNum?: number,
        pageSize?: number,
        sortField?: string,
        sortOrder?: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/user-manage/user-download",
            query: {
                addEndTime: addEndTime,
                addStartTime: addStartTime,
                channelId: channelId,
                hasOrder: hasOrder,
                nameTrue: nameTrue,
                noLoanAgain: noLoanAgain,
                noLoanAgainDays: noLoanAgainDays,
                phoneNo: phoneNo,
                rnStatus: rnStatus,
                status: status,
                pageNum: pageNum,
                pageSize: pageSize,
                sortField: sortField,
                sortOrder: sortOrder,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取用户列表
     * @param addEndTime 註冊時間結束
     * @param addStartTime 註冊時間開始
     * @param channelId 渠道名稱
     * @param hasOrder 是否提單
     * @param nameTrue 姓名
     * @param noLoanAgain 結清未複借
     * @param noLoanAgainDays 結清未複借天數
     * @param phoneNo 手機號
     * @param rnStatus 是否實名
     * @param status 狀態
     * @param pageNum
     * @param pageSize
     * @param sortField
     * @param sortOrder
     * @returns Page_HsUserResponse_ OK
     * @throws ApiError
     */
    public static findUserListPageUsingGet(
        addEndTime?: string,
        addStartTime?: string,
        channelId?: string,
        hasOrder?: string,
        nameTrue?: string,
        noLoanAgain?: boolean,
        noLoanAgainDays?: number,
        phoneNo?: string,
        rnStatus?: string,
        status?: string,
        pageNum?: number,
        pageSize?: number,
        sortField?: string,
        sortOrder?: string
    ): CancelablePromise<Page_HsUserResponse_> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/hs/admin/user-manage/user-list",
            query: {
                addEndTime: addEndTime,
                addStartTime: addStartTime,
                channelId: channelId,
                hasOrder: hasOrder,
                nameTrue: nameTrue,
                noLoanAgain: noLoanAgain,
                noLoanAgainDays: noLoanAgainDays,
                phoneNo: phoneNo,
                rnStatus: rnStatus,
                status: status,
                pageNum: pageNum,
                pageSize: pageSize,
                sortField: sortField,
                sortOrder: sortOrder,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
