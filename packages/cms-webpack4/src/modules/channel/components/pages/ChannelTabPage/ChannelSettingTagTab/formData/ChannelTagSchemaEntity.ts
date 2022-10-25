import {z} from "zod";
import {SchemaEntity} from "../../../../../../shared/utils/validation/SchemaEntity";


// NOTICE: VO Input Schema

// NOTICE: Schema
// NOTE: message
const REQUIRED_MESSAGE = "请输入";
const POSITIVE_NUMBER_MESSAGE = "请填写正整数";

// NOTE: custom rules
const customZodStringRules = (name: string) => {
    return z.string({
        required_error: `${REQUIRED_MESSAGE}${name}`
    })
}
const customZodNumberRules = (name: string) => z.number({
    required_error: `${REQUIRED_MESSAGE}${name}`,
    invalid_type_error: POSITIVE_NUMBER_MESSAGE,
}).positive(POSITIVE_NUMBER_MESSAGE);


export const ChannelTagSchema = z.object({
    auditAcc: customZodStringRules("测试登录帳號"),
    // google audit acc

    auditAccOtpCode: customZodStringRules("测试登录验证码").regex(/^\d{6}$/, "请填写6位数字"),
    // google audit 登入验证码

    auditLoanAmount: customZodNumberRules("本金"),
    // 审核的借款金额

    auditQuota: customZodNumberRules("订单额度"),
    // 审核的订单额度

    auditServiceFee: customZodNumberRules("服务费"),
    // 审核的服务费

    auditTaxFee: customZodNumberRules("税额"),
    // 审核的利息

    auditTerm: customZodNumberRules("天数"),
    // 审核的天数

    name: customZodStringRules("渠道配置标签").min(1, REQUIRED_MESSAGE + "渠道配置标签"),
    // APP設定名称
})

// NOTICE: SchemaType
export type IChannelTagSchema = z.infer<typeof ChannelTagSchema>;

// NOTICE: SchemaEntity
export class ChannelTagSchemaEntity extends SchemaEntity<IChannelTagSchema> {
    // sourceData: any;
    constructor() {
        super(ChannelTagSchema);
    }
    // TODO: REFACTOR ME
    transformToEntityData(sourceData: any): IChannelTagSchema {
        return {
            auditAcc	:sourceData.auditAcc,
            // google audit acc

            auditAccOtpCode: sourceData.auditAccOtpCode,
            // google audit 登入验证码

            auditLoanAmount	:!isNaN(sourceData.auditLoanAmount) ? Number(sourceData.auditLoanAmount) : sourceData.auditLoanAmount,
            // 审核的借款金额

            auditQuota	:!isNaN(sourceData.auditQuota) ? Number(sourceData.auditQuota) : sourceData.auditQuota,
            // 审核的订单额度

            auditServiceFee	:!isNaN(sourceData.auditServiceFee) ? Number(sourceData.auditServiceFee) : sourceData.auditServiceFee,
            // 审核的服务费

            auditTaxFee	:!isNaN(sourceData.auditTaxFee) ? Number(sourceData.auditTaxFee) : sourceData.auditTaxFee,
            // 审核的利息

            auditTerm	:!isNaN(sourceData.auditTerm) ? Number(sourceData.auditTerm) : sourceData.auditTerm,
            // 审核的天数

            name	:sourceData.name,
            // APP設定名称
        }
        // return this;
    }
}
