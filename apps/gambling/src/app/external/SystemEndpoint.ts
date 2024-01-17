import { ExternelEndpoint } from "./types";
import { GET_GLOBAL_CONFIG_URL, GET_MAINTENANCE_URL } from "./ApiUrl";

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

export {
  GetGlobalConfigEndpoint,
  GetMaintenanceEndpoint
}
