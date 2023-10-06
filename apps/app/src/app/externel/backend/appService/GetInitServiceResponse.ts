import {SDKProvider} from './SDKProvider';

export interface GetInitServiceResponse {
  couponH5Url: string;
  // H5优惠券列表(预留)

  crossRegionIp: boolean;
  // 跨区域请求

  csContactNumber: string;
  // 平台客服電話

  csEmail: string;
  // 平台客服信箱

  csServiceTime: string;
  // 平台客服服务时间

  csWhatsApp: string;
  // 平台WhatsApp号码

  i18nLastUpdateTime: number;
  // 多國語最後異動時間 unix time

  indexH5Url: string;
  // H5首頁URL

  kycFirst: boolean;
  // 登入后跳转KYC

  loginFirst: boolean;
  // 首页登入优先(未登入前看到假首页)

  nbfc: boolean;
  // 是否為NBFC產品

  partnership: boolean;
  // 是否顯示合作夥伴

  partnershipUrl: string;
  // 合作夥伴H5連結

  sdkProvider: SDKProvider;

  showPermission: boolean;
  // 是否显示授权页

  showTermAndCondition: boolean;
  // 是否显示条款页
}
