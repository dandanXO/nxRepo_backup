import { GetDataCommonResponse } from "../../../../../types/commonReponse";

export interface GetUserSmsResponse{
    content:GetUserSms[]
}
export interface GetUserSms {
    content?: string;
    direction?: string;
    phone?: string;
    time?: number;
    userId?: number;
}

export type GetUserSmsProps = GetUserSmsResponse & GetDataCommonResponse;
