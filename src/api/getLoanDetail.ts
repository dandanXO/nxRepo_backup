// GetLoanDetail
export interface GetLoanDetailRequestQuerystring {
    /** 訂單號 */
    orderNo?: string;
}

export interface GetLoanDetailResponse {
    /** @description 申請日期 */
    applyDate?: string;
    /** @description 審核紀錄 */
    approveRecords?: GetLoanDetailApproveRecords[];
    /** @description 待還金額 */
    balance?: number;
    /** @description 銀行卡號 */
    bankCardNo?: string;
    /** @description chargeFeeDetail */
    chargeFeeDetail?: GetLoanDetailChargeFeeDetail;
    /** @description 客服Email */
    customerServiceEmail?: string;
    /** @description 客服服務時間 */
    customerServiceTime?: string;
    /** @description 日息金額 */
    dailyFee?: number;
    /** @description 到期日期 */
    dueDate?: string;
    /** @description 展期日期(status=EXTEND才會有) */
    extendDate?: string;
    /** @description 是否可展期 */
    extendable?: boolean;
    /** @description 是否为展期订单 */
    extended?: boolean;
    /** @description 展期費用(status=EXTEND才會有) */
    extensionFee?: number;
    /** @description Icon url */
    iconUrl?: string;
    /** @description 借款金额 */
    loanAmount?: number;
    /** @description 單號 */
    orderNo?: string;
    /** @description 原始到期日期(status=EXTEND才會有) */
    originalDueDate?: string;
    /** @description 已還金額 */
    paidAmount?: number;
    /** @展期来源订单号 已還金額 */
    parentOrderNo?: string;
    /** @description 罰金金額 */
    penaltyInterest?: number;
    /** @description 產品名稱 */
    productName?: string;
    /** @description 減免金額 */
    reductionAmount?: number;
    /** @description repayConfirmDetail */
    repayConfirmDetail?: GetLoanDetailRepayConfirmDetail;
    /** @description 還款紀錄 */
    repayRecords?: GetLoanDetailRepayRecords[];

    /** @description 服務費金額 */
    serviceCharge?: number;
    /**
     * @description 狀態
     * @enum {string}
     */
    status?: "EXTEND" | "OVERDUE" | "PAY_OFF" | "PROCESSING" | "UNPAID";
    /** @description 訂單總應還金额 */
    totalDueAmount?: number;
}

/** chargeFeeDetail */
export interface GetLoanDetailChargeFeeDetail {
    items: GetLoanDetailChargeFeeDetailItems[];
    title: string;
}

export interface GetLoanDetailChargeFeeDetailItems {
    fieldType: string;
    itemName: "CURRENCY" | "TEXT";
    key:
        | "DAILY_FEE"
        | "LOAN_AMOUNT"
        | "PENALTY_INTEREST"
        | "REDUCTION_AMOUNT"
        | "SERVICE_CHARGE";
    value: string;
}

/** repayConfirmDetail */
export interface GetLoanDetailRepayConfirmDetail {
    /** @description 剩餘應還金額 */
    balance?: number;
    /** @description 展期日期 */
    extendDate?: string;
    /** @description 展期費用 (+) */
    extensionFee?: number;
    /** @description 展期應付金額 */
    extensionPayAmount?: number;
    /** @description 已還金額 (-) */
    paidAmount?: number;
    /** @description 罰金金額 (+) */
    penaltyInterest?: number;
    /** @description 減免金額 (-) */
    reductionAmount?: number;
}

/** 還款紀錄 */
export interface GetLoanDetailRepayRecords {
    /** @description 還款類型 */
    repayType?: string;
    /** @description 還款金額 */
    repayAmount?: number;
    /** @description 還款日期 */
    repayDate?: string;
}

/** 審核紀錄 */
export interface GetLoanDetailApproveRecords {
    /** @description 內容 */
    content?: string;
    /** @description 時間 */
    createTime?: string;
    /** @description 標題 */
    title?: string;
}

export const mockGetLoanDetailResponse: GetLoanDetailResponse = {
    productName: "ZZ LOAN",
    orderNo: "no-3632791101642108",
    loanAmount: 3000.0,
    paidAmount: 1380.0,
    repayRecords: [
        {
            repayDate: "2022-06-25",
            repayAmount: 1380.0,
            repayType: "partial",
        },
    ],
    balance: 1620.0,
    extensionFee: null,
    status: "EXTEND",
    serviceCharge: 1380.0,
    dailyFee: 0,
    reductionAmount: 0,
    penaltyInterest: 0,
    applyDate: "2022-06-20",
    dueDate: "2022-06-26",
    originalDueDate: "2022-06-26",
    extendDate: "2022-06-20",
    bankCardNo: "60159710853",
    customerServiceTime: "08:00AM ~ 12:00PM",
    customerServiceEmail: "csemail@test.copm",
    iconUrl:
        "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/ad_logo/ad-logo-822352090585600.png",

    extendable: false,
    extended: true,
    parentOrderNo: null,
};
