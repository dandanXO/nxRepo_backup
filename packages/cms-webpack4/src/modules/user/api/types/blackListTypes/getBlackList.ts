import { GetPageableResponse } from "../../../../../types/commonReponse";

export interface GetBlackListRequestQuerystring {

    startTIme?: string;            
    endTime?: string;          
    userTrueName?: string;            
    userPhone?: string;   
    idcardNo?: string;          
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;

}

export interface GetBlackListResponse {
    records: BlackListReponse[];
}
export interface BlackListReponse {
    startTIme?: string;
    endTime?: string;
    userTrueName?: string;
    userPhone?: string;
    remark?: string;
    idcardNo?: string;
}

export type GetBlackListProps = GetBlackListResponse & GetPageableResponse;