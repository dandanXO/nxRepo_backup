// NOTICE: DTO
export interface ChannelTag {
    auditAcc: string;
    // google audit acc

    auditAccOtpCode: string;
    // google audit 登入验证码

    auditLoanAmount: string;
    // 审核的借款金额

    auditQuota: string;
    // 审核的订单额度

    auditServiceFee: string;
    // 审核的服务费

    auditTaxFee: string;
    // 审核的利息

    auditTerm: string;
    // 审核的天数

    id?: number;
    // ID

    name: string;
    // APP設定名称

    occupied: boolean;
    // 是否使用中
}
