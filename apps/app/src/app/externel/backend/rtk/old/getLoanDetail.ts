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
  /** @description 是否逾期 */
  overdue?: boolean;
  /** @description 已還金額 */
  paidAmount?: number;
  /** @展期来源订单号 已還金額 */
  parentOrderNo?: string;
  /** @description 罰金金額 */
  penaltyInterest?: number;
  /** @description 產品名稱 */
  productName?: string;
  /** @description 推薦產品列表 */
  recommendProducts?: GetLoanDetailRecommendProducts[];
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
  status?:
    | 'EXTEND'
    | 'OVERDUE'
    | 'PAY_OFF'
    | 'PROCESSING'
    | 'REJECTED'
    | 'UNPAID';
  /** @description 訂單總應還金额 */
  totalDueAmount?: number;
}

/** chargeFeeDetail */
export interface GetLoanDetailChargeFeeDetail {
  items: GetLoanDetailChargeFeeDetailItems[];
  /** @description 标题 */
  title: string;
  /** @description 列舉結算金額 */
  totalSum: number;
}

export interface GetLoanDetailChargeFeeDetailItems {
  fieldType: 'CURRENCY' | 'TEXT';
  itemName: string;
  key:
    | 'CREDIT_APPROVAL_FEE'
    | 'DAILY_FEE'
    | 'GATEWAY_FEE'
    | 'GST'
    | 'LOAN_AMOUNT'
    | 'LOAN_INTEREST' // itemName: Interest
    | 'MANAGEMENT_FEE'
    | 'PENALTY_INTEREST'
    | 'PROCESSING_FEE'
    | 'REDUCTION_AMOUNT'
    | 'SERVICE_FEE' // itemName: Service Charge
    | 'IVA'
    | 'MARKUP_FEE'
    | 'OTHER_CHARGES'
    | 'PROCESS_FEE'
    | 'PROCESS_INCHARGE';
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

/** 推薦產品列表 */
export interface GetLoanDetailRecommendProducts {
  /** @description 借款合約書 */
  agreementUrl?: string;
  /** @description 广告通过率 */
  approvedRate?: string;
  /** @description 广告通过时间 */
  approvedTime?: string;
  /** @description background image */
  backgroundUrl?: string;
  /** @description 產品客服郵件 */
  csEmail?: string;
  /** @description 產品客服時間 */
  csTime?: string;
  /** @description 揭露聲明 */
  disclosureUrl?: string;
  /** @description 广告借款服务费率 */
  interestRate?: string;
  /** @description 广告额度 */
  loanQuota?: string;
  /** @description Logo icon */
  logoUrl?: string;
  /** @description 隱私權 */
  privacyUrl?: string;
  /** @description 產品流水號 */
  productId?: number;
  /** @description 產品名稱 */
  productName?: string;
  /** @description 排序 (预设从小到大) */
  sort?: number;
  /** @description [...] */
  tags?: string[];
  /** @description 广告借款周期 */
  term?: string;
  /** @description 服務條款 */
  termUrl?: string;
  /** @description 置顶 */
  top?: boolean;
}

export const mockGetLoanDetailResponse: GetLoanDetailResponse = {
  productName: 'ZZ LOAN',
  orderNo: 'no-3632791101642108-9',
  loanAmount: 3000,
  paidAmount: 0,
  repayRecords: [],
  totalDueAmount: 6300,
  balance: 0,
  extensionFee: 1350,
  status: 'EXTEND',
  serviceCharge: 300,
  dailyFee: 1620,
  reductionAmount: 0,
  penaltyInterest: 0,
  applyDate: '2022-06-20',
  dueDate: '2022-08-02',
  overdue: true,
  originalDueDate: '2022-06-26',
  extendDate: '2022-07-28',
  bankCardNo: '60159710853',
  customerServiceTime: '08:00AM ~ 12:00PM',
  customerServiceEmail: 'csemail@test.copm',
  iconUrl:
    'https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/ad_logo/ad-logo-822352090585600.png',
  extendable: false,
  extended: true,
  parentOrderNo: 'no-3632791101642108',
  chargeFeeDetail: {
    title: 'detail',
    totalSum: 4920,
    items: [
      {
        itemName: 'Loan Amount',
        key: 'LOAN_AMOUNT',
        value: '3000',
        fieldType: 'CURRENCY',
      },
      {
        itemName: 'Daily Fee',
        key: 'DAILY_FEE',
        value: '1620',
        fieldType: 'CURRENCY',
      },
      {
        itemName: 'Service Fee',
        key: 'SERVICE_FEE',
        value: '261',
        fieldType: 'CURRENCY',
      },
      {
        itemName: 'GST',
        key: 'GST',
        value: '18',
        fieldType: 'CURRENCY',
      },
      {
        itemName: 'Loan Interest',
        key: 'LOAN_INTEREST',
        value: '21',
        fieldType: 'CURRENCY',
      },
      {
        itemName: 'Reduction Amount',
        key: 'REDUCTION_AMOUNT',
        value: '0',
        fieldType: 'CURRENCY',
      },
      {
        itemName: 'Penalty Interest',
        key: 'PENALTY_INTEREST',
        value: '0',
        fieldType: 'CURRENCY',
      },
    ],
  },
  repayConfirmDetail: undefined,
  recommendProducts: [
    {
      productId: 3,
      logoUrl:
        'https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285186.png',
      productName: 'AA LOAN',
      loanQuota: '160-9000',
      term: '10Days',
      interestRate: '10~40%',
      approvedRate: '70 ~ 95%',
      approvedTime: '< 3 Min',
      tags: ['best', ' hot', ' lower rate'],
      csTime: '08:00AM ~ 7:00PM',
      csEmail: 'csemail@test.copm',
      privacyUrl: 'https://site.india-api-dev.com/api/v2/html/privacy',
      termUrl: 'https://site.india-api-dev.com/api/v2/html/agreement',
      disclosureUrl: 'https://site.india-api-dev.com/api/v2/html/disclosure',
      agreementUrl: 'https://site.india-api-dev.com/api/v2/html/agreement',
      top: true,
      sort: 0,
      backgroundUrl:
        'https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/bg1.jpg',
    },
    {
      productId: 4,
      logoUrl:
        'https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285141.png',
      productName: 'BB LOAN',
      loanQuota: '150-4500',
      term: '9Days',
      interestRate: '20~30%',
      approvedRate: '40~80%',
      approvedTime: '< 4 Min',
      tags: ['blah blah', ' richpapa', ' best of best'],
      csTime: '08:00AM ~ 7:00PM',
      csEmail: 'csemail@test.copm',
      privacyUrl: 'https://site.india-api-dev.com/api/v2/html/privacy',
      termUrl: 'https://site.india-api-dev.com/api/v2/html/agreement',
      disclosureUrl: 'https://site.india-api-dev.com/api/v2/html/disclosure',
      agreementUrl: 'https://site.india-api-dev.com/api/v2/html/agreement',
      top: true,
      sort: 1,
      backgroundUrl:
        'https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/bg1.jpg',
    },
    {
      productId: 5,
      logoUrl:
        'https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285116.png',
      productName: 'CC LOAN',
      loanQuota: '200-3000',
      term: '81Days',
      interestRate: '40~50%',
      approvedRate: '50-70%',
      approvedTime: '< 6 Min',
      tags: ['good', ' greate', ' fatest'],
      csTime: '08:00AM ~ 7:00PM',
      csEmail: 'csemail@test.copm',
      privacyUrl: 'https://site.india-api-dev.com/api/v2/html/privacy',
      termUrl: 'https://site.india-api-dev.com/api/v2/html/agreement',
      disclosureUrl: 'https://site.india-api-dev.com/api/v2/html/disclosure',
      agreementUrl: 'https://site.india-api-dev.com/api/v2/html/agreement',
      top: false,
      sort: 2,
      backgroundUrl:
        'https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/bg1.jpg',
    },
    {
      productId: 6,
      logoUrl:
        'https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285099.png',
      productName: 'EE LOAN',
      loanQuota: '3000 up',
      term: '2Weeks',
      interestRate: '30-45%',
      approvedRate: '15-50%',
      approvedTime: '< 2 Min',
      tags: ['haha', ' jojo', ' coco'],
      csTime: '08:00AM ~ 7:00PM',
      csEmail: 'csemail@test.copm',
      privacyUrl: 'https://site.india-api-dev.com/api/v2/html/privacy',
      termUrl: 'https://site.india-api-dev.com/api/v2/html/agreement',
      disclosureUrl: 'https://site.india-api-dev.com/api/v2/html/disclosure',
      agreementUrl: 'https://site.india-api-dev.com/api/v2/html/agreement',
      top: false,
      sort: 3,
      backgroundUrl:
        'https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/bg1.jpg',
    },
  ],
};
