// GetLoanDetail
export interface GetLoanDetailRequestQuery {
    /** 訂單號 */
    orderNo?: string;
};

export interface GetLoanDetailResponse {
    /** @description 申請日期 */
    applyDate?: string;
    /** @description 審核紀錄 */
    approveRecords?: GetLoanDetailApproveRecords[];
    /** @description 待還金額 */
    balance?: number;
    /** @description 銀行卡號 */
    bankCardNo?: string;
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
    /** @description 罰金金額 */
    penaltyInterest?: number;
    /** @description 產品名稱 */
    productName?: string;
    /** @description 減免金額 */
    reductionAmount?: number;
    /** @description 還款紀錄 */
    repayRecords?: GetLoanDetailRepayRecords[];
    /** @description 服務費金額 */
    serviceCharge?: number;
    /**
     * @description 狀態
     * @enum {string}
     */
    status?: "EXTEND" | "OVERDUE" | "PAY_OFF" | "PROCESSING" | "UNPAID";
};

/** 還款紀錄 */
export interface GetLoanDetailRepayRecords {
    /** @description 待還金額 */
    balance?: number;
    /** @description 還款金額 */
    repayAmount?: number;
    /** @description 還款日期 */
    repayDate?: string;
};

/** 審核紀錄 */
export interface GetLoanDetailApproveRecords {
    /** @description 內容 */
    content?: string;
    /** @description 時間 */
    createTime?: string;
    /** @description 標題 */
    title?: string;
};


export const mockGetLoanDetailResponse:GetLoanDetailResponse = {
    applyDate: "",
    /** @description 審核紀錄 */
    approveRecords: [
        {
            /** @description 內容 */
            content: "123213",
            /** @description 時間 */
            createTime: "12321312",
            /** @description 標題 */
            title: "fdsafdsa",
        }
    ],
    /** @description 待還金額 */
    balance: 123456,
    /** @description 銀行卡號 */
    bankCardNo: "fdsafdas",
    /** @description 客服Email */
    customerServiceEmail: "fda@gdsa.com",
    /** @description 客服服務時間 */
    customerServiceTime: "12321",
    /** @description 日息金額 */
    dailyFee: 12321321,
    /** @description 到期日期 */
    dueDate: "13221",
    /** @description 展期日期(status=EXTEND才會有) */
    extendDate: "1321321",
    /** @description 展期費用(status=EXTEND才會有) */
    extensionFee: 1234,
    /** @description Icon url */
    iconUrl: "",
    /** @description 借款金额 */
    loanAmount: 12321,
    /** @description 單號 */
    orderNo: "1232123",
    /** @description 原始到期日期(status=EXTEND才會有) */
    originalDueDate: "1232123",
    /** @description 已還金額 */
    paidAmount: 123,
    /** @description 罰金金額 */
    penaltyInterest: 123,
    /** @description 產品名稱 */
    productName: "fdsafdsa",
    /** @description 減免金額 */
    reductionAmount: 1231,
    /** @description 還款紀錄 */
    repayRecords: [
        {
            /** @description 待還金額 */
            balance: 10000,
            /** @description 還款金額 */
            repayAmount: 1321,
            /** @description 還款日期 */
            repayDate: "12321321",
        }
    ],
    /** @description 服務費金額 */
    serviceCharge: 1231,
    /**
     * @description 狀態
     * @enum {string}
     */
    status: "EXTEND",
}
