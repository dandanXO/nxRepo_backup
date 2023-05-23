import { GetLoanDetailChargeFeeDetail } from '../rtk/old/getLoanDetail';
import { RepayConfirmDetail } from './RepayConfirmDetail';
import { RepayRecord } from './RepayRecord';

export interface GetLoanDetailResponse {
  applyDate?: string; // 申請日期
  balance?: number; // 待還金額 (status=UNPAID, OVERDUE才會有)
  bankCardNo?: string; // 銀行卡號
  chargeFeeDetail: GetLoanDetailChargeFeeDetail;
  customerServiceEmail?: string; // 客服Email
  customerServiceTime?: string; // 客服服務時間
  dailyFee?: number; // 日息金額
  dueDate?: string; // 到期日期
  extendDate?: string; // 展期日期(status = EXTEND才會有)
  extendable?: boolean; // 该订单是否可展期
  extended?: boolean; // 是否为展期订单
  extensionFee?: number; // 展期費用(status = EXTEND才會有)
  iconUrl?: string; // Icon url
  loanAmount?: number; // 借款金额(合同金額)
  loanDate?: string; // 放款日期
  orderNo?: string; // 單號
  originalDueDate?: string; // 原始到期日期(status = EXTEND才會有)
  overdue?: boolean; // 是否逾期
  overdueDays?: number; // 逾期天数
  paidAmount?: number; // 已還金額
  parentOrderNo?: string; // 展期来源订单号
  penaltyInterest?: number; // 罰金金額
  productName?: string; // 產品名稱
  recommendProducts?: []; // 推薦產品列表
  reductionAmount?: number; // 減免金額
  repayConfirmDetail?: RepayConfirmDetail;
  repayRecords: RepayRecord[]; // 還款紀錄
  serviceCharge?: number; // 服務費金額(砍頭金)
  status?: 'EXTEND' | 'OVERDUE' | 'PAY_OFF' | 'PROCESSING' | 'REJECTED' | 'UNPAID'; //狀態
  totalDueAmount?: number; // 訂單總應還金额 (status=UNPAID, OVERDUE才會有)
  totalRepayAmount?: number; // 實際還款金额 summary of repayRecords (status=EXTEND)
}
