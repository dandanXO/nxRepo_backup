import {ExternelEndpoint} from "./types";

export type GetRequest = {
  appChannel: string;
  appPackageName: string;
  appVersion: string;
}
export type GetResponseData = {
  "recharge_options": number[];
  "recharge_amount_min": number;
  "current": string;
  "forceUpdate": string;
  "url_download": string;
  "withdraw_fee": number;
  "withdraw_min": number;
  "withdraw_step": number;
  "maintenance": {
    "flag": number;
    "start": string;
    "end": string;
  },
  "practice_balance": number;
  "device_user_limit": number;
  "recharge_options_default": number;
  "service_email": string;
  "mgm_config": {
    "switch": string;
    "register_reward": string;
    "first_charge_reward": string;
    "first_recharge_reward": string;
    "second_recharge_reward": string;
    "three_recharge_reward": string;
    "bind_invite_code_bonus_reward": string;
    "bind_invite_code_bonus_reward_validity": string;
    "recharge_bonus_reward": string[];
    "recharge_bonus_reward_validity": string[];
    "recharge_reminder_email_title": string;
    "recharge_reminder_email_content": string;
    "invite_excessive_email_title": string;
    "invite_excessive_email_content": string;
    "reward_top_num": string;
    "reward_total_num": string;
    "recharge_amount_1": string;
    "recharge_amount_2": string;
    "recharge_amount_3": string;
  },
  "payment_x": true,
  "game_lobby": {
    "hot": number[];
    "new": number[];
  },
  "join_get_bonus": number;
  "user_bind_phone_reward": {
    "type": number;
    "amount": string;
    "bonus_finish": number;
  },
  "activity_text_config": {
    "daily_gift": string[];
    "first_recharge": string[];
    "week_recharge": string[];
    "coupon": string[];
    "mgm": string[];
  },
  "game_version": {
    "forest": string;
    "wingo": string;
    "slotAZTEC": string;
    "slotEgypt":string;
    "slotSJB": string;
    "slotFruit": string;
    "truco": string;
    "crash": string;
    "slotZeus": string;
  },
  "recharge_options_new": number[];
  "service_telegram": string;
  "group_telegram": string;
  "manager_telegram": string;
  "service_whatsapp": string;
  "recharge_options_pay_1": number[];
  "recharge_options_pay_2":number[];
  "ab": number;
  "pix_config": {
    "account_limit_size": number;
    "cpf_limit_size": number;
  },
  "hall_version": {
    "sign": string;
  },
  "ab_condition": {
    "openFlag": boolean;
    "playOpenFlag": boolean;
    "playTimes": number;
    "ipWhites": string;
    "ipFlag": boolean;
    "timeZoneFlag": boolean;
    "languageFlag": boolean;
  },
  "device_bonus_times_limit": number;
  "recharge_amount_max": number;
  "h5Url": string;
  "user_register_reward": number;
  "service_telegram_channel": string;
  "recharge_rate": number;
  "withdraw_pay_rate": number;
  "withdraw_system_rate": number;
  "recharge_first_cashback_rate": string;
  "recharge_cashback_rate": string;
  "reward_daily_reset": boolean;
  "recharge_bonus_start": number;
  "service_telegram_01": string;
  "service_telegram_broker01": string;
  "service_telegram_broker02": string;
  "service_telegram_broker08": string;
  "withdraw_begin": string;
  "withdraw_end": string;
  "ip_user_limit": number;
  "invite_hig_reward": number;
  "new_user_balance": number;
  "pay_callback": null,
  "pay_gateway": number;
  "shopping": [],
  "recharge_level": [
    {
      "amount_min": string;
      "amount_max": string;
      "rate": string;
      "bonus_rate": string;
      "bonus_finish": number;
    }
  ],
  "control_config": {
    "is_review": number;
    "login": number[];
    "withdraw_control": number;
    "withdraw_rounds": number;
  },
  "withdraw_config": {
    "amount_day": string;
    "handle_count_day": number;
    "count_user_day": number;
    "amount_user_day": string;
    "always_amount": string;
  },
  "currentOnline": true
}

export type GetResponse = {
  "code": number;
  "msg": string;
  "data": GetResponseData;
}

// 获取充值需要的配置项
export const GetConfigEndpoint = (builder: ExternelEndpoint) => builder.mutation<GetResponse, GetRequest>({
  query: (requestData: GetRequest) => ({
    method: 'post',
    url: `/prod-api/set/get`,
    data: requestData,
  }),
});
