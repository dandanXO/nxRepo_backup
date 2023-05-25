import { GetPageableResponse } from "../../../../shared/api/commonReponse";

export interface GetUserQuotaLabelListRequestQuerystring {
    labelId?: number|'';
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
}

export interface GetUserQuotaLabelListResponse {
    records: UserQuotaLabel[];
}

export interface UserQuotaLabel {
    createTime?: string;       // 创建时间
    id?: number|string;        // 用户额度标签ID
    labelColor?: string;       // 用户额度标签颜色
    balance?: number;          // 用户可借金額
    loanCount?: number;        // 用户可借筆數
    quotaLabel?: string;       // 用户额度标签名称
    updateTime?: string;       // 更新时间
}

export type GetUserQuotaLabelListProps = GetUserQuotaLabelListResponse & GetPageableResponse;

