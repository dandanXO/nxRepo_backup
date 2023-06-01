export enum RISK_CONTROL_STATE {
  'unknow',

  // NOTE: 是否可重刷風控額度
  // 'expired_refresh',

  // NOTE: 重刷風控額度
  // 'expired',
  'expired_refresh_able', // NOTE: 由後端得知
  'expired_refresh_one_time',  // NOTE: 由前端得知

  'expired_refresh_over_3', // NOTE: 由後端得知

  'empty_quota', // NOTE: (由後端得知) 風控取得就為零，不是已經借完
  'valid',
}


