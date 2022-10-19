// NOTICE: DTO
export interface ChannelTagDTO {
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

    showPermission: boolean;
    // 显示受权页面 0: 关闭 1: 开启

    showTermAndCondition: boolean;
    // 显示条款页面 0: 关闭 1: 开启
}
