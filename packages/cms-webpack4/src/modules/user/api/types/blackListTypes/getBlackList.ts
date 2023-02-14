import { GetPageableResponse } from "../../../../shared/api/commonReponse";

export interface GetBlackListRequestQuerystring {

    addTimeEnd?: string;
    addTimeStart?: string;
    idcardNo?: string;
    operatorId?:string;
    phoneNo?: string;
    userNameTrue?: string;
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;

}

export interface GetBlackListResponse {
    records: BlackListReponse[];
}
export interface BlackListReponse {

    addTime?: string;       //添加时间
    idcardNo?: string;      //身份证号
    operatorName?: string;  //操作人姓名
    phoneNo?: string;       //用户手机
    reason?: string;        //拉黑原因
    userId?: number;        //用户ID
    userNameTrue?: string;  //用户真实姓名
}

export type GetBlackListProps = GetBlackListResponse & GetPageableResponse;
