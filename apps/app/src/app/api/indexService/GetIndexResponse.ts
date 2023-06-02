import { AvailableQuotaBar } from './AvailableQuotaBar';
import { PayableRecords } from './PayableRecords';
import { PlatformChargeFeeRateDetail } from './PlatformChargeFeeRateDetail';
import { PlatformProduct } from './PlatformProduct';

export type GetIndexResponse = {
  availableAmount: number;
  // 可用额度

  bankBindH5url: string;
  // H5银行绑卡URL

  chargeFeeDetails: PlatformChargeFeeRateDetail[];
  // 平台费率项目占比(砍头金各项名目占比)

  customerServiceUrl: string;
  // 線上客服連結

  loanAgreementUrl: string;
  // 借款同意申明URL

  marquee: string;
  // 跑馬燈文字

  needRiskKycUpdate: boolean;
  // 是否需要更新上传风控客户信息

  noQuotaBalance: boolean;
  // 当次刷新没有额度(新客、老客重刷沒額度)
  // true  完全沒錢 (只有levle 4會用到)
  // false 有錢但借光了

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
};
