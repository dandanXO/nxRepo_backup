// 服务利率提额配置
export interface GetProductRequestQuery {
  productId: number;
}
export interface ProductInterestRatePair{
  num?: number;
  // 提额次数

  postInterest?: number;
  // 后置利率

  preInterest?:	number;
  // 前置利率

    /** 借款額度提額 */
    plusAmount?: number;
}

export interface GetProductQueryResponse{
  adminUsername?: string;
  // 后台管理者账号

  amountRange?: string;
  // 广告放款额度

  approveRate?:	string;
  // 广告放款通过率

  approveTime?:	string;
  // 广告放款通过时间

  backgroundImg?:	string;
  // 背景圖

  createTime?: string;
  // 创建时间

  csEmail?:	string;
  // 客服信箱

  csTime?:	string;
  // 客服时间

  dailyRate	?:number;
  // 日利息费率(天)

  enabled?:	boolean;
  // 启用/停用

  extensible?:	boolean;
  // 是否可展期

  extensibleOverdueDays?:	number;
  // 逾期N天内可展期

  extensionRate?:	number;
  // 展期费率

  interestRange?:	string;
  // 广告放款利率

  loanTerm?: number;
  // 借款周期

  logo?:	string
  // 产品logo url

  maxAmount?: number;
  // 最高可借金额

  merchantId?: number;
  // 商户流水号
  overdueRate?:	number;
  // 逾期费率(天)

  postInterestRate?:	number;
  // 后置利率

  preInterestRate?:	number;
  // 前置利率

  productId?: number;
  // 产品流水号

  productInterestRatePairs?: ProductInterestRatePair[];
  productName?:	string;
  // 产品名称

  repayExpiryDays?: number;
  // 还款链结有效天数

  showQuota?:	boolean;
  // 是否显示借款金额

  tags?:	string;
  // 热门标签

  templateType?: number;
  // 申请详情模版类型 (1: 一般 , 2: 合同金額=到手)

  termRange?:	string;
  // 广告借款周期

  top?:	boolean;
  // 置顶

  updateTime?:	string;
  weight?:	number;
  // 权重

}
