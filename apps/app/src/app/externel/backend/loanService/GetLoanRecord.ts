import {GetLoanDetailChargeFeeDetail} from '../rtk/old/getLoanDetail';
import {ApproveRecord} from './ApproveRecord';
import {RepayRecord} from './RepayRecord';

export interface GetLoanRecord {
  applyDate?: string; // 申請日期
  approveRecords?: ApproveRecord[]; // 審核紀錄
  balance?: number; // 待還金額(status = UNPAID, OVERDUE才會有)
  bankCardNo?: string; // 銀行卡號
  chargeFeeDetail?: GetLoanDetailChargeFeeDetail;
  customerServiceEmail?: string; // 客服Email
  customerServiceTime?: string; // 客服服務時間
  dailyFee?: number; // 日息金額
  detailH5lUrl?: string; // Loan Detail H5 URL
  dueDate?: string; // 到期日期
  extendDate?: string; // 展期日期(status = EXTEND才會有)
  extension?: boolean; // 是否为展期中
  extensionFee?: number; // 展期費用(status = EXTEND才會有)
  iconUrl?: string; // Icon url
  loanAmount?: number; // 借款金额
  loanDate?: string; // 放款时间
  orderAmount?: number; // 訂單合同金額
  orderNo?: string; // 單號
  originalDueDate?: string; // 原始到期日期(status = EXTEND才會有)
  overdue?: boolean; // 是否逾期
  overdueDays?: number; // 逾期天数
  paidAmount?: number; // 已還金額
  penaltyInterest?: number; // 罰金金額
  productName?: string; // 產品名稱
  reductionAmount?: number; // 減免金額
  repayRecords?: RepayRecord[];
  serviceCharge?: number; // 服務費金額(砍頭金)
  status?: 'EXTEND' | 'OVERDUE' | 'PAY_OFF' | 'PROCESSING' | 'REJECTED' | 'UNPAID'; //狀態
  totalDueAmount?: number; // 訂單總應還金额 (status=UNPAID, OVERDUE才會有)
  totalRepayAmount?: number; // 實際還款金额 summary of repayRecords (status=EXTEND)
}
