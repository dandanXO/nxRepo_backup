import {runAxios} from "../base/runAxios";

export type LoanServiceRequest = {
  appName?:	string;
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

export type ProductApplyDetail = {
  applyAmount: number;
  // 借款申請金額

  productId: number;
  // 產品編號
}

export type LoanServiceResponse = {
  //
}

export const applyLoanService = async (req: LoanServiceRequest) => {
  await runAxios(
    "/api",
    "/v3/loan/apply",
    "post",
      req,
  )
}
