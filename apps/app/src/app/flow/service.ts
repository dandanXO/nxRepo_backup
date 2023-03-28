import {runAxios} from "../api/base/runAxios";
import {PlatformChargeFeeRateDetail} from "../api/models/PlatformChargeFeeRateDetail";
import {PayableRecords} from "../api/models/PayableRecords";
import {PlatformProduct} from "../api/models/PlatformProduct";
import {AvailableQuotaBar} from "../api/models/AvailableQuotaBar";

export type GetOpenIndexRequest = {
  packageId: string;
}

export type BannerResponse = {
  imageUrl?:	string;
  // 展示图片

  jumpUrl?:	string;
  // 跳转URL
}

export type GetOpenIndexResponse = {
  banners:	BannerResponse[];
  // Banner輪播广告橫幅
  customerServiceUrl:	string;
  // 線上客服連結

  forceApplyForNew:	boolean;
  // 新客是否有強下

  interestRate:	string;
  // example: 1.2-2.8
  // 开放首页广告借款利率

  loanQuotaAmount:	string;
  // example: 10000-30000
  // 开放首页广告借款额度

  loanTerms:	string;
  // example: 91+example
  // 开放首页广告借款周期

  marquee:	string;
  // 跑马灯

  popupUrl:	string;
  // 提醒弹跳H5页面or图片
}

const getOpenIndex = async (params: GetOpenIndexRequest) => {
  const {data}: {data: GetOpenIndexResponse} = await runAxios(
    "/api",
    "/v3/open-index",
    "get",
    null,
    params,
  )
  return data;
}


export type GetIndexRequest = {
  dummy: number;
}

export type GetIndexResponse = {
  availableAmount: number;
  // 可用额度

  bankBindH5url:	string;
  // H5银行绑卡URL

  chargeFeeDetails: PlatformChargeFeeRateDetail[]
  // 平台费率项目占比(砍头金各项名目占比)

  customerServiceUrl:	string;
  // 線上客服連結

  marquee:	string;
  // 跑馬燈文字

  needRiskKycUpdate:	boolean;
  // 是否需要更新上传风控客户信息

  offerExpireTime:	string;
  // example: yyyy-MM-dd'T'HH:mm:ss
  // 额度有效期限

  oldUserForceApply:	boolean;
  // 老客強下開關

  orderUnderReview:	boolean;
  // 是否有订单在审核中

  payableRecords: PayableRecords[];

  popupUrl:	string;
  // 公告彈窗H5

  products:	PlatformProduct[];
  // 平台產品

  quotaBar: AvailableQuotaBar;

  refreshOverRetry: 	boolean;
  // 額度刷新超過次數

  refreshable:	boolean;
  // 可否刷新額度: 用戶有可能風控拒絕多次 不給重新刷新

  refreshableUntil:	string;
  // example: yyyy-MM-dd'T'HH:mm:ss
  // 額度下次可刷新時間

  riskReject:	boolean;
  // 风控拒绝

  totalAmount: number;
  // 用户借款总额度

  usedAmount: number;
  // 已使用额度
}

const getIndex = async (params: GetIndexRequest) => {
  const {data}: {data: GetIndexResponse} = await runAxios(
    "/api",
    "/v3/index",
    "get",
    null,
    params,
  )
  return data;
}

export type UserServiceRequest = {
  //
}
export type UserServiceResponse = {
  demoAccount:	boolean;
  // google review account

  needUpdateKyc:	boolean;
  // 是否需要更新kyc资讯

  oldUser:	boolean;
  // 是否為老客

  organic:	boolean;
  // 是否为自然流量用户

  status: 0 | 1 | 2 | 3,
  // 用戶狀態 0: 未認證, 1: 通過認證, 2: 審核中, 3: 審核拒絕

  userName:	string;
}

const UserService = async (params: UserServiceRequest) => {
  const {data}: {data: UserServiceResponse} = await runAxios(
    "/api",
    "/v2/login/info",
    "get",
    null,
    {

    }
  )
  return data;
}

export const Service = {
  IndexService: {
    getOpenIndex,
    getIndex,
  },
  UserService,
}
