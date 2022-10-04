import { GetDataCommonResponse } from "../../../../types/commonReponse";
export interface GetUserInfoRequestQuerystring {

    offset?: number;
    pageNumber?: number;
    pageSize?: number;
    paged?: boolean;
    sorted?: boolean;
    unsorted?: boolean;
    unpaged?: boolean;
    userId?: number;

}

export interface GetUserSms {
    content?: string;
    direction?: string;
    phone?: string;
    time?: number;
    userId?: number;
}

export type GetUserSmsProps = GetUserSms & GetDataCommonResponse;