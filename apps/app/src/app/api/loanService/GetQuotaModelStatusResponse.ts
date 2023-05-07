export type GetQuotaModelStatusResponse = {
  calculating: boolean;
  // 额度模型是否计算中

  effective: boolean;
  // 额度是否有效

  offerExpireTime: string;
  // example: yyyy-MM-dd'T'HH:mm:ss
  // 额度有效时间
};
