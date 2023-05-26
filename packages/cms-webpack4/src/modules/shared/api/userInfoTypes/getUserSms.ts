import { GetPageableResponse } from '../commonReponse';

export interface GetUserSmsResponse {
    records: GetUserSms[];
}
export interface GetUserSms {
    content?: string;
    direction?: string;
    phone?: string;
    time?: number;
    userId?: number;
}

export type GetUserSmsProps = GetUserSmsResponse & GetPageableResponse;
