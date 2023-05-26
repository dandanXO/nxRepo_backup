import { GetPageableResponse } from '../../../../shared/api/commonReponse';

export interface GetWhiteListRequestQuerystring {
    addTimeEnd?: string; // 添加時間迄
    addTimeStart?: string; // 添加時間起
    operatorId?: number | string; // 操作人id
    phoneNo?: string; // 手機號
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
}

export interface GetWhiteListResponse {
    records: WhiteListReponse[];
}
export interface WhiteListReponse {
    addTime?: string;
    id?: number;
    operatorName?: string;
    phoneNo?: string;
}

export type GetWhiteListProps = GetWhiteListResponse & GetPageableResponse;
