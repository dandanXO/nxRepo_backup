export type AvailableQuotaBar = {
  current: number;
  // 拉霸初始額度

  max: number;
  // 拉霸最高額度

  min: number;
  // 拉霸最低額度

  serial: number;
  // 拉霸額度間隔

  steps: number[]
};
