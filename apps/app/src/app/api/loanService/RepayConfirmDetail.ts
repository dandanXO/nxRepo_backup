export interface RepayConfirmDetail {
  balance?: number;      // 剩餘應還金額
  extendDate?: string;      // 展期日期
  extensionFee?: number;      // 展期費用 (+)
  extensionPayAmount?: number;      // 展期應付金額
  paidAmount?: number;      // 已還金額 (-)
  penaltyInterest?: number;      // 罰金金額 (+)
  reductionAmount?: number;      // 減免金額 (-)
}
