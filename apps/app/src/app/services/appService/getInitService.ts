import {runAxios} from "../api/base/runAxios";

export interface GetInitServiceRequest {
  packageId: string;
}

export interface GetInitServiceResponse {
  couponH5Url:	string;
  // H5优惠券列表(预留)

  crossRegionIp:	boolean;
  // 跨区域请求

  csContactNumber:	string;
  // 平台客服電話

  csEmail:	string;
  // 平台客服信箱

  i18nLastUpdateTime: number;
  // 多國語最後異動時間 unix time

  indexH5Url:	string;
  // H5首頁URL

  kycFirst:	boolean;
  // 登入后跳转KYC

  loginFirst:	boolean;
  // 首页登入优先(未登入前看到假首页)

  nbfc:	boolean;
  // 是否為NBFC產品

  partnership: boolean;
  // 是否顯示合作夥伴

  partnershipUrl: string;
  // 合作夥伴H5連結

  sdkProvider: SDKProvider;

  showPermission:	boolean;
  // 是否显示授权页

  showTermAndCondition:	boolean;
  // 是否显示条款页
}

type SDKProvider = {
  idCardOcr: SDKidCardOcr;
  liveDetect: SDKliveDetect;
  taxCardOcr: SDKtaxCardOcr;
}
// 身分證掃描
export enum SDKidCardOcr {
  ACCUAUTH,
  ADV_IQA,
  ADV_IQC,
  GCT,
  NONE
}

// 活体掃描
export enum SDKliveDetect {
  ACCUAUTH,
  ADVANCE,
  GCT,
  NONE
}

// 稅卡掃描
export enum SDKtaxCardOcr {
  ACCUAUTH,
  ADV_IQA,
  ADV_IQC,
  GCT,
  NONE
}

export const GetInitService = async (params: GetInitServiceRequest): Promise<GetInitServiceResponse> => {
  const {data}: { data: GetInitServiceResponse }  = await runAxios(
    "/api",
    "/v2/init",
    "get",
    null,
  params,
  )
  return data;
}
