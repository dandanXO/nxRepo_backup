import {ProductApplyDetail} from "./productApplyDetail";

export type LoanServiceRequest = {
  appName?: string;
  // 包名

  applyAmount: number;
  // 借款申請總金額

  bankId: number;
  // 銀行帳戶流水號 (沒指定預設主卡收款)

  details: ProductApplyDetail[];

  deviceCode?: string;
  // 装置码

  deviceModel?: string;
  // 装置机型

  imei?: string;
  // IMEI

  systemVersion?: string;
  // 安卓版本
}
