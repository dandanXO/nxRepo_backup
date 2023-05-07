import { FeeRateKeyEnum } from './FeeRateKeyEnum';

export type PlatformChargeFeeRateDetail = {
  counting: number;
  // 费率占比%

  key: FeeRateKeyEnum;
  // KEY值

  title: string;
  // 收取项目
};
