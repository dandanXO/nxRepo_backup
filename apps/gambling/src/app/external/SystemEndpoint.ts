import { ExternelEndpoint } from "./types";
import { GET_GLOBAL_CONFIG_URL, GET_MAINTENANCE_URL, GET_RECHARGE_CONFIG_URL } from "./ApiUrl";

type GetGlobalConfigResponseData = {
  withdraw_begin: string; // 禁止提现开始时间
  withdraw_end: string; // 禁止提现结束时间
  recharge_cashback_rate: string; // 次充展示赠送笔礼
  recharge_first_cashback_rate: string; // 首充赠金笔礼
  invite_hig_reward: number;
  forceUpdate: string;
  maintenance: {
    flag: number; // 0:正常运行 1:维护
    start: string; // 维护开始时间
    end: string; // 维护结束时间
  };
  url_download: string; // 下载地址
  current: string;
  group_telegram: string; // telegram频道
  manager_telegram: string; // telegram主管
  service_telegram: string; // telegram客服
  box_flag: number; // 是否开启宝箱游戏
  reward_daily_reset: boolean; // 邀请奖励每日重置开关
  recharge_bonus_start: number; // 首充赠金起始额度
}

type GetGlobalConfigResponse = {
  code: number;
  msg: string;
  data: GetGlobalConfigResponseData
}

type GetMaintenanceResponse = {
  code: number;
  msg: string;
  data: {
    flag: number;
    start: string;
    end: string
  }
}

type GetRechargeConfigResponseConfig = {
  id: number;
  amount_min: string; // 金额区间小值
  amount_max: string; // 金额区间大值
  rate: string; // 充值奖励
  bonus_rate: string; // 充值bonus
  bonus_finish: number; // 充值bonus效期(hr)
  status: 0 | 1; // 1开启，0关闭
  user_count_day: number; // 用户单日限购次数，0=不限制
  start_at: number; // 开始时间
  end_at: number; // 结束时间
  week_start_at: number; // 周几开始
  week_end_at: number; // 周几结束
  mail_title: string; // 邮件标题
  mail_content: string; // 邮件内容
  min_recharge_amount: string; // 最小充值金额
  max_recharge_amount: string; // 最大充值金额
  total_rebate: string; // 总返利
  buyTimes: number; // 购买次数
}

type GetRechargeConfigResponseOption = {
  recharge_options: number[]; // 充值选项
  recharge_options_default: number; // 默认充值选项
}

type GetRechargeConfigResponse = {
  code: number;
  msg: string;
  data: {
    config: GetRechargeConfigResponseConfig[],
    options: GetRechargeConfigResponseOption;
  }
}

// 取得全局配置
const GetGlobalConfigEndpoint = (builder: ExternelEndpoint) => builder.query<GetGlobalConfigResponse, null>({
  query: () => ({
    method: 'get',
    url: GET_GLOBAL_CONFIG_URL
  })
})

// 取得維護資訊
const GetMaintenanceEndpoint = (builder: ExternelEndpoint) => builder.query<GetMaintenanceResponse, null>({
  query: () => ({
    method: 'get',
    url: GET_MAINTENANCE_URL
  })
})

// 取得充值配置
const GetRechargeConfig = (builder: ExternelEndpoint) => builder.query<GetRechargeConfigResponse, { token: string }>({
  query: (params) => ({
    method: 'get',
    url: GET_RECHARGE_CONFIG_URL,
    params
  })
})

export {
  GetRechargeConfigResponseConfig,
  GetRechargeConfigResponseOption,

  GetGlobalConfigEndpoint,
  GetMaintenanceEndpoint,
  GetRechargeConfig
}
