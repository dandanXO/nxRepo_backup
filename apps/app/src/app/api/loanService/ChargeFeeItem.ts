

export interface ChargeFeeItem {
    fieldType?: 'CURRENCY' | 'SEPARATOR' | 'TEXT';   // 展示类型 纯文字 | 金额
    itemName?: string;     // 项目展示名称
    key?:
    'DAILY_FEE'
    | 'GST'
    | 'LOAN_AMOUNT'
    | 'LOAN_INTEREST'
    | 'PENALTY_INTEREST'
    | 'PROCESSING_FEE'
    | 'REDUCTION_AMOUNT'
    | 'SERVICE_FEE';       // 项目对应key值
    value?: string;        // 展示值
}
