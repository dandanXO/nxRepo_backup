import { BannerResponse } from './BannerResponse';

export type GetOpenIndexResponse = {
  banners: BannerResponse[];
  // Banner輪播广告橫幅
  customerServiceUrl: string;
  // 線上客服連結

  forceApplyForNew: boolean;
  // 新客是否有強下

  interestRate: string;
  // example: 1.2-2.8
  // 开放首页广告借款利率

  loanQuotaAmount: string;
  // example: 10000-30000
  // 开放首页广告借款额度

  loanTerms: string;
  // example: 91+example
  // 开放首页广告借款周期

  marquee: string;
  // 跑马灯

  popupUrl: string;
  // 提醒弹跳H5页面or图片
};