/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserSMSLogVO } from "./UserSMSLogVO";

export type BaseRs_List_UserSMSLogVO_ = {
    /**
     * 返回码
     */
    code?: number;
    data?: Array<UserSMSLogVO>;
    /**
     * 返回结果描述
     */
    message?: string;
};
