/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type LoginInfoResponse = {
    /**
     * google review account
     */
    demoAccount?: boolean;
    /**
     * 是否為老客
     */
    oldUser?: boolean;
    /**
     * 用戶狀態  0: 未認證,  1:  通過認證,  2: 審核中,  3: 審核拒絕
     */
    status?: LoginInfoResponse.status;
    /**
     * 用戶姓名
     */
    userName?: string;
};

export namespace LoginInfoResponse {
    /**
     * 用戶狀態  0: 未認證,  1:  通過認證,  2: 審核中,  3: 審核拒絕
     */
    export enum status {
        "_0" = 0,
        "_1" = 1,
        "_2" = 2,
        "_3" = 3,
    }
}
