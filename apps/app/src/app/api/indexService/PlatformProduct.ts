export type PlatformProduct = {
  logoUrl: string;
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
};
