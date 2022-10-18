import { GetDataCommonResponse } from "../../../../../types/commonReponse";

export interface GetUserContactsResponse {
    content:GetUserContacts[]
}
export interface GetUserContacts {
    lastUpdateTime?: string;
    name?: string;
    phone?: string;
}

export type GetUserContactsProps = GetUserContactsResponse & GetDataCommonResponse;