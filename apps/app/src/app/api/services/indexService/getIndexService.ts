import {runAxios} from "../../base/runAxios";

export type GetIndexRequest = {
  dummy?: number;
}
export type PlatformChargeFeeRateDetail = {
  counting: number;
  // 费率占比%

  key: "DAILY_FEE" | "GST" | "LOAN_AMOUNT" | "LOAN_INTEREST" | "PENALTY_INTEREST" | "PROCESSING_FEE" | "REDUCTION_AMOUNT" | "SERVICE_FEE";
  // KEY值

  title: string;
  // 收取项目
}
export type AvailableQuotaBar = {
  current: number;
  // 拉霸初始額度

  max: number;
  // 拉霸最高額度

  min: number;
  // 拉霸最低額度

  serial: number;
  // 拉霸額度間隔

}
export type PayableRecords = {
  dueDate: string;
  // 訂單到期日 yyyy/MM/dd

  overdue: boolean;
  // 是否逾期

  payableAmount: number;
  // 應還金額

  productLogo: string;
  // 產品logo

  productName: string;
  // 產品名稱

  repayUrl: string;
  // 还款链结
}
export type PlatformProduct = {
  logoUrl: string
  // Logo URL

  max: number;
  // 最高借款额度

  min: number;
  // 最低借款额度

  platformChargeFeeRate: number;
  // example: 0.4
  // 平台收取费率%

  productId: number;
  // 产品ID

  productName: string;
  // 产品名稱

  terms: number;
  // 借款周期 ex: 2023-03-01 terms: 7d => 2023-03-07 23:59:59 (time before expired) 到期日为 2023-03-07
}
export type GetIndexResponse = {
  availableAmount: number;
  // 可用额度

  bankBindH5url: string;
  // H5银行绑卡URL

  chargeFeeDetails: PlatformChargeFeeRateDetail[]
  // 平台费率项目占比(砍头金各项名目占比)

  customerServiceUrl: string;
  // 線上客服連結

  marquee: string;
  // 跑馬燈文字

  needRiskKycUpdate: boolean;
  // 是否需要更新上传风控客户信息

  noQuotaBalance: boolean;
  // 当次刷新没有额度(新客、老客重刷沒額度)

  noQuotaByRetryFewTimes: boolean;
  // 刷新超過N次都没有额度

  offerExpireTime: string;
  // example: yyyy-MM-dd'T'HH:mm:ss
  // 额度有效期限

  oldUserForceApply: boolean;
  // 老客強下開關

  orderUnderReview: boolean;
  // 是否有订单在审核中

  payableRecords: PayableRecords[];

  popupUrl: string;
  // 公告彈窗H5

  products: PlatformProduct[];
  // 平台產品

  quotaBar: AvailableQuotaBar;

  refreshOverRetry: boolean;
  // 額度刷新超過次數

  refreshable: boolean;
  // 可否刷新額度: 用戶有可能風控拒絕多次 不給重新刷新

  refreshableUntil: string;
  // example: yyyy-MM-dd'T'HH:mm:ss
  // 額度下次可刷新時間

  riskReject: boolean;
  // 风控拒绝

  totalAmount: number;
  // 用户借款总额度

  usedAmount: number;
  // 已使用额度
}
export const getIndexService = async (params: GetIndexRequest) => {
  const {data}: { data: GetIndexResponse } = await runAxios(
    "/api",
    "/v3/index",
    "get",
    null,
    params,
  )
  return data;
}
