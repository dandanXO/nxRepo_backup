export type GetPersonalLoanRecommendRequestQuerystring = {
  count?: string;
}

export type GetPersonalLoanRecommendResponse = {
  products: RecommendProduct[];
  quotaBar: PersonalQuotaBar;
  quotaExpireTime?: string;
  // 個人額度有效期限
  processing: boolean;
  // 是否有已提交/处里中/审核中的申请

  riskReject?: boolean;
}

export type RecommendProduct = {
  approvedRate?:	string;
  // 广告通过率

  approvedTime?:	string;
  // 广告通过时间

  csContact?:	string;
  // 客服電話

  csEmail?:	string;
  // 產品客服郵件

  interestRate?:	string;
  // 建议借款服务费率

  loanableAmount?:	number;
  // 建议金额

  logoUrl?:	string;
  // Logo icon

  productId:	number;
  // 產品编号

  productName?:	string;
  // 產品名稱

  terms?:	string;
  // 建议借款周期
}

export type PersonalQuotaBar = {
  current: number;
  // 拉霸初始額度

  interval: number;
  // 拉霸額度間隔

  max: number;
  // 拉霸最高額度

  min: number;
  // 拉霸最低額度
}
