export interface PostUserQuotaLabelRequestBody {
    labelColor?: string;       // 用户额度标签颜色
    loanAmount?: number;       // 用户可借金額
    loanCount?: number;        // 用户可借筆數
    quotaLabel?: string;       // 用户额度标签名称
}