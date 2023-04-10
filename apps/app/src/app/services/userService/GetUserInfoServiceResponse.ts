export type GetUserInfoServiceResponse = {
  demoAccount: boolean;
  // google review account

  needUpdateKyc: boolean;
  // 是否需要更新kyc资讯

  oldUser: boolean;
  // 是否為老客

  organic: boolean;
  // 是否为自然流量用户

  status: 0 | 1 | 2 | 3,
  // 用戶狀態 0: 未認證, 1: 通過認證, 2: 審核中, 3: 審核拒絕

  userName: string;
}
