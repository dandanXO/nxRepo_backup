export enum RISK_CONTROL_STATE {
  'unknow',
  // "expired",
  'expired_refresh_able',
  'expired_refresh_one_time',
  'expired_refresh_over_3',
  'empty_quota', // NOTE: 風控取得就為零，不是已經借完
  'valid',
}
