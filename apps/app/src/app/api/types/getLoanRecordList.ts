import Content from "libs/mobile/shared/ui/src/lib/components/Modal/Content";

export interface GetLoanRecordListRequestQuery {
    pageNumber?: number;
    pageSize?: number;
    status:'EXTEND'
    | 'OVERDUE'
    | 'PAY_OFF'
    | 'PROCESSING'
    | 'REJECTED'
    | 'UNPAID';
    // token:string;
}

export interface GetLoanRecordListReponse {
    content: GetLoanRecord[];
}
export interface GetLoanRecord {


    applyDate?: string;                   // 申請日期
    approveRecords?: ApproveRecord[];     // 審核紀錄
    balance?: number;                     // 待還金額(status = UNPAID, OVERDUE才會有)
    bankCardNo?: string;                  // 銀行卡號
    chargeFeeDetail?: ChargeFeeDetail[];
    customerServiceEmail?: string;        // 客服Email
    customerServiceTime?: string;         // 客服服務時間
    dailyFee?: number;                    // 日息金額
    detailH5lUrl?: string;                // Loan Detail H5 URL
    dueDate?: string;                     // 到期日期
    extendDate?: string;                  // 展期日期(status = EXTEND才會有)
    extensionFee?: number;                // 展期費用(status = EXTEND才會有)
    iconUrl?: string;                     // Icon url
    loanAmount?: number;                  // 借款金额
    loanDate?: number;                    // 放款时间
    orderNo?: string;                     // 單號
    originalDueDate?: string;             // 原始到期日期(status = EXTEND才會有)
    overdue?: boolean;                    // 是否逾期
    overdueDays?: number;                // 逾期天数
    paidAmount?: number;                  // 已還金額
    penaltyInterest?: number;             // 罰金金額
    productName?: string;                 // 產品名稱
    reductionAmount?: number;             // 減免金額
    repayRecords?: RepayRecord[];
    serviceCharge?: number;               // 服務費金額(砍頭金)
    status?:
    'EXTEND'
    | 'OVERDUE'
    | 'PAY_OFF'
    | 'PROCESSING'
    | 'REJECTED'
    | 'UNPAID';  //狀態
    totalDueAmount?: number;              // 訂單總應還金额 (status=UNPAID, OVERDUE才會有)
  

  
}

interface ApproveRecord {
    content?: string;      // 內容
    createTime?: string;   // 時間
    title?: string;        // 標題
}

interface ChargeFeeDetail {
    items?: ChargeFeeItem[];
    title?: string;          //标题
    totalSum?: number;       //列舉結算金額
}

interface ChargeFeeItem {
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

interface RepayRecord {
    repayAmount?: number;  // 還款金額
    repayDate?: string;    //還款日期
    repayType?: string;    //還款類型
}