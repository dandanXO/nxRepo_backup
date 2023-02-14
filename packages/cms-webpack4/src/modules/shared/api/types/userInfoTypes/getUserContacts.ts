import { GetPageableResponse } from "../../../types/commonReponse";

export interface GetUserContactsResponse {
    records: GetUserContacts[]
}
export interface GetUserContacts {
    lastUpdateTime?: string;
    name?: string;
    phone?: string;
}

export type GetUserContactsProps = GetUserContactsResponse & GetPageableResponse;
