import {FeeRateKey} from "./feeRateKey";

export type PlatformChargeFeeRateDetail = {
  counting: number;
  // 费率占比%

  key: FeeRateKey;
  // KEY值

  title: string;
  // 收取项目
}
